<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductImage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $search = request("search", false);
        $perPage = request("per_page", 10);
        $sortField = request("sort_field", "updated_at");
        $sortDirection = request("sort_direction", "desc");

        $query = Product::query()->orderBy($sortField, $sortDirection);

        if ($search) {
            $query->where("title", "like", "%{$search}%")
                ->orWhere("description", "like", "%{$search}%");
        }

        return ProductListResource::collection($query->paginate($perPage));
    }

    public function store(ProductRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();

        // استخراج صورة واحدة فقط من الملف المرفق
        $image = $request->file('image');

        // استخراج بيانات أخرى
        $positions = $data['image_positions'] ?? [];
        $categories = $data['categories'] ?? [];

        // إزالة الحقول غير الموجودة في جدول products
        unset($data['image'], $data['image_positions'], $data['categories']);

        $data['created_by'] = $user->id;
        $data['updated_by'] = $user->id;

        // حفظ المنتج
        $product = Product::create($data);

        // حفظ الصورة إن وجدت
        if ($image && $image->isValid()) {
            $this->saveImage($image, $product);
        }

        // حفظ ترتيب الصور (في حال تعديل الترتيب لاحقًا)
        $this->updateImagePositions($positions);

        return new ProductResource($product);
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $data = $request->validated();

        $image = $request->file('image');

        unset($data['image'], $data['image_positions'], $data['categories']);

        $data['updated_by'] = Auth::id();

        $product->update($data);

        if ($image && $image->isValid()) {
            $this->saveImage($image, $product);
        }

        return new ProductResource($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->noContent();
    }

    private function saveImage($image, Product $product)
    {
        $path = 'images/' . Str::random();

        if (!Storage::exists($path)) {
            Storage::makeDirectory($path, 0755, true);
        }

        $name = Str::random() . '.' . $image->getClientOriginalExtension();

        if (!Storage::putFileAs($path, $image, $name)) {
            throw new \Exception("Unable to save file \"{$image->getClientOriginalName()}\"");
        }

        $relativePath = $path . '/' . $name;

        ProductImage::create([
            'product_id' => $product->id,
            'path' => $relativePath,
            'url' => URL::to(Storage::url($relativePath)),
            'mime' => $image->getClientMimeType(),
            'size' => $image->getSize(),
            'position' => null,
        ]);
    }

    private function updateImagePositions(array $positions)
    {
        foreach ($positions as $id => $position) {
            ProductImage::where('id', $id)->update(['position' => $position]);
        }
    }
}

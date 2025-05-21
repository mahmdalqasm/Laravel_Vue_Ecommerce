<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Product extends Model
{
    use HasFactory;
    use HasSlug;
    use SoftDeletes;

     protected $fillable = ['title', 'description', 'pricing', 'image_mime','image_size','image', 'created_by', 'updated_by'];

    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
        ->generateSlugsFrom("title")
        ->saveSlugsTo("slug");
    }

    public function getImageUrlAttribute()
{
    return $this->image ? asset('storage/' . $this->image) : null;
}
}

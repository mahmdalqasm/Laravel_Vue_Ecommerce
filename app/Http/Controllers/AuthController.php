<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate(["email" => ["required", "email"],
        "password"=> "required",
        "remember"=> "boolean"
    ]);
    $remember = $credentials["remember"] ?? false ;
    unset($credentials["remember"]);
    if(!Auth::attempt($credentials, $remember)) {
        return response([
            "message" => "Email Or Password Is Incorrect"
        ],401);
    }
    $user = Auth::user();
    if (!$user->is_admin){
        Auth::logout();

        return response([
            "message" => "You don't have permission to authenticate as admin"
        ],403);
    }
    $token = $user->createToken("main")->plainTextToken;
    return response([
    "user" => new UserResource($user),
    "token" => $token
    ]);
}

public function logout()
{
    $user = Auth::user();
   $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();

    return response("", 204);
}

public function getUser(Request $request)
{
        return new UserResource( $request->user());
}
};

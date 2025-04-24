<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::middleware(["auth:sanctum", "admin"])
    ->group(function () {
        Route::get("/user", [AuthController::class, "getUser"]);
        Route::post("logout", [\App\Http\Controllers\AuthController::class, "logout"]);
    });

Route::post("/login", [\App\Http\Controllers\AuthController::class,"login"]);
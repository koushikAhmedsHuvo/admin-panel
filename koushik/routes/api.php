<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserInfoController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\SkillsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\LanguageController;
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/signup', [UserController::class, 'signup']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/store', [UserInfoController::class, 'store'])->middleware('auth:sanctum');
Route::post('/projects', [ProjectController::class, 'store'])->middleware('auth:sanctum');
Route::post('/experiences', [ExperienceController::class, 'store'])->middleware('auth:sanctum');
Route::post('/educations', [EducationController::class, 'store'])->middleware('auth:sanctum');
Route::post('/skills', [SkillsController::class, 'store'])->middleware('auth:sanctum');
Route::post('/language', [LanguageController::class, 'store'])->middleware('auth:sanctum');
Route::post('/user-profile', [UserProfileController::class, 'store'])->middleware('auth:sanctum');
Route::get('/user-profile', [UserProfileController::class, 'show'])->middleware('auth:sanctum');

Route::post('/contact', [ContactController::class, 'store']);


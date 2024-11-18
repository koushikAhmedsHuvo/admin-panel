<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserInfo;

class UserInfoController extends Controller
{
    public function store(Request $request)
{
    // Ensure the user is authenticated
    $user = auth()->user();
    
    // Check if a user is authenticated
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    // Validate the incoming request
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'intro' => 'required|string|max:255',
        'maintext' => 'required|string', // Match frontend naming
        'abouttitle' => 'required|string|max:255', // Match frontend naming
        'description' => 'required|string',
    ]);

    // Create a new userinfo entry in the database
    $userinfo = UserInfo::create([
        'user_id' => $user->id,  // Store the authenticated user's ID
        'title' => $validated['title'],
        'intro' => $validated['intro'],
        'maintext' => $validated['maintext'], // Match frontend naming
        'abouttitle' => $validated['abouttitle'], // Match frontend naming
        'description' => $validated['description'],
    ]);

    return response()->json(['message' => 'User info successfully created!', 'data' => $userinfo], 201);
}


}


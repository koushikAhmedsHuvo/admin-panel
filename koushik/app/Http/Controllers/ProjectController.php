<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
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
            'description' => 'required|string',
        ]);

        // Create a new project entry in the database with the authenticated user's ID
        $project = Project::create([
            'user_id' => $user->id, // Associate the project with the authenticated user
            'title' => $validated['title'],
            'description' => $validated['description'],
        ]);

        return response()->json(['message' => 'Project successfully created!', 'data' => $project], 201);
    }
}

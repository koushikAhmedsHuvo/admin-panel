<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Experience;

class ExperienceController extends Controller
{
    public function store(Request $request)
    {
        // Ensure the user is authenticated
        $user = auth()->user();
        
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Validate the incoming request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|string|max:255',
        ]);

        // Create the experience entry
        $experience = Experience::create([
            'user_id' => $user->id,
            'title' => $validated['title'],
            'company' => $validated['company'],
            'description' => $validated['description'],
            'date' => $validated['date'],
        ]);

        return response()->json(['message' => 'Experience successfully created!', 'data' => $experience], 201);
    }
}

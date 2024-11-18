<?php

namespace App\Http\Controllers;

use App\Models\Education;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'degree' => 'required|string',
            'institution' => 'required|string',
            'description' => 'required|string',
            'date' => 'required|string|max:255',
        ]);
    
        // Create a new education record, associating it with the authenticated user
        $education = Education::create([
            'user_id' => auth()->id(), // Assumes user is authenticated via Sanctum
            'degree' => $request->degree,
            'institution' => $request->institution,
            'description' => $request->description,
            'date' => $request->date,
        ]);
    
        // Return a success response with the created data
        return response()->json([
            'message' => 'Education record successfully created!',
            'data' => $education,
        ], 201); // 201 is the status code for resource creation
    }
}

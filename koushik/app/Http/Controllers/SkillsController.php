<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;

class SkillsController extends Controller
{
    public function store(Request $request)
    {
        // Validate incoming request data
        $request->validate([
            'professional_skill' => 'required|string|max:255',
         
        ]);

        // Create new skill record for the authenticated user
        $skill = Skill::create([
            'user_id' => auth()->id(),
            'professional_skill' => $request->professional_skill,
            
        ]);

        // Return success response with the created skill data
        return response()->json([
            'message' => 'Skill successfully created!',
            'data' => $skill,
        ], 201); // 201 is the status code for resource creation
    }
}

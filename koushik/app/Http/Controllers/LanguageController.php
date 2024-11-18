<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    /**
     * Store a new language skill.
     */
    public function store(Request $request)
    {
        // Validate incoming data
        $request->validate([
            'language_skill' => 'required|string|max:255',
        ]);

        // Create a new language record for the authenticated user
        $language = Language::create([
            'user_id' => auth()->id(),
            'language_skill' => $request->language_skill,
        ]);

        // Return success response with the created language data
        return response()->json([
            'message' => 'Language skill successfully added!',
            'data' => $language,
        ], 201);
    }

    
}

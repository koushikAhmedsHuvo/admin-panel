<?php

// app/Http/Controllers/ContactController.php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    // Handle the contact form submission
    public function store(Request $request)
    {
        // Validate the incoming data
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone_number' => 'required|string|max:20',
            'message' => 'required|string|max:1000',
        ]);

        // Store the contact information
        $contact = Contact::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'message' => $request->message,
        ]);

        // Return a success response
        return response()->json([
            'message' => 'Your message has been sent successfully!',
            'data' => $contact
        ], 201);
    }
}


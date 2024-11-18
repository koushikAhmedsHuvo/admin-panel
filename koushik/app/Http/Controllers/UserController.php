<?php

namespace App\Http\Controllers;

use App\Models\Token;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\Register;

class UserController extends Controller
{
    public function signup(Request $request)
{
    // Validate the incoming request
    $validated = $request->validate([
        'email' => 'required|email|unique:users,email', // Ensure uniqueness in the users table
        'password' => 'required|string|min:6|confirmed',
    ]);

    // Create a new user entry in the users table
    $user = User::create([
        'email' => $validated['email'],
        'password' => Hash::make($validated['password']), // Hash the password for security
    ]);

    return response()->json(['message' => 'User registered successfully!', 'user' => $user], 201);
}

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        // If validation fails, return error response
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Authentication Failed',
                'errors' => $validator->errors()->all()
            ], 400); // Return 400 (Bad Request) for validation errors
        }
    
        // Attempt to authenticate the user with email and password
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $authUser = Auth::user();
    
            // Create a personal access token for the authenticated user
            $token = $authUser->createToken('Api token')->plainTextToken;

            return response()->json([
                'status' => true,
                'message' => 'User logged in successfully',
                'token' => $token,
                'token_type' => 'Bearer'
            ], 200);
        }
    
        // If authentication fails, return an error response
        return response()->json([
            'status' => false,
            'message' => 'Invalid credentials'
        ], 401); // Return 401 (Unauthorized)
    }

    public function logout(Request $request)
    {
        
        $user=$request->user();
        $user->tokens()->delete();
      
        return response()->json([
             'status' => true,
            'message' => 'user logged out successfully'
        ],200);
    }

    
 
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserProfile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserProfileController extends Controller
{
    // Store user profile information
    public function store(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // If validation fails, return error response
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Failed',
                'errors' => $validator->errors()->all()
            ], 400); // Return 400 (Bad Request)
        }

        // Get the authenticated user
        $user = Auth::user();

        // If image is provided, handle the image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        } else {
            $imagePath = null; // Set default if no image is provided
        }

        // Create the user profile record
        $userProfile = UserProfile::create([
            'user_id' => $user->id,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'phone' => $request->phone,
            'image' => $imagePath,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'User profile created successfully!',
            'user_profile' => $userProfile
        ], 201); // Return 201 (Created)
    }


    public function show()
    {
        // Get the authenticated user
        $user = Auth::user();
    
        // If the user is not authenticated, return an error response
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized access',
            ], 401); // Return 401 (Unauthorized)
        }
    
        // Fetch the user's profile information
        $userProfile = UserProfile::where('user_id', $user->id)->first();
    
        // If no profile is found, return an error response
        if (!$userProfile) {
            return response()->json([
                'status' => false,
                'message' => 'User profile not found',
            ], 404); // Return 404 (Not Found)
        }
    
        // Check if the user profile has an image and prepend the correct storage URL
        if ($userProfile->image) {
            $userProfile->image = asset('storage/' . $userProfile->image);
        }
    
        // Combine user and user profile data
        $data = [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ],
            'user_profile' => [
                'first_name' => $userProfile->first_name,
                'last_name' => $userProfile->last_name,
                'phone' => $userProfile->phone,
                'image' => $userProfile->image,
                'about_me' => $userProfile->about_me,
                'created_at' => $userProfile->created_at,
                'updated_at' => $userProfile->updated_at,
            ],
        ];
    
        // Return the combined data
        return response()->json([
            'status' => true,
            'message' => 'User information retrieved successfully!',
            'data' => $data,
        ], 200); // Return 200 (OK)
    }
    

}

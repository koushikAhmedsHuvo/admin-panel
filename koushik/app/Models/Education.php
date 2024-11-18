<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Education extends Model
{
    use HasFactory;

    // Explicitly define the table name
    protected $table = 'educations';

    // Define which attributes are mass assignable
    protected $fillable = [
        'user_id', 'degree', 'institution', 'description', 'date'
    ];

    // Define the relationship to the User model (assuming one user can have many education records)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}


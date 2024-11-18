<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Skill extends Model
{
    use HasFactory;

    // Define the table name
    protected $table = 'skills';

    // Fillable attributes for mass assignment
    protected $fillable = [
        'user_id', 'professional_skill', 'language',
    ];

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

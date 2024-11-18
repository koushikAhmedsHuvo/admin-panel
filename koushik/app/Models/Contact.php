<?php
// app/Models/Contact.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    // Specify which fields are mass assignable
    protected $fillable = [
        'full_name', 'email', 'phone_number', 'message'
    ];
}

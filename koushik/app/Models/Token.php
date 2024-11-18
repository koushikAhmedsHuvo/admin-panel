<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'token', 'expires_at'];

    // Define a relationship to the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}


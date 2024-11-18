<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Userinfo extends Model
{
    use HasFactory;

    // Specify the table name if it's not following the plural convention
    protected $table = 'userinfo'; 

    // Fillable fields to protect against mass-assignment vulnerability
    protected $fillable = ['user_id', 'title', 'intro', 'maintext', 'abouttitle', 'description'];


    // Relationship with User
    // In UserInfo model
public function user()
{
    return $this->belongsTo(User::class);
}

}

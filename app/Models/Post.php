<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    use Likable;


    protected $fillable=[
        'user_id',
        'body',
        'user_username',
        'user_email',
        'user_avatar',
        'id',
        'post_id'   
    ];
   

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}

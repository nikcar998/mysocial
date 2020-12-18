<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    use Followable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'username',
        'avatar',
        'avatar_cover',
        'email',
        'password',
        'description'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function Post()
  {
    return $this->hasMany(Post::class);
  }
  public function timeline()
  {
    
    $follows = $this->follows()->pluck('id');
    return Post::whereIn('user_id',$follows)
            ->orWhere('user_id',$this->id)
            ->withLikes()
            ->latest()
            ->get();
    
  }
  public function messages(){
    return $this->hasMany(Message::class,'sender_id');
}
}

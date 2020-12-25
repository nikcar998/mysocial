<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }


    public function index()
    {
        return auth()->user()->timeline();
    }


    public function store()
    {
        $attributes = request()
            ->validate([
                'body'=> 'required|max:255'
                ]);
        $user=auth()->user();
       
    
       return Post::create([
            'user_avatar'=>$user->avatar,
            'user_id'=>auth()->id(),
            'user_username'=>$user->username,
            'user_email'=>$user->email,
            'body'=>$attributes['body']
        ]);  
    }


    public function delete(Post $post)
    {
        $user=User::where('username',request('user'))->get();
        $this->authorize('edit',$user[0]);
        $id = $post->id;
        return Post::where('id', $id)->delete();
    }
}

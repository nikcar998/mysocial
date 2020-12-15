<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class LikesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function store(Post $post,Request $request)
    {
        $attribute =request()->validate([
            'value'=>'required|boolean']);

        $user = auth()->user();
        if($request['value']){
            $post->like($user );
        }else{
            $post->like($user, false);
        } 

        return [
            Post::where('id',$post->id)
            ->withLikes()
            ->latest()
            ->get()
            ->pluck('likes'),
            Post::where('id',$post->id)
            ->withLikes()
            ->latest()
            ->get()
            ->pluck('dislikes')
        ];
    }
}

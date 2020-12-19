<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ProfilesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
 
    public function show(User $user)
    {
        $isUser=0;
        $posts='';
        $isFollowing=auth()->user()->isFollowing($user);
        if(auth()->user()->username===$user->username){
            $isUser=1;
            $posts=Post::where('user_id',auth()->user()->id)->latest()->get();
        }else{
            $posts=Post::where('user_username',$user->username)->latest()->get();
        }
        return view('profile.show',[ 
            'user_profile'=>$user,
            'follows'=>User::find(auth()->user()->id)->follows,
            'user'=>Auth::user(),
            'posts'=>$posts,
            'isUser'=>$isUser,
            'isFollowing'=>$isFollowing,
            'avatar'=>auth()->user()->avatar,
            'avatar_cover'=>auth()->user()->avatar_cover
            ]
                    );

    }


    public function edit(User $user)
    {
        $this->authorize('edit',$user);

        return view('profile.edit',[
            'follows'=>User::find(auth()->user()->id)->follows,
            'user'=>auth()->user(),
        ]);
    }

    
    public function searchShow()
    {
       // dd(User::paginate(30));
        return view('profile.search',[
            'follows'=>User::find(auth()->user()->id)->follows,
            'user'=>auth()->user(),
            'users'=>User::latest()->take(20)->get()
        ]);
        
    }


    public function search(Request $request)
    {
        $request->validate([
            'query'=>'max:255!required'
        ]);
        $query = $request["query"];
    
        $users = User::where('username','like',$query.'%')->orWhere('name','like','%'.$query.'%')->get();
        return response()->json([$users]);
    }


    public function update(User $user)
    {
        $this->authorize('edit',$user);

        $attributes = request()->validate([
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255',Rule::unique('users')->ignore($user)],
            'email' => ['required', 'string', 'email', 'max:255',Rule::unique('users')->ignore($user)],
        ]);
 
        $attributes['description']=request('description');
        $user->update($attributes);
    }


    public function updateAvatar(User $user)
    {
        $this->authorize('edit',$user);

        $attributes = request()->validate([
            'avatar' => ['required','image'],
        ]);
        $attributes['avatar'] = request('avatar')->store('avatars');
        $user->update($attributes);


        return Post::where('user_id',$user->id)->update(['user_avatar'=>request('avatar')->store('avatars')]);
    }


    public function updateCover(User $user)
    {
        $this->authorize('edit',$user);

        $attributes = request()->validate([
            'avatar_cover'=>['image']
        ]);
        $attributes['avatar_cover'] = request('avatar_cover')->store('avatar_covers');
        $user->update($attributes);
        return $attributes;

    }
    public function index()
    {
        return "Hello";
    }
}

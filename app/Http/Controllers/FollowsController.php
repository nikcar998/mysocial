<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FollowsController extends Controller
{
    function store(User $user)
    {
        auth()
            ->user()
            ->toggleFollow($user);

        return redirect("/profile"."/".$user->username);
    }
    function index()
    {
        return User::find(auth()->user()->id)->follows;
    }
}

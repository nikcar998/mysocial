<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {       
        return Auth::user();
    }
}
/**     'posts'=>auth()->user()->timeline(), **/
 //** 'follows'=>User::find(auth()->user()->id)->follows **/
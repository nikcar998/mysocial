<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Auth::routes();


Route::get('/chat/messages/{id}', 'App\Http\Controllers\ChatController@show');

Route::post('/chat', 'App\Http\Controllers\ChatController@store');

Route::get('/get/search/users', 'App\Http\Controllers\ProfilesController@searchShow');
Route::post('/post/search', 'App\Http\Controllers\ProfilesController@search');

Route::post('/like/{post:id}', 'App\Http\Controllers\LikesController@store');

Route::get('/profile/{user:username}', 'App\Http\Controllers\ProfilesController@show');
Route::patch('/profile/{user:username}/cover', 'App\Http\Controllers\ProfilesController@updateCover');
Route::patch('/profile/{user:username}/avatar', 'App\Http\Controllers\ProfilesController@updateAvatar');
Route::patch('/profile/{user:username}', 'App\Http\Controllers\ProfilesController@update');
Route::post('/profile/{user:username}/follow', 'App\Http\Controllers\FollowsController@store');

Route::get('/posts', 'App\Http\Controllers\PostController@index');
Route::post('/posts', 'App\Http\Controllers\PostController@store');
Route::delete('/posts/delete/{post:id}', 'App\Http\Controllers\PostController@delete');

Route::get('/userdata', 'App\Http\Controllers\UserController@index');


Route::get('/follows', 'App\Http\Controllers\FollowsController@index');

Route::get('/{path?}', function () {
    if(auth()->user()){
        return view('home');
    }else{
        return view('welcome');
    }
})->name('welcome');;


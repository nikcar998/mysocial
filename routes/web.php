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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\ReactController::class, 'index'])->name('home');
Route::get('/search/show', 'App\Http\Controllers\ProfilesController@searchShow');
Route::post('/search', 'App\Http\Controllers\ProfilesController@search');
Route::post('/like/{post:id}', 'App\Http\Controllers\LikesController@store');
Route::get('/userdata', [App\Http\Controllers\ProfilesController::class, 'index']);
Route::get('/profile/{user:username}', 'App\Http\Controllers\ProfilesController@show')->name('profile');
Route::patch('/profile/{user:username}/cover', 'App\Http\Controllers\ProfilesController@updateCover');
Route::patch('/profile/{user:username}/avatar', 'App\Http\Controllers\ProfilesController@updateAvatar');
Route::patch('/profile/{user:username}', 'App\Http\Controllers\ProfilesController@update');
Route::get('/profile/{user:username}/edit', 'App\Http\Controllers\ProfilesController@edit');
Route::post('/profile/{user:username}/follow', 'App\Http\Controllers\FollowsController@store');
//Route::get('/posts', [App\Http\Controllers\PostController::class, 'index']);
Route::post('/posts', 'App\Http\Controllers\PostController@store');



<?php

namespace App\Http\Controllers;


use App\Events\MyEvent;
use App\Models\User;
use App\Models\Message;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function store()
    {

         $attributes=request()->validate([
             'message'=>'required|max:400',
             'rec_id'=>'required'
         ]);
         $attributes['sender_id']=auth()->user()->id;

         Message::create($attributes);
        $user1=auth()->user()->id;
        $user2=$attributes['rec_id'];
         return event(new MyEvent(
            Message::where([
                ['sender_id', $user1],
                ['rec_id', $user2]
            ])
            ->orWhere(function($query) use($user1, $user2)  {
                $query->where('rec_id', $user1)
                      ->where('sender_id', $user2);
            })
                    ->latest()
                    ->take(20)
                    ->get(),

                    auth()->user()->id,
                    $attributes['rec_id'] 
            )
        
           );       
    
    }
    public function show($id)
    {
        $user= auth()->user();
        return Message::where([
            ['sender_id', $user->id],
            ['rec_id', $id]
        ])
        ->orWhere(function($query) use($user, $id)  {
            $query->where('rec_id', $user->id)
                  ->where('sender_id', $id);
        })
                ->latest()
                ->take(20)
                ->get();
    }

  
}

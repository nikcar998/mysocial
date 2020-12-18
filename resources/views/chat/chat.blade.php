
@extends('layouts.app')
@section('content')
   <script>
        var user='{{$user}}';
        var follows='{{$follows}}';
        window.csrf_token = "{{ csrf_token() }}"
    </script>
            <div>
                <div id="chat_panel_container"> </div>
            </div>    
@endsection
@extends('layouts.app')

@section('content')
    <div id="rootProfile"></div>
    <script>
        var user='{{$user}}';
        var follows='{{$follows}}';
        var posts='{{$posts}}';
        var isUser='{{$isUser}}';
        var user_profile="{{$user_profile}}"
        var isFollowing="{{$isFollowing}}"
        window.csrf_token = "{{ csrf_token() }}"
    </script>
@endsection

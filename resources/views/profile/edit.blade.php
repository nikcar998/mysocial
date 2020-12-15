@extends('layouts.app')

@section('content')
    <div id="rootEditProfile"></div>
    <script>
        var user='{{$user}}';
        var follows='{{$follows}}';
        window.csrf_token = "{{ csrf_token() }}"
    </script>
@endsection

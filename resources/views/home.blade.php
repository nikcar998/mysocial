@extends('layouts.app')

@section('content')
    <div id="root"></div>
    <script>
        var user='{{$user}}';
        var posts='{{$posts}}';
        var follows='{{$follows}}';
        window.csrf_token = "{{ csrf_token() }}"
    </script>
@endsection

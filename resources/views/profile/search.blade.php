@extends('layouts.app')

@section('content')
    <div id="rootSearchProfile"></div>
    <script>
        let user='{{$user}}';
        let follows='{{$follows}}';
        let users="{{$users}}";
        console.log(users)
        window.csrf_token = "{{ csrf_token() }}"
    </script>
@endsection

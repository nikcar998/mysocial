@extends('layouts.app')

@section('content')
    <div id="root"></div>
    <script>
        window.csrf_token = "{{ csrf_token() }}"
    </script>
@endsection

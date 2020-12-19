@extends('layouts.app')

@section('content')
            <div class="d-flex justify-content-around col-12 " style="margin-top:8rem">
                <div class="col-6">
                    <h1 class="ml-4 mt-3" style="font-weight:800; font-size:100; line-height:100%">
                        <span class="text-primary d-inline-block p-0 text-right m-0" style="font-weight:900; font-size:150" >
                            MY
                        </span>
                        Social
                    </h1>
                </div>
                <div class="d-flex justify-content-center col-6">
                    @include('_login')
                    @include('_register')
                </div>
            </div>
        </div>
        @endsection

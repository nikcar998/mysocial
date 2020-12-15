import React,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
function OptionsSide(props){
    const userUrl="/profile/"+props.user.username;
     return (
            <ul className="col-2 list-group list-group-flush">
                <li className="list-group-item bg-dark font-weight-bold"><a href="/home"  className="text-reset text-decoration-none"><h5>Home</h5></a></li>
                <li className="list-group-item bg-dark font-weight-bold"><a href="/home"  className="text-reset text-decoration-none"><h5>Follows</h5></a></li>
                <li className="list-group-item bg-dark font-weight-bold"><a href="/search/show"  className="text-reset text-decoration-none"><h5>Search</h5></a></li>
                <li className="list-group-item bg-dark font-weight-bold"><a href="/home"  className="text-reset text-decoration-none"><h5>Chat</h5></a></li>
                <li className="list-group-item bg-dark font-weight-bold"><a href={userUrl}  className="text-reset text-decoration-none"><h5>{props.user.username}</h5></a></li>
            </ul>
     )
}

export default OptionsSide;
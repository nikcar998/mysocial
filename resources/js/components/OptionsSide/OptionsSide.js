import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import Axios from 'axios'

//il componente permette di viaggiare all'interno dei vari componenti presenti nel sito
function OptionsSide(props){


     return (
            <ul className="col-2 list-group list-group-flush">
                <li className="list-group-item bg-dark font-weight-bold"><Link to="/home"  className="text-reset text-decoration-none"><h5>Home</h5></Link></li>
                <li className="list-group-item bg-dark font-weight-bold"><Link to="/search"  className="text-reset text-decoration-none"><h5>Search</h5></Link></li>
                <li className="list-group-item bg-dark font-weight-bold"><Link to="/chat"  className="text-reset text-decoration-none"><h5>Chat</h5></Link></li>
                <li className="list-group-item bg-dark font-weight-bold"><a href={props.user.username}  className="text-reset text-decoration-none"><h5>{props.user.username}</h5></a></li>
            </ul>
     )
}

export default OptionsSide;
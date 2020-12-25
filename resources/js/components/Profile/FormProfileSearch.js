import React,{ useState} from 'react';
import axios from 'axios'


//questo componente da la possibilità di cercare tra gli utenti iscritti per nome o username
//necessita di due props una in cui passare gli utenti trovati e una da utilizzare quando l'input di ricerca è vuoto
function FormProfileSearch(props) {

    const setUsers=props.setUsers;
    const [query,setQuery]=useState('')


    function liveSearchHandler(e){
        e.preventDefault()
        setQuery(e.target.value)
        if(e.target.value.length>=3){
            console.log(JSON.stringify(query))

            axios.post("/post/search",{
                query:query
            })
            .then(resp=>{
                console.log(resp.data[0])
                setUsers(resp.data[0])
            })
        }else{
            console.log(e.target.value)
            if(e.target.value===""){
                setUsers(props.users)
            }
        }
    }


    return (
        <form className="bg-light form-group d-flex justify-content-center align-items-center py-3 px-2 mt-1 rounded-lg">
            <input onChange={liveSearchHandler} type="text" className="form-control w-75 " placeholder="Look for someone!"></input>
            <button className="btn btn-primary " type="submit">Search!</button>
        </form>
    );
    }

    export default FormProfileSearch;

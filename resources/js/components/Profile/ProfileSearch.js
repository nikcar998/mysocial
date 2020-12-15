import React,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

function Posts(props) {

    const [users,setUsers]=useState(props.users);
    const [query,setQuery]=useState('')
    

  /******************** funzione da esportare  ***********/
  function escapeHtml(text) {
    return text
        .replace('%0',' ')
        .replace('+','')
        .replace(/&#039;/g, "'")
  }

  /*********************************************************** */


    function liveSearchHandler(e){
        e.preventDefault()
        setQuery(e.target.value)
        if(e.target.value.length>=3){
            console.log(JSON.stringify(query))

            axios.post("/search",{
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


    <div className="mx-auto col-5 d-flex flex-column p-2 flex-coloum rounded-lg">
        <form className="bg-light form-group d-flex justify-content-center align-items-center py-3 px-2 mt-1 rounded-lg">
            <input onChange={liveSearchHandler} type="text" className="form-control w-75 " placeholder="Look for someone!"></input>
            <button className="btn btn-primary " type="submit">Search!</button>
        </form>
        <div className="p-0 mt-2 bg-light border rounded-lg">
        {users.map(user=>{
            const profileLink="/profile/"+user.username
            const avatarUrl=user.avatar!==null?
            "/storage/"+user.avatar
            :
            "/images/default_avatar.png";
            const description= decodeURIComponent(user.description)!=='null'?
                        escapeHtml(decodeURIComponent(user.description))
                    :
                    "";

          return(  
              <div key={user.username} 
                        className="container d-flex bg-light p-2 border-top border-top-success" 
                        style={{height:"80px"}}
                        >
                <div className="mr-2 flex-shrink-0 my-auto">
                    <a href={profileLink}>
                        <img
                            src={avatarUrl}
                            alt="avatar"
                            className="rounded-circle mr-2 p-auto"
                            style={{width:"50px", height:"50px"}}
                        />
                    </a>
                </div>

                <div className="d-flex  justify-content-start">
                    <h3 className="font-weight-bold mb-2 text-primary p-0 my-auto">{user.username}</h3>
                    <div className="p-0 m-0 d-flex flex-column">
                        <h6 className="my-auto ml-3 text-secondary ">Description:</h6>
                        <p className=" my-auto ml-3 text-secondary " 
                            style={{width:"60%",height:"100%", fontSize:"75%",overflowWrap:"break-word"}}
                        >
                            {
                                escapeHtml(description).length>=50
                                    ?
                                    " " + escapeHtml(description).slice(0,50)+"..."
                                    :
                                    " " + escapeHtml(description)
                            }
                        </p>
                    </div>
                </div>
            </div>
        )})}
        </div>
    </div>
    );
    }

    export default Posts;

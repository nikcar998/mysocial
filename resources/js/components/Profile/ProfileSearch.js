import React,{ useState} from 'react';
import axios from 'axios'
import FormProfileSearch from './FormProfileSearch';

function ProfileSearch(props) {

    const [users,setUsers]=useState(props.users); 

  /******************** funzione da esportare  ***********/
  function escapeHtml(text) {
    return text
        .replace('%0',' ')
        .replace('+','')
        .replace(/&#039;/g, "'")
  }


    return (


    <div className="mx-auto col-5 d-flex flex-column p-2 flex-coloum rounded-lg">
        <FormProfileSearch users={props.users} setUsers={setUsers} />
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

    export default ProfileSearch;

import React from 'react';
import ReactDOM from 'react-dom';
function Follows(props) {
    const follows=props.follows;
    return (    
            <div className=" d-flex  flex-column col-2 mr-5 align-items-start p-1">
                <h1 className="font-weight-bold mb-3">Follow</h1>
                    {follows.map(follower=>{
                        const key =follower.email;
                        const followerUrl="/profile/"+follower.username
                        const followerAvatar=follower.avatar!==null?
                                '/storage/'+follower.avatar 
                                : 
                                "/images/default_avatar.png";

                        return(  
                        <p key={key} className="w-75 px-0">
                            <a href={followerUrl} className="text-reset text-decoration-none">
                                <img
                                    src={followerAvatar}
                                    alt="avatar"
                                    className="rounded-circle p-1"
                                    style={{width:"46px",height:"46px"}}
                                ></img>
                                    {follower.username}
                            </a>
                        </p>
                      )
                    })}
                   
            </div> 
    );
}

export default Follows;

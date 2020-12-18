import React,{useState,useEffect, useContext} from 'react';
import './styles.css';
import Pusher from 'pusher-js'
import Axios from 'axios';
import ResultContext from '../ResultContext';


function FollowList(props) {
    const follows=props.follows;
    const messageFetch=props.messageFetch;
    const setOtherUserId=props.setOtherUserId;
    const setOtherUser=props.setOtherUser;
    const otherUserId= props.otherUserId;
    const user=props.user;
    const channel=props.channel;

    console.log([follows,otherUserId]);
    const [followContainer,setFollowContainer]=useState({overflowX:"scroll"})
  
    /******************* Handlers ******************** */
    function otherUserHandler(newId){
  
        channel.unbind('my-event-'+otherUserId+user)
 

        messageFetch(newId)
        setOtherUserId(newId);
        setOtherUser(follows.filter(follower=> follower.id == newId))
       // setFollowContainer({opacity:0})
 

    }

        return (
          /*****************************follows List ******/
          <div>
              {follows[0]!==undefined &&  <div className="d-flex flex-nowrap" style={followContainer} >
                 
                    { follows.map(follower=>{
                        const key =follower.email;
                        const followerUrl="/profile/"+follower.username
                        const followerAvatar=follower.avatar!==null?
                                '/storage/'+follower.avatar 
                                : 
                                "/images/default_avatar.png";
                        const followerId=follower.id;
                        return(  
                        <div key={key} className="d-flex flex-column justify-content-center align-items-center p-0 w-25">
                        <p onClick={()=>otherUserHandler(followerId)} className="px-0 m-2 d-flex flex-column flex-nowrap justify-content-center align-items-center ">
                                <img
                                    src={followerAvatar}
                                    alt="avatar"
                                    className="rounded-circle p-1 m-1"
                                    style={{width:"46px",height:"46px"}}
                                ></img>
                                    {follower.username}
                        </p>
                        </div>
                      )
                    })}
                </div>}
            </div>

            
        );
    }

export default FollowList;
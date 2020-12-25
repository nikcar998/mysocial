import React,{useState} from 'react';



//il componente viene utilizzato per mostrare gli utenti con cui si vuole chattare (tra i propri follower o i vari iscritti)
function FollowList(props) {
    const follows=props.follows;
    const messageFetch=props.messageFetch;
    const setOtherUserId=props.setOtherUserId;
    const setOtherUser=props.setOtherUser;
    const otherUserId= props.otherUserId;
    const user=props.user;
    const channel=props.channel;

    console.log(follows);
    const [followContainer]=useState({overflowX:"scroll"})
  
    /******************* Handlers ******************** */
    //appena un utente viene selezionato avviene l'unbind con l'eventuale canale pusher precedentemente utilizzato
    //per poi settare gli state secondo i necessari valori del nuovo user
    function otherUserHandler(newId){
        channel.unbind('my-event-'+otherUserId+user)
 
        messageFetch(newId)
        setOtherUserId(newId);
        setOtherUser(follows.filter(follower=> follower.id == newId))

    }

        return (
          /*****************************follows List ******/
          <div>
              {follows[0]!==undefined &&  <div className="d-flex flex-nowrap" style={followContainer} >
                 
                    { follows.map(follower=>{
                        const key =follower.email;
                        const followerUrl="/"+follower.username
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
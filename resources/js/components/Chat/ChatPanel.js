import React,{useState,useEffect, useContext} from 'react';
import './styles.css';
import Pusher from 'pusher-js'
import Axios from 'axios';
import ResultContext from '../ResultContext';
import FollowList from './FollowList';
import Message from './Message';

function Chatpanel(props) {

    const user=props.user;
    const follows=props.follows;
    const [otherUserId, setOtherUserId ] =useState("")
    const [otherUser,setOtherUser]=useState({});
    const [messages,setMessages]=useState([]);
    const [messageText,setMessageText]=useState("")
    const [otherUserAvatar,setOtherUserAvatar]=useState("/images/default_avatar.png")
    /*******************************Pusher ******************** */
          // Pusher.logToConsole = true;

          const pusher = new Pusher('', {
            cluster: 'eu'
          });
          const [channel] =useState(pusher.subscribe("my-channel"));
          channel.bind('my-event-'+otherUserId+user.id, function(data) {
            setMessages(data.message)
            console.log(data.message)
            //setControlvar(controlvar+1)
          })
          console.log('my-event-'+otherUserId+user.id)
          



/*********************************Axios functions ***************/
    function messageSender(e){
      e.preventDefault()
        Axios.post("/chat",{
            message:messageText,
            rec_id:otherUserId
        }).then(resp=>{
          console.log(resp)
          setMessageText("")
          messageFetch(otherUserId)
        })
        .catch(error=>{
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
            });
    
        }

        
    function messageFetch(newId){
        Axios.get("/chat/messages/"+newId)
            .then(data=>{
                console.log(data.data)
                setMessages(data.data)
            }).catch(error=>{
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                  } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                  }
                });
    }

    /******************* Handlers ******************** */

    function textHandler(e){
      setMessageText(e.target.value)
      console.log(messageText + "textHandler")
    }

     useEffect(() => {
       console.log([otherUser, "useEffect chatpanel"])
      if(otherUser[0]){
        setOtherUserAvatar(
          otherUser[0].avatar!==null?
          '/storage/'+otherUser[0].avatar 
          : 
          "/images/default_avatar.png"
          )
      }
    }, [otherUser])


        return (
          /*****************************follows List ******/
            <div className="mx-auto col-5 d-flex flex-column">     
              <FollowList follows={follows}
                          messageFetch={messageFetch}   
                          setOtherUser={setOtherUser} 
                          setOtherUserId={setOtherUserId}
                          otherUserId={otherUserId}
                          channel={channel}
                          user={user.id} />
       
                {/************************** Messages ************************ */}
                <div className="bg-light tex-dark rounded-lg mt-3 p-0" style={{height:"510px"}}>
                  {/************************************ chosen follower *****/}
                  {otherUser[0] && 
                  <div className="d-flex flex-row justify-content-start align-items-center p-0 w-25 text-dark  w-100 bg-white rounded-lg">
                    <h3 className="p-0 m-0 d-flex flex-row justify-content-start align-items-center w-25 bg-light border rounded-lg font-weight-bold">
                            <img
                                src={otherUserAvatar}
                                alt="avatar"
                                className="rounded-circle p-1"
                                style={{width:"46px",height:"46px"}}
                            ></img>
                                {otherUser[0].username}
                    </h3>
                  </div>}
                 <Message user={user} otherUser={otherUser} messages={messages}  />
                    {/*****************************FORM MESSAGES ****************/}
                    <div className="d-flex p-1" >
                      <form onSubmit={messageSender} className="d-flex input-group ">
                        <input onChange={textHandler} type="text" className="rounded-lg form-control" value={messageText} aria-describedby="inputGroup-sizing-sm" placeholder="Write here!"/>
                        <button type="submit" className='btn btn-info text-muted' >Send</button>
                      </form>
                    </div>
                </div>
          </div>
        );
    }

export default Chatpanel;
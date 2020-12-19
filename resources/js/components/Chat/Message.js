import React from 'react';




function Message(props) {

    const user=props.user;
    const otherUser=props.otherUser;
    const messages=props.messages;

    
        return (

                    <div className="mb-1 bg-white d-flex flex-column-reverse overflow-auto border border-1 border-muted rounded-lg p-1 w-100" style={{height:"400px"}} >
                      {messages!==[] && messages.map((message, index)=>{
                        console.log(otherUser[0].username)
                        if(message.sender_id!==user.id && otherUser!==undefined){
                          const userAvatar=otherUser[0].avatar!==null?
                          '/storage/'+otherUser[0].avatar 
                          : 
                          "/images/default_avatar.png";
                          return(
                          <div key={index} className="w-100 d-flex flex-row justify-content-start mt-1">
                            <div className=" rounded-lg pl-1 bg-success w-50 ml-0 border border-1 border-secondary" style={{justifySelf:"flex-end"}}>
                                  <h5>
                                  <img
                                    src={userAvatar}
                                    alt="avatar"
                                    className="rounded-circle p-1 m-1"
                                    style={{width:"30px",height:"30px"}}
                                ></img>{otherUser[0].username}</h5>
                                  <p className="ml-1">{message.message}</p>
                              </div> 
                          </div>
                          )
                        }else{
                          const userAvatar=user.avatar!==null?
                          '/storage/'+user.avatar 
                          : 
                          "/images/default_avatar.png";
                          return(
                        <div key={index} className="w-100 d-flex flex-row justify-content-end  mt-1">
                            <div className=" rounded-lg pl-1 bg-primary w-50  border border-1 border-secondary" style={{justifySelf:"flex-start"}}>
                                <h5>
                                <img
                                    src={userAvatar}
                                    alt="avatar"
                                    className="rounded-circle p-1 m-1"
                                    style={{width:"30px",height:"30px"}}
                                ></img>
                                {user.username}</h5>
                                <p> {message.message}</p>
                            </div> 
                          </div>
                          )
                        }
                      }) }
                      </div>

        );
    }

export default Message;
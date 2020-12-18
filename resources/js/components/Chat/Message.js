import React,{useState,useEffect, useContext} from 'react';
import './styles.css';



function Message(props) {

    const user=props.user;
    const otherUser=props.otherUser;
    const messages=props.messages;
    
        return (

                    <div className="mb-1 bg-white d-flex flex-column-reverse overflow-auto border border-1 border-muted rounded-lg p-1 w-100" style={{height:"400px"}} >
                      {messages!==[] && messages.map((message, index)=>{
                        console.log(otherUser[0].username)
                        if(message.sender_id!==user.id && otherUser!==undefined){
                          return(
                          <div key={index} className="w-100 d-flex flex-row justify-content-start ">
                            <div className=" rounded-lg pl-1 bg-success w-50 ml-0 border border-1 border-secondary" style={{justifySelf:"flex-end",height:"70px"}}>
                                  <p>{otherUser[0].username}</p>
                                  <p>{message.message}</p>
                              </div> 
                          </div>
                          )
                        }else{
                          return(
                        <div key={index} className="w-100 d-flex flex-row justify-content-end  mt-1">
                            <div className=" rounded-lg pl-1 bg-primary w-50  border border-1 border-secondary" style={{justifySelf:"flex-start",height:"70px"}}>
                                <p>{user.username}</p>
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
import React,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

function Posts(props) {
const [likes,setLikes]=useState(props.post.likes?props.post.likes:"0")
const [dislikes,setDislikes]=useState(props.post.dislikes?props.post.dislikes:"0")
const [dislikesColor,setDislikesColor]=useState({})
const postsCreatorUsername=eval(JSON.stringify(props.post.user_username));

const postsCreatorEmail=props.post.user_email;

const profileLink="/profile/"+postsCreatorUsername
const avatarUrl=props.post.user_avatar!==null?
"/storage/"+props.post.user_avatar
:
"/images/default_avatar.png";
console.log(avatarUrl)

/******************** funzione da esportare  ***********/
function escapeHtml(text) {
    return text
        .replace('%0',' ')
        .replace('+','')
        .replace(/&#039;/g, "'")
}

function postDelete(){
    {/************************************************************ */}
}


function likeHandler(bool){
    const url = "/like/"+props.post.id
    axios.post(url,{
        value:bool
    }).then(resp=>{
        console.log(resp.data)

        setLikes(resp.data[0][0])
        setDislikes(resp.data[1][0])

    }).catch(e=>console.log(e))
}

console.log(props.post)
return (


<div className=" container d-flex flex-column bg-light p-2 border-bottom border-bottom-success">
    <div className="d-flex w-100">
        <div className="mr-2 d-flex justify-content-start align-items-start">
            <a href={profileLink}>
                <img
                    src={avatarUrl}
                    alt="avatar"
                    className="rounded-circle mr-2"
                    style={{width:"40px", height:"40px"}}
                />
            </a>
        </div>

        <div>
            <h5 className="font-weight-bold mb-2 text-primary">{postsCreatorUsername}</h5>
            <a href={profileLink}>
                <p className="text-decoration-none text-secondary">
                    {escapeHtml(decodeURIComponent(props.post.body))}
                </p>
            </a>
        </div>
        <img
            onClick={postDelete}
            className=" ml-3 mr-1 align-self-end justify-self-end"
            src="/images/trash.svg"
            width="15"
            />
    </div>
    {/************************* LIKES ********************* */}
    <div className="d-flex justify-content-start align-middle m-1">
        <img
            onClick={()=>{likeHandler(true)}}
            className=" ml-3 mr-1"
            src="/images/thumbs-up.svg"
            width="15"
            />
        <p className="text-black my-auto">{likes}</p>
        <img
            onClick={()=>{likeHandler(false)}}
            className=" ml-3 mr-1 rounded-lg "
            src="/images/thumbs-down.svg"
            width="15"
            />
        <p className="text-black my-auto" >{dislikes}</p>
    </div>
</div>
);
}

export default Posts;

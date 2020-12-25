import React,{ useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

//il componente è il modello di ogni post, da la possibilità di dare like e dislike,
//cancellare i propri post e di accede alla pagina del profilo del creatore del post stesso
function Posts(props) {
const [post]=useState(props.post);
const [likes,setLikes]=useState(post.likes?post.likes:"0")
const [dislikes,setDislikes]=useState(post.dislikes?post.dislikes:"0")
const postCreatorUsername=eval(JSON.stringify(post.user_username));
const id= post.id;
const authUserUsername=props.authUserUsername;
console.log(authUserUsername)

const profileLink="/"+postCreatorUsername
const avatarUrl=post.user_avatar!==null?
"/storage/"+post.user_avatar
:
"/images/default_avatar.png";


/******************** funzione da esportare  ***********/
function escapeHtml(text) {
    return text
        .replace('%0',' ')
        .replace('+','')
        .replace(/&#039;/g, "'")
}
        /*****************************DELETE **************** */
function postDelete(){
    const URL="/posts/delete/"+id;
    axios.delete(URL,{
       data:{ user:postCreatorUsername}
    })
    .then(resp=>{
        console.log(resp)
        window.location.reload(false);
    })
    .catch(e=>{console.log(e)})
}

{/**************************** LIKE-HANDLER **************** */}
function likeHandler(bool){
    const url = "/like/"+post.id
    axios.post(url,{
        value:bool
    }).then(resp=>{
        console.log(resp.data)

        setLikes(resp.data[0][0])
        setDislikes(resp.data[1][0])

    }).catch(e=>console.log(e))
}

console.log(post)
return (


<div className=" container d-flex flex-column bg-light p-2 border-bottom border-bottom-success">
    <div className="d-flex w-100">
        <div className="mr-2 d-flex justify-content-start align-items-start">
            <Link to={profileLink}>
                <img
                    src={avatarUrl}
                    alt="avatar"
                    className="rounded-circle mr-2"
                    style={{width:"40px", height:"40px"}}
                />
            </Link>
        </div>
        <div className="w-100">
            <div className="d-flex justify-content-between align-items-start w-100">
                <h5 className="font-weight-bold mb-2 text-primary">{postCreatorUsername}</h5>
                {/********************** DELETE IMAGE ***************** */}
                {postCreatorUsername=== authUserUsername &&
                <img
                onClick={postDelete}
                className="border border-1 rounded-lg border-secondary p-1 mb-2"
                src="/images/trash.svg"
                width="25"
                />
                }
            </div>
            <div>
                <Link to={profileLink}>
                    <p className="text-decoration-none text-secondary">
                        {escapeHtml(decodeURIComponent(post.body))}
                    </p>
                </Link>
            </div>
        </div>
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

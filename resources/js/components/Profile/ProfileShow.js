import React,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Posts from '../Posts/Posts'
function ProfileShow(props) {
const [isFollowing,setIsFollowing]=useState(props.isFollowing==1?true:false);
const [followRefresh,setFollowRefresh]=useState(0);

const user_profile=JSON.parse(props.user.replace(/&quot;/g,'"'));
const posts=JSON.parse(props.posts.replace(/&quot;/g,'"'));
const description= decodeURIComponent(user_profile.description)!=='null'?
        escapeHtml(decodeURIComponent(user_profile.description))
     :
     "";

     /******************** funzione da esportare  ***********/
     function escapeHtml(text) {
        return text
            .replace('%0',' ')
            .replace('+','')
            .replace(/&#039;/g, "'")
      }
     // console.log(escapeHtml(user_profile.description));

const avatarCoverUrl=user_profile.avatar_cover?
        "/storage/"+user_profile.avatar_cover
        :
        "../images/default-profile-banner.jpg";
const avatarUrl=user_profile.avatar?
        "/storage/"+user_profile.avatar
        :
        "../images/default_avatar.png";


const joined=user_profile.created_at.slice(0, 10)
const followToggleUrl="/profile/"+user_profile.username+"/follow";
const editUrl="/profile/"+user_profile.username+"/edit"

function followToggle(){
    axios.post(followToggleUrl)
    .then(resp=>{
        console.log(resp);
        setFollowRefresh(followRefresh+1)
    }).catch(e=>{
        console.log(err);
    })
}

useEffect(() => {
    if(followRefresh==0){
    }else{
        setIsFollowing(!isFollowing)
    }
}, [followRefresh])


return (
    <div className="mx-auto col-5 d-flex flex-column">
        <header className="mb-6 p-1 position-relative border border-primary rounded bg-light">
        <div class="position-relative">
            <img
                src={avatarCoverUrl}
                alt="cover"
                className="mb-2 w-100 rounded-lg"
                style={{height:"230px"}}
            />
            
            <img
                src={avatarUrl}
                alt="avatar"
                className="rounded-circle mr-2 position-absolute avatarImage"
            />
        </div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-0 text-dark font-weight-bold m-1">{user_profile.username }</h2>
                    <p className="fs-2 text-dark m-2">Name: {user_profile.name}</p>
                    <p className="fs-2 text-dark m-2">Joined {joined}</p>
                </div>

                <div className="ml-3">
                   {props.isUser==1? <a
                        href={editUrl}
                        className="rounded border border-secondary py-2 px-3 text-dark mr-2 text-decoration-none"
                    ><h6 className="d-inline ">Edit Profile</h6></a>
                   :
                    <button
                        onClick={followToggle}
                        className=" btn btn-primary mr-2 rounded-lg py-2 px-3 text-light fs-2 text-decoration-none"
                    >{isFollowing?"UnFollow":"Follow"}</button>
                   }
                </div>
            </div>
            <hr/>
            <p className="text-dark ml-2 mr-1">
               { description}
            </p>
        </header>
        {posts.length>0 && 
            <div className="border rounded-lg  bg-light text-dark mt-2">
            {posts.map(function(post, index){
                    const key=post.id;
                    return(<Posts key={key} post={post} />)
                })}
        
        </div>
        }
    </div>
);}
export default ProfileShow;

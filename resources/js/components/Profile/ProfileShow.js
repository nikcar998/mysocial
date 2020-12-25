import React,{useEffect, useState} from 'react';
import axios from 'axios'
import Posts from '../Posts/Posts'
import { useParams } from "react-router";
import {Link} from "react-router-dom"


//questo componente serve a mostrare il profilo dell'utente cercato attraverso l'url
// se l'utente è anche l'authorized user si potrà accedere ai componenti per modificare il profilo
//sennò si potrà effettuare il follow o l'unfollow dell'utente
function ProfileShow(props) {
const [isFollowing,setIsFollowing]=useState(); 
const [followRefresh,setFollowRefresh]=useState(0);
const [user_profile,setUser_profile]=useState({});
const [posts,setPosts]=useState([]);
const [isUser,setIsUser]=useState();


const { username } = useParams();
console.log(username)
const description= decodeURIComponent(user_profile.description)!=='null'?
        escapeHtml(decodeURIComponent(user_profile.description))
     :
     "";


/******************************** Fetch State *********** */

 // per quanto di norma evito di richiamare tutti i dati necessari in unica funzione, qui ho deciso
 //di utilizzare un'unica funzione axios.get in quanto molti di questi sono valori "secondari", necessari soprattutto 
 //alla gestione dell'estetica della pagina e non volevo sporcare le mie routes per dei dati non strettamente legati al 
 //database 
const userUrl='/profile/'+username
function fetchProfile(){
    axios.get('/profile/'+username)
    .then(data=>{
        console.log(data.data)
        setIsFollowing(data.data.isFollowing);
        setIsUser(data.data.isUser)
        setUser_profile(data.data.user_profile)
        setPosts(data.data.posts)
    })
    .catch(e=>console.log(e))
}

useEffect(() => {
    fetchProfile()
}, [userUrl]) 

     /******************** funzione da esportare  ***********/
     function escapeHtml(text) {
        return text
            .replace('%0',' ')
            .replace('+','')
            .replace(/&#039;/g, "'")
      }

const avatarCoverUrl=user_profile.avatar_cover?
        "/storage/"+user_profile.avatar_cover
        :
        "../images/default-profile-banner.jpg";
const avatarUrl=user_profile.avatar?
        "/storage/"+user_profile.avatar
        :
        "../images/default_avatar.png";


const joined=user_profile.created_at!==undefined? user_profile.created_at.slice(0, 10) : "";
const followToggleUrl="/profile/"+user_profile.username+"/follow";
const editUrl="/edit"

/*************************** followtoggle ************* */

function followToggle(){
    axios.post(followToggleUrl)
    .then(resp=>{
        console.log(resp);
        setFollowRefresh(followRefresh+1)
        props.fetchFollows();
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
                   {isUser==1? <Link
                        to={editUrl}
                        className="rounded border border-secondary py-2 px-3 text-dark mr-2 text-decoration-none"
                    ><h6 className="d-inline ">Edit Profile</h6></Link>
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

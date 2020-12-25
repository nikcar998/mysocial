import React,{useEffect} from 'react';
import Posts from "../Posts/Posts"
import PublishPost from "../Posts/PublishPost"

// questo è il primo componente mostrato dopo l'iscizione o l'accesso al sito
// da la possibilità di vedere i posts propri e degli utenti seguiti e di crearne di nuovi
function Home(props) {
    const posts=props.posts

    
    return (
    <div className="mx-auto col-5 d-flex flex-column">
        <PublishPost user={props.user}/>
        { posts.length>0 &&
        <div className="border rounded-lg  bg-light text-dark mt-4">
            {posts.map(function(post, index){
                const key=post.id;
                return(<Posts key={key} post={post} authUserUsername={props.user.username}/>)
            })}
        </div>
        }
        
    </div>
)
}

export default Home;

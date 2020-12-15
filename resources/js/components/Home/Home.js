import React,{useEffect, useState} from 'react';
import Posts from "../Posts/Posts"
import PublishPost from "../Posts/PublishPost"
function Home(props) {
    let i=0;
    const posts=props.posts
    useEffect(() => {
        console.log(posts);
    }, [])
    return (
    <div className="mx-auto col-5 d-flex flex-column">
        <PublishPost user={props.user}/>
        { posts.length>0 &&
        <div className="border rounded-lg  bg-light text-dark mt-4">
            {posts.map(function(post, index){
                const key=post.id;
                return(<Posts key={key} post={post} />)
            })}
        </div>
        }
        
    </div>
)
}

export default Home;

import React from 'react';
import ReactDOM from 'react-dom';
import OptionsSide from "./OptionsSide/OptionsSide"
import Follows from "./Follows/Follows"
import ProfileShow from "./Profile/ProfileShow"
function Profile(props) {
    const user=JSON.parse(props.user.replace(/&quot;/g,'"'));
    const follows=JSON.parse(props.follows.replace(/&quot;/g,'"'));

    return (
      
                    <div className="container-fluid d-flex p-2 justify-content-center">
                        <OptionsSide user={user} className='col-md-3 mx-4'/>
                        <ProfileShow user={user_profile} isFollowing={isFollowing} posts={posts} isUser={isUser} />
                        <Follows follows={follows}/>
                    </div>
              
    );
}

export default Profile;

if (document.getElementById('rootProfile')) {
    ReactDOM.render(
        <Profile 
            user={user} 
            follows={follows} 
            posts={posts} 
            isUser={isUser} 
            isFollowing={isFollowing}   
            />, document.getElementById('rootProfile'));
}

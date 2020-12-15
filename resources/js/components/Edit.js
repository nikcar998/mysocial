import React from 'react';
import ReactDOM from 'react-dom';
import OptionsSide from "./OptionsSide/OptionsSide"
import Follows from "./Follows/Follows"
import ProfileEdit from "./Profile/ProfileEdit"
function Edit(props) {
    const user=JSON.parse(props.user.replace(/&quot;/g,'"'));
    const follows=JSON.parse(props.follows.replace(/&quot;/g,'"'));
    console.log(props.isFollowing)
    return (
      
                    <div className="container-fluid d-flex p-2 justify-content-center">
                        <OptionsSide user={user} className='col-md-3 mx-4'/>
                        <ProfileEdit user={user} />
                        <Follows follows={follows}/>
                    </div>
              
    );
}

export default Edit;

if (document.getElementById('rootEditProfile')) {
    ReactDOM.render(
        <Edit 
            user={user} 
            follows={follows}   
            />, document.getElementById('rootEditProfile'));
}

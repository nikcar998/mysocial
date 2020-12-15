import React from 'react';
import ReactDOM from 'react-dom';
import OptionsSide from "./OptionsSide/OptionsSide"
import Follows from "./Follows/Follows"
import ProfileSearch from "./Profile/ProfileSearch"
function Search(props) {
    const user=JSON.parse(props.user.replace(/&quot;/g,'"'));
    const follows=JSON.parse(props.follows.replace(/&quot;/g,'"'));
    const users=JSON.parse(props.users.replace(/&quot;/g,'"'));
    console.log(users)
    return (
      
                    <div className="container-fluid d-flex p-2 justify-content-center">
                        <OptionsSide user={user} className='col-md-3 mx-4'/>
                        <ProfileSearch users={users} /> 
                        <Follows follows={follows}/>
                    </div>
              
    );
}

export default Search;

if (document.getElementById('rootSearchProfile')) {
    ReactDOM.render(
        <Search 
            user={user} 
            follows={follows} 
            users={users}
            />, document.getElementById('rootSearchProfile'));
}

import React from 'react';
import ReactDOM from 'react-dom';
import Home from "./Home/Home"
import OptionsSide from "./OptionsSide/OptionsSide"
import Follows from "./Follows/Follows"

function App(props) {
    const user=JSON.parse(props.user.replace(/&quot;/g,'"'));
    const posts=JSON.parse(props.posts.replace(/&quot;/g,'"'));
    const follows=JSON.parse(props.follows.replace(/&quot;/g,'"'));
    return (
      
                    <div className="container-fluid d-flex p-2 justify-content-center">
                        <OptionsSide user={user} className='col-md-3 mx-4'/>
                        <Home user={user} posts={posts} />
                        <Follows follows={follows}/>
                    </div>
              
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App user={user} posts={posts} follows={follows}/>, document.getElementById('root'));
}

/*
                    <div className="container-fluid d-flex p-2 justify-content-center">
                        <OptionsSide user={user} className='col-md-3 mx-4'/>
                        <Profile />
                        <Follows follows={follows}/>
                    </div>
               */
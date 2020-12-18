import Chatpanel from './Chat/Chatpanel';
import React from 'react';
import ReactDOM from 'react-dom';
import OptionsSide from './OptionsSide/OptionsSide'
import Follows from './Follows/Follows'
import {ResultProvider} from "./ResultContext";

function Chat(props) {
    const user=JSON.parse(props.user.replace(/&quot;/g,'"'));
    const follows=JSON.parse(props.follows.replace(/&quot;/g,'"'));
    return (
        <ResultProvider>
                    <div className="container-fluid d-flex p-2 justify-content-center">
                        <OptionsSide user={user} className='col-md-3 mx-4'/>
                        <ResultProvider>
                        <Chatpanel user={user} follows={follows} />
                        </ResultProvider>
                        <Follows follows={follows}/>
                    </div>
        </ResultProvider>
              
    );
}

export default Chat;




if (document.getElementById('chat_panel_container')) {
    ReactDOM.render(
        <Chat 
            user={user} 
            follows={follows}   
            />, document.getElementById('chat_panel_container'));
}
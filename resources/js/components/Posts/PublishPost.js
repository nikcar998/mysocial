import React,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
function PublishPost(props) {
    const [inputValue,setInputValue]=useState('')
    Pusher.logToConsole = true;

    var pusher = new Pusher('e5221c7a4e5fdc179556', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      alert(JSON.stringify(data));
    });
    const user=props.user;
    const avatarUrl=user.avatar!==null?
    "/storage/"+user.avatar
    :
    "/images/default_avatar.png";
    function handleSubmit(e){
        axios.post('/posts',{
            body:encodeURIComponent(inputValue),
            user_avatar: user.avatar
        }).then(response=>{
            console.log(response )
        }).catch(e=>{
            console.log(e)
        })
        setInputValue('');
    }

    function handleChange(e){
        setInputValue(e.target.value);
    }


    return (
        <form  onSubmit={handleSubmit} className="mx-auto container flex flex-column text-dark bg-light p-2 rounded-lg border border-primary">
            <textarea onChange={handleChange} value={inputValue} className="w-100 border-0 p-2" placeholder="Let's write something!" maxLength="250" required></textarea>
            {/*<hr className="mt-1 mb-3 w-75"/> */}
            <footer className="row justify-content-between mx-2 h-25">
                <div className="p-0 d-inline">
                    <img
                    src={avatarUrl}
                    alt="avatar"
                    className="rounded-circle p-2"
                    style={{width:"60px",height:"60px"}}
                    ></img>
                    <p className="d-inline font-weight-bold text-primary">{user.username}</p>
                </div>
                <button type="submit" className="btn btn-primary my-3">
                    Submit!
                </button>  
            </footer> 
        </form>                 
    );
}

export default PublishPost;

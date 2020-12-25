import React,{useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from "./Home/Home"
import OptionsSide from "./OptionsSide/OptionsSide"
import Follows from "./Follows/Follows"
import Axios from 'axios'
import Chatpanel from './Chat/Chatpanel';
import ProfileSearch from './Profile/ProfileSearch';
import ProfileShow from './Profile/ProfileShow';
import ProfileEdit from './Profile/ProfileEdit';

function Routes()  {
// qui gestisco le varie routes e ricevo i valori "fondamentali" per la creazione della maggior parte dei componenti
    
    const [user,setUser]=useState({})
    const [posts,setPosts]=useState([])
    const [follows,setFollows]=useState([])
    let userUrl=user.username;

    function fetchUser(){
        Axios.get('/userdata')
        .then(data=>{
            setUser(data.data)
            console.log(data.data)
        }).catch(e=>console.log(e))
    }
    function fetchPosts(){
        Axios.get('/posts')
        .then(data=>{
            setPosts(data.data)
            console.log(data.data)
        }).catch(e=>console.log(e))
    }
    function fetchFollows(){
        Axios.get('/follows')
        .then(data=>{
            setFollows(data.data)
            console.log(data.data)
            console.log('3')
        }).catch(e=>console.log(e))
    }

    useEffect(() => {
      fetchUser()
      fetchPosts()
      fetchFollows()
     

    }, [])

        return (
             <div className="container-fluid d-flex p-2 justify-content-center">
                        <OptionsSide user={user} className='col-md-3 mx-4'/>
                        <Switch>
                        <Route exact path='/home' component={() => <Home user={user} posts={posts} />} />
                        <Route exact path='/' component={() => <Home user={user} posts={posts} />} />
                        <Route exact path='/chat' component={() => <Chatpanel user={user} follows={follows} />} />
                        <Route exact path='/search' component={() => <ProfileSearch />} />
                        <Route exact path='/edit' component={() => <ProfileEdit user={user} />} />
                        <Route exact path='/:username' component={() => <ProfileShow fetchFollows={fetchFollows} />} />
                        </Switch>
                        <Follows follows={follows}/>
                    </div>
        )
    
}

export default Routes;
import React,{ useState} from 'react';
import axios from 'axios'
import {Link} from "react-router-dom"

//questo è uno tra i componenti più grandi in quanto presenta 3 form, con le relative funzioni per gestire i submit
// e i cambiamenti nei vari input, che permettono di cambiare determinate parti del profilo dello user
function ProfileEdit(props){

   const [name,setName]=useState(props.user.name)
   const [username,setUsername]=useState(props.user.username)
   const [email,setEmail]=useState(props.user.email)
   const [description,setDescription]=useState(props.user.description!==null?
       decodeURIComponent(props.user.description).replace('%0',' ').replace('+','')
       :
       ""
       )
    const [avatar,setAvatar]=useState({});
    const [boxAppear,setBoxAppear]=useState({});
    const [cover,setCover]=useState({});

    const userUrl="/profile/"+props.user.username;
    const avatarUrl="/profile/"+props.user.username+"/avatar";
    const coverUrl="/profile/"+props.user.username+"/cover";
    
    const redirectUrl="/"+username;
    

    function editProfile(e)
    {
        setBoxAppear({zIndex:'0'});
        e.preventDefault()
        axios.patch(userUrl,{
            name:name,
            username:username,
            description:encodeURIComponent(description),
            email:email
        }).then(resp=>{
            console.log(resp);
        }).catch(e=>{
            console.log(e.response);
        });
    }

    function descriptionHandler(e){
        setDescription(e.target.value)
        console.log(description)
    }
    function emailHandler(e){
        setEmail(e.target.value)
        console.log(email)
    }
    function nameHandler(e){
        setName(e.target.value)
        console.log(name)
    }
    function usernameHandler(e){
        setUsername(e.target.value)
        console.log(username)
    }
    /********************************avatar -avatar_cover ********************************* */

    
    function avatarSubmit(e)
    {
        let formData= new FormData();
        formData.append('avatar',avatar);
        formData.append('_method','PATCH');
        console.log(avatar);
        console.log(cover);
        setBoxAppear({zIndex:'0'});

        e.preventDefault()
        axios.post(avatarUrl,formData).then(resp=>{
            console.log(resp);
        }).catch(e=>{
            console.log(e.response);
        });
    }
    function coverSubmit(e)
    {
        e.preventDefault()
        let formData= new FormData();
        formData.append('avatar_cover',cover);
        formData.append('_method','PATCH');
        console.log(cover);
        setBoxAppear({zIndex:'0'});
        axios.post(coverUrl,formData).then(resp=>{
            console.log(resp);
        }).catch(e=>{
            console.log(e.response);
        });
    }

    function avatarHandler(e){
        let files = e.target.files[0];
        setAvatar(files)
        console.log(avatar)
    }
    function coverHandler(e){
        let files = e.target.files[0];
        setCover(files)
        console.log(avatar)
    }

    
     return (
         <div className="bg-light mx-auto col-5 d-flex flex-column p-2 flex-coloum">
        <form onSubmit={editProfile}  className="p-0 m-0">
            <div className="p-2 d-flex flex-column bg-secondary rounded-lg w-50 position-absolute greyBox" style={boxAppear}>
                <h2 className="font-weight-bold text-center mt-3">Updated!</h2>
                <hr></hr>
                <Link to={redirectUrl} className="btn btn-primary  m-auto">
                    <h5 className="font-weight-bold text-center m-auto">Go have fun!</h5>
                </Link>
            </div>
        <div class="mb-6">
            <label class="d-block mb-2 text-uppercase font-weight-bold text-secondary"
            >
                Name
            </label>

            <input class="border border-secondary p-2 w-100"
                   type="text"

                   value={name}
                   onChange={nameHandler}
                   required
                   maxLength='250'
            />
        </div>

        <div class="mb-6">
            <label class="d-block mb-2 text-uppercase font-weight-bold text-secondary"
            >
                Username
            </label>

            <input class="border border-secondary p-2 w-100"
                   type="text"
                   value={username}
                   onChange={usernameHandler}
                   required
                   maxLength='250'
            />
        </div>

        <div class="mb-6">
            <label class="d-block mb-2 text-uppercase font-weight-bold text-secondary"
            >
                Email
            </label>

            <input class="border border-secondary p-2 w-100"
                   type="email"
                   value={email}
                   onChange={emailHandler}
                   required
                   maxLength='250'
            />

        </div>

        <div class="mb-6">
            <div className="p-0 m-0 d-flex justify-content-start ">
                <label class=" mb-2 text-uppercase font-weight-bold text-secondary"
                >
                    Description:
                </label>
                <h6 className="mt-1 ml-3 d-inline text-secondary">Try avoiding special characters!</h6>
            </div>

            <textarea class="border border-secondary p-2 w-100"
                   type="text"
                   name="username"
                   id="username"
                   value={description}
                   onChange={descriptionHandler}
            />
        </div>




        <div class="mb-6">
            <button type="submit"
                    class="btn btn-primary text-light rounded py-2 px-4 my-2 mr-1"
            >
                Submit
            </button>

            <Link to={"/"+username} class="hover:underline">Cancel</Link>
        </div>
    </form>

    {/*altro form per avatar  **************************************************/}
    <form className='bg-light p-1' onSubmit={avatarSubmit} >
        
        <div class="mb-6">
            <label class="d-block mb-2 text-uppercase font-weight-bold text-secondary"
            >
                Avatar
            </label>

            <div class="flex">
                <input class="border text-dark border-secondary p-1 "
                       type="file"
                       accept="image/*"
                       onChange={(e)=>{e.persist();avatarHandler(e);}}
                />

            
                <img src={props.user.avatar!==null?"/storage/"+props.user.avatar:"/images/default_avatar.png"}
                     alt="your avatar"
                     width="40"
                     height="40"
                />

            </div>
            <div class="mb-6">
            <button type="submit"
                    class="btn btn-primary text-light rounded py-2 px-4 my-2 mr-1"
            >
                Submit
            </button>

            <Link to={"/"+username} class="hover:underline">Cancel</Link>
            </div>
        </div>
</form>
 {/*altro form  cover *************************************************************/}
 <form className='bg-light p-1' onSubmit={coverSubmit} >
        <div class="mb-6">
            <label class="d-block mb-2 text-uppercase font-weight-bold text-secondary"
            >
                Cover
            </label>

            <div class="flex">
                <input class="border text-dark border-secondary p-1 "
                       type="file"
                       accept="image/*"
                       onChange={(e)=>{e.persist();coverHandler(e);}}
                />

            
                <img src={props.user.avatar_cover!==null?"/storage/"+props.user.avatar_cover:"/images/default-profile-banner.jpg"}
                     alt="your avatar"
                     width="80"
                     height="40"
                />

            </div>
        </div>

        <div class="mb-6">
            <button type="submit"
                    class="btn btn-primary text-light rounded py-2 px-4 my-2 mr-1"
            >
                Submit
            </button>

            <Link to={"/"+username} class="hover:underline">Cancel</Link>
            </div>

    </form>
    </div>
     )
}

export default ProfileEdit;
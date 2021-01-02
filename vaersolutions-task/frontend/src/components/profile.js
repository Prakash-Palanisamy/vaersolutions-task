import React from 'react';
import Header from '../header';
const Profile = (props) => {


    let email = localStorage.getItem('email');
   
    return(
        <div >
        <Header/>
        <div className="home">
       <h1>Welcome {email.substring(0, email.lastIndexOf("@"))}</h1>
       </div>
       
   </div>
        
       
    )
}

export default Profile;
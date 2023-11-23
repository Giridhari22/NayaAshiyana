import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

function Navbar() {
  let navigate = useNavigate();

    const queryParams = new URLSearchParams(window.location.search);

    const token =queryParams.get('token'); 
  let decodeToken
    if(token){
      decodeToken = jwt_decode(token);
      console.log("decode", decodeToken)
    }

    
    if(token){
      localStorage.setItem("token", token)
    
    }

    // Save the extracted data in local storage
   if(decodeToken){

     localStorage.setItem('user', JSON.stringify({ name:decodeToken.user.name, googleId:decodeToken.user.googleId, email:decodeToken.user.email, id:decodeToken.user._id }));
   }
   


  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isToggleMenuOpen, setIsToggleMenuOpen] = useState(false);

 
const handleToggleMenu = () => {
  setIsToggleMenuOpen(!isToggleMenuOpen)
};
  
const handleClick =()=>{
  setIsToggleMenuOpen(false)
}
  const handleUserLogin = () => {
    navigate("/SendOtp");
  };

  const handleLogout=()=>{
  
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate("/")

  }
  const handleHome = () =>{
    localStorage.removeItem('Nearby');
    localStorage.removeItem('nearbyCityData');

    navigate('/')
    
  }

  return (
    <div>
      <header id="header" className={`header fixed-top d-flex align-items-center `}  style={{boxShadow: " rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px"}}>
        <div className="container d-flex align-items-center justify-content-between">
          <a href="/"><img src="assets/img/Home.jpeg" alt="" title="" style={{ width: "100px", height: "50px" }} /></a>

          <nav id="navbar" className={`${isToggleMenuOpen ? 'navbar-mobile ' : 'navbar '}`}>
            <ul>
              <li><a className="nav-link scrollto active" onClick={handleHome} >Home</a></li>
              <li><a className="nav-link scrollto" href="#about-us"  onClick={handleClick}  >About</a></li>
              <li><a className="nav-link scrollto" href="#features"  onClick={handleClick}  >Features</a></li>
              <li><a className="nav-link scrollto" onClick={()=>{navigate("/ShortListed")}} >ShortListed</a></li>
              <li><a className="nav-link scrollto" href="#team" onClick={handleClick} >Team</a></li>
              <li><a className="nav-link scrollto" href="#pricing" onClick={handleClick} >Pricing</a></li>
                {user ? ( // Check if the user is logged in
                <li className="dropdown"  >
                  <a ><span>{user.name}</span><i className="bi bi-chevron-down"></i> </a>
                  <ul>
                  <li><a onClick={handleLogout} href="">Log out</a></li>              
                </ul>
                  </li>
                ) : (
              <li className="dropdown">
                   <a>Login<i className="bi bi-chevron-down"></i></a>
                <ul>
                  <li><a onClick={handleUserLogin} href="/SendOtp?type=nav">user</a></li>
                  {/* <li><a href="#">For Mess Owner</a></li> */}
                  <li><a onClick={()=>{navigate("/Main?type=Owner")}} style={{}}>For  Owner</a></li>
                  <li><a href="#">For Admin</a></li>
                </ul>
              </li>
                  )}
              <li><a className="nav-link scrollto" href="#contact"  onClick={handleClick}  >Contact</a></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle" onClick={handleToggleMenu} ></i>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Navbar;




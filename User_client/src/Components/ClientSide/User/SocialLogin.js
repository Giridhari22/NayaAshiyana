import React from 'react';
import "./SocialLogin.css"
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLoginButtons = () => {
  // Replace these with the actual URL paths to your logo images
  const googleLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png?20230822192911';
  const githubLogo = 'https://cdn-icons-png.flaticon.com/512/25/25231.png';
  const facebookLogo = 'https://img.freepik.com/premium-vector/blue-social-media-logo_197792-1759.jpg';
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  localStorage.setItem("type", type)
  const navigate = useNavigate ()
  
  const GoogleSignup = async () => {
    axios.post(`http://localhost:4500/hello/${type}`)
    .then((res)=>{
      console.log("google signup>>>>>",res)
    
    })
    window.location.href =`http://localhost:4500/auth/google`
    console.log("Google type", type)
  }


  return (
    <div className="social-login-buttons">
      <button className="google-button btnss" onClick={GoogleSignup}>
        <img src={googleLogo} alt="Google Logo" />
      </button>
      <ToastContainer />
      <button className="github-button btnss">
        <img src={githubLogo} alt="GitHub Logo" />

      </button>
      <button className="facebook-button btnss">
        <img src={facebookLogo} alt="Facebook Logo" />

      </button>
    </div>
  );
};

export default SocialLoginButtons;

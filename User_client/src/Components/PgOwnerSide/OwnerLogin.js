import React, { useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Intro.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import SocialLoginButtons from '../ClientSide/User/SocialLogin';

function OwnerLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  console.log("cheking the type", type)
  const [ownerType, setOwnerType] = useState(null); // Added state to track owner type
  const [otpSent, setOtpSent] = useState(false);
  const [owner, setOwner] = useState(JSON.parse(localStorage.getItem("owner")));
  console.log({owner})
  AOS.init();

  const formik = useFormik({
    initialValues: {
      email: '',
      otp: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      otp: Yup.string().test('required-when-otp-sent', 'Enter OTP', function (value) {
        if (otpSent) {
          return value && value.length > 0;
        }
        return true;
      }),
    }),
    onSubmit: async(values) => {
      // Handle login or OTP verification here
      if (otpSent) {
        if(ownerType ==="pg"){
          
          try {
           
            await axios.post('http://localhost:4500/loginOwner', {
              email: owner.email,
              otp: values.otp
            }).then(res => {
              console.log('Login :', res.data);
              localStorage.setItem("token", res.data.token)
              toast.success(res.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setTimeout(() => {
    
                navigate("/")
                // if (type === 'someType') {
                //   navigate("/PropertyListing");
                // } else if (type === 'nav') {
                //   navigate("/");
                // } else {
                //   // Handle other cases or show an error message
                // }
              }, 2000)
            })
            // Handle successful OTP sending
          }
           catch (error) {
            console.error('Error verifying OTP:', error);
            toast.failure("error verifying otp", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }



        }if(ownerType ==="mess"){

        }if(ownerType ===null)
        console.log('Verifying OTP:', values.otp);
      } else {
        // Handle sending OTP
        console.log('Sending OTP to:', values.email);
        if(ownerType ==="pg"){
          try {
            // Replace '/api/send-otp' with your actual OTP sending API endpoint
            await axios.post('http://localhost:4500/sendOtpOwner', {
              email: values.email,
            }).then(res => {
              console.log('OTP sent:', res.data);
              localStorage.setItem("owner", JSON.stringify(res.data.owner))
              toast.success(res.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              // setTimeout(() => {
    
              //   navigate(`/Login?type=${type}`)
              // }, 1000)
            })
            // Handle successful OTP sending
          } catch (error) {
            console.error('Error sending OTP:', error);
            // Handle error
          }
        }if(ownerType ==="mess"){
          alert("no function for mess right now")
        }if(ownerType ===null){
          alert("please select owner type")
        }
        // Set otpSent to true to reveal the OTP input field
        setOtpSent(true);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} data-aos="zoom-out" data-aos-delay="100">
        {/* Owner type selection buttons */}
        <div className="row mb-4">
          <div className="col-md-6">
            <button
              type="button"
              className={`btn ${ownerType === 'pg' ?'btn-outline-success' : 'btn-outline-danger'}`}
              onClick={() => setOwnerType('pg')}
              style={{borderRadius:"20px"}}
            >
              PG Owner
            </button>
          </div>
          <div className="col-md-6">
            <button
              type="button"
              className={`btn ${ownerType === 'mess' ? 'btn-outline-success' : 'btn-outline-danger'}`}
              onClick={() => setOwnerType('mess')}
              style={{borderRadius:"20px"}}
            >
              Mess Owner
            </button>
          </div>
        </div>

        {/* Email input */}
        <div className="form-outline col-md-12 mb-4">
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            className="form-control"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
        </div>

        {/* OTP input (conditionally rendered) */}
        {otpSent && (
          <div className="form-outline col-md-12 mb-4">
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              className="form-control"
              {...formik.getFieldProps('otp')}
            />
            {formik.touched.otp && formik.errors.otp ? (
              <div className="text-danger">{formik.errors.otp}</div>
            ) : null}
          </div>
        )}

        {/* Button to send OTP or login */}
        <button
          style={{ backgroundColor: '#71c55d' }}
          type="submit"
          className="btn col-md-12 mb-6"
        >
          {otpSent ? 'Login' : 'Send OTP'}
        </button>

        {/* Social login buttons */}
        <div className="text-center">
          <p>
            or login up with:
            </p>
          {/* Social media login buttons */}

      
        </div>
          <SocialLoginButtons />
      </form>
    </div>
  );
}

export default OwnerLogin;


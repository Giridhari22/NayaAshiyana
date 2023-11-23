


import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [countdown, setCountdown] = useState(59);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  console.log("cheking the type", type)
  const validationSchema = Yup.object({
    otp: Yup.string().required('OTP is required'),
  });

  const [resendLoading, setResendLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Replace '/api/send-otp' with your actual OTP sending API endpoint
        await axios.post('http://localhost:4500/loginUser', {
          email: user.email,
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

            // navigate("/")
            if (type === 'someType') {
              navigate("/PropertyListing");
            } else if (type === 'nav') {
              navigate("/");
            } else {
              // Handle other cases or show an error message
            }
          }, 2000)
        })
        // Handle successful OTP sending
      }
       catch (error) {
        console.error('Error sending OTP:', error);
        toast.failure("error sending otp", {
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
    },
  });


  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      // Replace '/api/resend-otp' with your actual OTP resending API endpoint
      await axios.post('http://localhost:4500/resendOtp', {
       email:user.email
      }).then(res => {
        console.log('OTP resent:', res.data);
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
        setResendLoading(false);
      });
      // Handle successful OTP resending
    } catch (error) {
      console.error('Error resending OTP:', error);
      setResendLoading(false);
      // Handle error
    }
  };

  return (
    <section className="vh-80 shadow" style={{ background: "#ececec", boxShadow: " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" }}>
      <div className="container py-5 h-60">
        <div className="row d-flex justify-content-center align-items-center h-60  ">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="assets/img/building.jpeg"
                    alt="verify otp form"
                    className="img-fluid h-100"
                    style={{ borderRadius: '1rem 0 0 1rem' }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center" style={{ background: "#fafafa" }}>
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={formik.handleSubmit}>

                      <div className="d-flex align-items-center mb-5 pb-1">
                        <a href="/"><img src="assets/img/Home.jpeg" alt="" title="" style={{ width: "100px", height: "50px" }} /></a>
                        <span className="h1 fw-bold mb-0 ml-3" style={{ color: "#92d283" }}> NayaAshiyana</span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3 d-flex justify-content-center" style={{ letterSpacing: '1px' }}>
                        Verify your OTP
                      </h5>

                      <div className="form-outline mb-4">

                        <input
                          id="otp"
                          name="otp"
                          type="otp"
                          size="lg"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.otp}
                        />
                        {formik.touched.otp && formik.errors.otp && <div className="text-danger">{formik.errors.otp}</div>}
                      </div>

                      <div className="p-1 mb-6">
                        <button
                          className="btn btn-lg  "
                          style={{ backgroundColor: "#92d283", marginLeft:"28%" }}
                          type="submit"
                        >
                          Verify OTP
                        </button>
                        <h5 className='d-flex justify-content-center pt-4'>otp expiration time <span style={{color:"orange" ,marginLeft:"5px",marginRight:"5px"}}> {' '}   00:{countdown}</span> seconds ?<a
                          className=""
                          style={{ color: "red" }}
                          type="link"
                          onClick={handleResendOtp}
                          disabled={resendLoading}
                        >
                          {resendLoading ? 'Resending...' : 'Resend OTP'}
                        </a></h5>
                        <ToastContainer />
                        <h5 className='d-flex justify-content-center p-3'>Go Back To sendOtp page ? {' '}<a style={{ color: "#92d283" }} onClick={()=>{navigate(`/SendOtp?type=${type}`)}}> SendOtp Page</a> </h5>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;


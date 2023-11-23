import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';


import { Formik, Form, Field, ErrorMessage } from 'formik';
import SocialLoginButtons from './SocialLogin';


const SendOtp = () => {

  const navigate = useNavigate()

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  console.log("cheking the type", type)

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
   
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Replace '/api/send-otp' with your actual OTP sending API endpoint
        await axios.post('http://localhost:4500/sendOtp', {
          email: values.email,
        }).then(res => {
          console.log('OTP sent:', res.data);
          localStorage.setItem("user", JSON.stringify(res.data.user))
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

            navigate(`/Login?type=${type}`)
          }, 1000)
        })
        // Handle successful OTP sending
      } catch (error) {
        console.error('Error sending OTP:', error);
        // Handle error
      }
    },
  });


  const handleRegisterPage =()=>{
    navigate(`/SignupUser?type=${type}`)
  }

  return (
    <section className="vh-80 shadow" style={{background: "#ececec",boxShadow:" rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}} >
      <div className="container py-5 h-60">
        <div className="row d-flex justify-content-center align-items-center h-60  ">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="assets/img/building.jpeg"
                    alt="login form"
                    className="img-fluid h-100"
                    style={{ borderRadius: '1rem 0 0 1rem' }} 
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center" style={{background: "#fafafa"}}>
                  <div className="card-body p-4 p-lg-5 text-black">
                    <Formik >
                      <Form onSubmit={formik.handleSubmit}>

                        <div className="d-flex align-items-center mb-5 pb-1">
                          {/* <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i> */}
                          <a href="/"><img src="assets/img/Home.jpeg" alt="" title="" style={{ width: "100px", height: "50px" }} /></a>
                          <span className="h1 fw-bold mb-0 ml-3" style={{ color: "#92d283" }}>    NayaAshiyana</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3 d-flex justify-content-center" style={{ letterSpacing: '1px' }}>
                          Sign into your account
                        </h5>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example17">
                            Email address
                          </label>
                          <Field
                            type="email"
                            id="form2Example17"
                            name="email"
                            placeholder="Enter Your Email"
                            className="form-control form-control-lg"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
                        </div>

                        <div className="pt-1 mb-4">
                          <button className="btn  btn-lg btn-block" style={{ backgroundColor: "#92d283" }} type="submit">
                          Send OTP
                          </button>
                          <ToastContainer />
                        </div>
                        <p className='d-flex justify-content-center'>Sign in with </p>
                        <SocialLoginButtons />
                          <h5 className='d-flex justify-content-center p-5'>Haven't Register Yet?<a style={{color: "#92d283"} } onClick={handleRegisterPage} >Register Now</a></h5>
                      </Form>
                    </Formik>
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

export default SendOtp;

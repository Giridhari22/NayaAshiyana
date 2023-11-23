import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useFormik } from 'formik';
import "./SocialLogin.css"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import SocialLoginButtons from './SocialLogin';



const SignupUser = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  console.log("cheking the type", type)

  const phoneRegExp = /^[0-9]{10}$/;
  // Define your validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().matches(phoneRegExp, 'phone number is not valid').required('phone number is required'),
    password: Yup.string().required('Password is required'),
    agreeToTerms: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      agreeToTerms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (values.agreeToTerms) {
        try {
          await axios.post('http://localhost:4500/signupUser', {
            name: values.name,
            email: values.email,
            phone: values.phone,
            password: values.password,
          })
            .then(res => {
              console.log("res=>", res)
              if (res.data.success === false) {
                alert(res.data.msg)
                toast.success(res.data.msg)
              }
              else {
                toast.success(res.data.msg, {
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

                  navigate("/SendOtp")
                }, 2000)
              }
            })

        } catch (error) {
          toast.success(error, {
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

            // navigate("/home")
          }, 2000)

        }
      } else {

        alert("please check the aggrement")
      }
    },
  });

  const handleNavLogin = ()=>{
    navigate(`/SendOtp?type=${type}`)
  }

  return (
    <section className="h-80 shadow" style={{background: "#ececec",boxShadow:" rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}}>
      <div className="container py-5 h-80">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img
                    src="assets/img/building2 image.jpeg"
                    alt="Sample photo"
                    className="img-fluid h-100"
                    style={{ borderTopLeftRadius: '.25rem', borderBottomLeftRadius: '.25rem' }}
                  />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase d-flex flex-row justify-content-center" style={{ color: "#92d283" }}>User Registration Form</h3>
                    <Formik >
                      <Form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                          <label htmlFor="name" className="form-label">
                            Name
                          </label>
                          <Field
                            type="text"
                            id="name"
                            name="name"
                            placeholder = "Enter Your Name"
                            className="form-control form-control-lg"
                            {...formik.getFieldProps('name')}
                          />
                          {/* <ErrorMessage name="name" component="div" className="text-danger" /> */}
                          {formik.touched.name && formik.errors.name && <div className="text-danger">{formik.errors.name}</div>}
                        </div>

                        <div className="mb-4">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <Field
                            type="text"
                            id="email"
                            name="email"
                            placeholder = "Enter Your Email"
                            className="form-control form-control-lg"
                            {...formik.getFieldProps('email')}
                          />
                          {/* <ErrorMessage name="email" component="div" className="text-danger" /> */}
                          {formik.touched.email && formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
                        </div>

                        <div className="mb-4">
                          <label htmlFor="phone" className="form-label">
                            Phone
                          </label>
                          <Field
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder = "Enter Your Phone Number"
                            className="form-control form-control-lg"
                            {...formik.getFieldProps('phone')}
                          />
                          {/* <ErrorMessage name="phone" component="div" className="text-danger" /> */}
                          {formik.touched.phone && formik.errors.phone && <div className="text-danger">{formik.errors.phone}</div>}
                        </div>

                        <div className="mb-4">
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          <Field
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter Your Password"
                            className="form-control form-control-lg"
                            {...formik.getFieldProps('password')}
                          />
                          {/* <ErrorMessage name="password" component="div" className="text-danger" /> */}
                          {formik.touched.password && formik.errors.password && <div className="text-danger">{formik.errors.password}</div>}
                        </div>
                        <div className='d-flex flex-row justify-content-center mb-4'>
                          <MDBCheckbox
                            name='agreeToTerms'
                            id='agreeToTerms'
                            label='I agree all statements in Terms of service'
                            {...formik.getFieldProps('agreeToTerms')}
                          />
                        </div>
                        {formik.touched.agreeToTerms && formik.errors.agreeToTerms && <div className="text-danger">{formik.errors.agreeToTerms}</div>}
                        <div className="d-flex justify-content-center pt-3">
                       
                          <button type="submit" className="btn btn-lg " style={{ backgroundColor: "#92d283" }}>
                            Register Now
                          </button>
                        </div>
                        <div  className="d-flex pt-5">
                          <SocialLoginButtons />
                        </div>

                      </Form>
                    </Formik>
                  </div>
                       <p className='d-flex flex-row justify-content-center '>Do you Want To ? <a href="" onClick={handleNavLogin}>Login</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupUser;


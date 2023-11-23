import React, { useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./Intro.css"
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


function RegisterOwner() {
    const navigate = useNavigate()

    const [ownerType, setOwnerType] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');
    console.log("cheking the type", type)
    AOS.init();



    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',


        },
        validationSchema: Yup.object({
            name: Yup.string().required('Fill name'),
            email: Yup.string().email('Invalid email address').required('Invalid email address'),
            phone: Yup.string().required('Fill phone number'),
            password: Yup.string().required('Fill Password'),


        }),
        onSubmit: async (values) => {
            // Handle form submission here
            const user = {
                name: values.name,
                email: values.email,
                phone: values.phone,
                password: values.password,
            }
            if (ownerType === "pg") {
                try {
                    // Replace '/api/send-otp' with your actual OTP sending API endpoint
                   const ownerRegister =  await axios.post('http://localhost:4500/signupOwner', user).then(res => {
                        console.log('OTP sent:', res.data);
                        localStorage.setItem("owner", JSON.stringify(res.data.owner))
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
                            if(ownerRegister){

                                navigate(`/?type=${type}`)
                            }
                        }, 1000)
                    })
                    // Handle successful OTP sending
                } catch (error) {
                    console.error('Error sending OTP:', error);
                    // Handle error
                }

                console.log("pg", { user });
            } if (ownerType === "mess") {
                console.log("mess", { user })
            } if (ownerType === null) {
                alert("please select owner type")
            }

        },
    });
    return (
        <div>

            <form onSubmit={formik.handleSubmit} data-aos="zoom-out" data-aos-delay="100">

                {/* buttons */}

                <div className="row mb-4">
                    <div className="col-md-6">
                        <button
                            type="button"
                            className={`btn ${ownerType === 'pg' ? 'btn-outline-success' : 'btn-outline-danger'}`}
                            onClick={() => setOwnerType('pg')}
                            style={{ borderRadius: "20px" }}
                        >
                            PG Owner
                        </button>
                    </div>
                    <div className="col-md-6">
                        <button
                            type="button"
                            className={`btn ${ownerType === 'mess' ? 'btn-outline-success' : 'btn-outline-danger'}`}
                            onClick={() => setOwnerType('mess')}
                            style={{ borderRadius: "20px" }}
                        >
                            Mess Owner
                        </button>
                    </div>
                </div>

                <div className="col-md-12 mb-4">
                    <div className="form-outline">
                        <input
                            type="text"
                            id="name"
                            placeholder='Enter Your Name'
                            className="form-control"
                            {...formik.getFieldProps('name')}
                        />

                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-danger">{formik.errors.name}</div>
                        ) : null}
                    </div>
                </div>



                <div className="form-outline col-md-12 mb-4">
                    <input
                        type="email"
                        id="email"
                        placeholder=' Enter Your Email'

                        className="form-control"
                        {...formik.getFieldProps('email')}
                    />

                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                </div>



                <div className="col-md-12 mb-4">
                    <div className="form-outline">
                        <input
                            type="Number"
                            id="phone"
                            placeholder='Enter Your Phone Number'

                            className="form-control"
                            {...formik.getFieldProps('phone')}
                        />

                        {formik.touched.phone && formik.errors.phone ? (
                            <div className="text-danger">{formik.errors.phone}</div>
                        ) : null}
                    </div>
                </div>

                <div className="form-outline col-md-12 mb-4">
                    <input
                        type="password"
                        id="password"
                        placeholder=' Enter Your Password'

                        className="form-control"
                        {...formik.getFieldProps('password')}
                    />

                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-danger">{formik.errors.password}</div>
                    ) : null}
                </div>
                {/* 
<div className="form-outline col-md-12 mb-4">
    <input
        type="city"
        id="city"
        placeholder=' Enter Your City Name'

        className="form-control"
        {...formik.getFieldProps('city')}
    />

    {formik.touched.city && formik.errors.city ? (
        <div className="text-danger">{formik.errors.city}</div>
    ) : null}
</div> */}



                <button style={{ backgroundColor: "#71c55d" }} type="submit" className="btn col-md-12 mb-6">
                    Sign up
                </button>
                <ToastContainer />


                <div className="text-center">
                    <p>or login up with:<a onClick={(e) => { navigate("/LoginNew") }}>Login</a>  </p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-google"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-twitter"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-github"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RegisterOwner
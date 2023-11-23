// import React from 'react';
// import { useFormik } from 'formik';
// import { TextField, Button } from '@material-ui/core';
// import axios from 'axios';

// const VerifyOtp = ({ userEmail, setStep }) => {
//   const formik = useFormik({
//     initialValues: {
//       otp: '',
//     },
//     onSubmit: async (values) => {
//       try {
//         const response = await axios.post('/api/verify-otp', {
//           email: userEmail, // Send the user's email for verification
//           otp: values.otp,
//         });
//         console.log('OTP Verified:', response.data);
//         // Handle successful verification
//       } catch (error) {
//         console.error('Error verifying OTP:', error);
//         // Handle error
//       }
//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <TextField
//         label="OTP"
//         name="otp"
//         type="text"
//         fullWidth
//         margin="normal"
//         variant="outlined"
//         onChange={formik.handleChange}
//         value={formik.values.otp}
//       />
//       <Button type="submit" variant="contained" color="primary">
//         Verify OTP
//       </Button>
//     </form>
//   );
// };

// export default VerifyOtp;

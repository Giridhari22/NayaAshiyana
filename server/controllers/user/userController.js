const User = require("../../models/userModels")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const nodemailer = require("nodemailer");

exports.SignupUser = async(req,res)=>{
    try {
        const { name, email,phone, password} = req.body
const store = { name, email,phone, password} 
     // Validate the request body
     if (!name || !email || !phone || !password) {
        return res.status(201).json({ msg: 'Missing required fields' });
      }
      const existingUser = await User.findOne({email});
      const salt = await bcrypt.genSalt(10);
      if(existingUser){
        return res.status(201).json({ msg: 'user already exists' });
      } 
      const user = new User({
        name,
        email,
        phone,
        password: await bcrypt.hash(password, salt),
        isActive: true,
      });
      await user.save();
      res.status(201).json({ user , msg:"user created successfully" });
    } catch (error) {
        console.log(error)
    }
}


// Create a Nodemailer transporter for sending OTP emails
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: 'testingsdd123@gmail.com',
      pass: 'yuxuyofxyjmdezlk'
    },
  });
  
  // Generate a random OTP
  function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000);
  }

exports.sendOtp = async(req,res) =>{
    const {email} = req.body;
  // Generate a random OTP
  const otp = generateOTP();
  const user = await User.findOneAndUpdate({ email },{otp});

if (user){

  // Send the OTP to the user's email
  const mailOptions = {
    from: '"Giridhari jha 👻" <testingsdd123@gmail.com>',
    to: email,
    subject: "OTP for Login",
    text: `Your OTP for login is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {   

      console.log(error);
      return res.status(500).json({ message: "Failed to send OTP" });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ message: "OTP sent successfully" , user:user });
    }
  });
}else{
  return res.status(404).json({message:"User not found"})
}
} 
 


exports.Login =  async (req, res) => {
    const { email, otp } = req.body;
  
    // Check if the user with the given email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Check if the OTP matches
    if (otp === user.otp) {
     
      user.isActive = true;
      user.save();
      let token=jwt.sign({ user: user, isUser: true }, "mynameisgiri");
      return res.json({success: true, token:token, user:user, message: "Logged in successfully" });
    } else {
      return res.json({ message: "Invalid OTP" });
    }
  }


exports.resendOtp =  async (req, res) => {
  const { email } = req.body;

  // Check if the user with the given email exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Generate a new OTP
  const newOtp = generateOTP();
  user.otp = newOtp;
  await user.save();

  // Resend the OTP to the user's email
  const mailOptions = {
    from: '"Giridhari jha 👻" <testingsdd123@gmail.com>',
    to: email,
    subject: 'Resent OTP for Login',
    text: `Your new OTP for login is: ${newOtp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Failed to resend OTP' });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ message: 'OTP resent successfully', user });
    }
  });
}

exports.getUser = async(req,res)=>{
  try {

    const users = await User.find();
    
   return res.status(200).json({msg:"user found successfully" , user:users})
  } catch (error) {
    console.log("error", error)
  }
}  

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { name, email,phone, password, isActive } = req.body;
    const { id } = req.params.id;

    // Validate the request body
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }

    // Update the user
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.password = password;
    user.isActive = isActive;

    // Save the user
    await user.save();

    // Send a 200 OK response
    res.status(200).json({ user });
  } catch (error) {
    // Send a 500 Internal Server Error response
    res.status(500).json({ error: error.message });
  }
};



// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    // Validate the request parameter
    if (!id) {
      return res.status(400).json({ error: 'Missing required parameter' });
    }

    // Check if the customer exists
    const user = await User.findByIdAndRemove(id);
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }



    // Send a 200 OK response
    res.status(200).json({ message: 'user deleted successfully' });
  } catch (error) {
    // Send a 500 Internal Server Error response
    res.status(500).json({ error: error.message });
  }
}
const Owner = require("../../models/ownersModel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const nodemailer = require("nodemailer");

exports.SignupOwner = async(req,res)=>{
    try {
        const { name, email,phone, password , city} = req.body
const store = { name, email,phone, password  } 
     // Validate the request body
     if (!name || !email || !phone || !password) {
        return res.status(201).json({ msg: 'Missing required fields' });
      }
      const existingUser = await Owner.findOne({email});
      const salt = await bcrypt.genSalt(10);
      if(existingUser){
        return res.status(201).json({ msg: 'owner already exists' });
      } 
      const owner = new Owner({
        name,
        email,
        phone,
        password: await bcrypt.hash(password, salt),
        isActive: true,
      });
      await owner.save();
      res.status(201).json({ owner , msg:"owner created successfully" });
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
    console.log(req.body)  
  // Generate a random OTP
  const otp = generateOTP();
//   const owner = await Owner.findOneAndUpdate({ email },{otp});

//   //   const expiration = new Date();
//   // expiration.setMinutes(expiration.getMinutes() + 15); // OTP valid for 15 minutes
//   // const otpData = ({ email, otp: otp.toString(), expiration });
// //   await owner.save();

//   // Send the OTP to the owner's email
//   const mailOptions = {
//     from: '"Giridhari jha 👻" <testingsdd123@gmail.com>',
//     to: email,
//     subject: "OTP for Login",
//     text: `Your OTP for login is: ${otp}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {   

//       console.log(error);
//       return res.status(500).json({ message: "Failed to send OTP" });
//     } else {
//       console.log("Email sent: " + info.response);
//       res.json({ message: "OTP sent successfully" , owner:owner });
//     }
//   });
// } 

try {
    // Check if the owner exists and update OTP
    const owner = await Owner.findOneAndUpdate({ email }, { otp }, { new: true });
        console.log({owner})
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    // Send the OTP to the owner's email
    const mailOptions = {
      from: `"NayaAshiyana Login Code" <testingsdd123@gmail.com>`,
      to: email,
      subject: "OTP for Login",
      text: `Your OTP for login is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to send OTP" });
      } else {
        console.log("Email sent: " + info.response);
        res.json({ message: "OTP sent successfully", owner: owner });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
 


exports.Login =  async (req, res) => {
    const { email, otp } = req.body;
  
    // Check if the owner with the given email exists
    const owner = await Owner.findOne({ email });

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    
    // Check if the OTP matches
    if (otp === owner.otp) {
      
      owner.isActive = true;
      owner.save();
      let token=jwt.sign({ owner: owner, isUser: true }, "mynameisgiri");
      return res.json({success: true, token: token, owner:owner, message: "Logged in successfully" });
    } else {
      return res.status(401).json({ message: "Invalid OTP" });
    }
  }

exports.getOwner = async(req,res)=>{
  try {

    const users = await Owner.find();
    
   return res.status(200).json({msg:"owner found successfully" , owner:users})
  } catch (error) {
    console.log("error", error)
  }
}  

// Update a owner
exports.updateOwner = async (req, res) => {
  try {
    const { name, email,phone, password, isActive } = req.body;
    const { id } = req.params.id;

    // Validate the request body
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the owner exists
    const owner = await Owner.findById(id);
    if (!owner) {
      return res.status(404).json({ error: 'owner not found' });
    }

    // Update the owner
    owner.name = name;
    owner.email = email;
    owner.phone = phone;
    owner.password = password;
    owner.isActive = isActive;

    // Save the owner
    await owner.save();

    // Send a 200 OK response
    res.status(200).json({ owner });
  } catch (error) {
    // Send a 500 Internal Server Error response
    res.status(500).json({ error: error.message });
  }
};



// Delete a owner
exports.deleteOwner = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    // Validate the request parameter
    if (!id) {
      return res.status(400).json({ error: 'Missing required parameter' });
    }

    // Check if the customer exists
    const owner = await Owner.findByIdAndRemove(id);
    if (!owner) {
      return res.status(404).json({ error: 'owner not found' });
    }



    // Send a 200 OK response
    res.status(200).json({ message: 'owner deleted successfully' });
  } catch (error) {
    // Send a 500 Internal Server Error response
    res.status(500).json({ error: error.message });
  }
}
const express = require('express');
const app = express();
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Replace with your actual Razorpay API credentials
const razorpayKey = 'rzp_test_IwVO9h2RjG7jkB';
const razorpaySecret = 'sPcVxIjoSMFkgSNclhrDOZDc';

const razorpay = new Razorpay({
  key_id: razorpayKey,
  key_secret: razorpaySecret,
});

app.use(express.json());

// Create an order
exports.sendOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // Amount should be in paise
      currency: 'INR',
    };

    razorpay.orders.create(options, (err, order) => {
      if (err) {
        console.log('err=>', err);
        return res.status(500).json({ code: 500, message: 'Server error' });
      } else {
        return res.status(200).json({ code: 200, message: 'Order created', data: order });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: 'Server error' });
  }
}

// Verify the payment signature
exports.VerifyOrder = (req, res) => {
  try {
    const body = req.body.response.razorpay_order_id + '|' + req.body.response.razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', razorpaySecret)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === req.body.response.razorpay_signature) {
      res.status(200).json({ code: 200, message: 'Signature valid' });
    } else {
      res.status(200).json({ code: 200, message: 'Signature not valid' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: 'Server error' });
  }
}



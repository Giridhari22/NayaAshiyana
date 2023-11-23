const router = require("express").Router()
const Payment = require("../controllers/payment/paymentController")

router.post("/sendOrder" , Payment.sendOrder)
router.post("/verifyOrder", Payment.VerifyOrder)

module.exports = router
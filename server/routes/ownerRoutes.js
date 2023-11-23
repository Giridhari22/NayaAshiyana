const router = require("express").Router();
const owner = require("../controllers/owner/ownerController");
const { validate } = require("../validation/validateModel");


router.post("/signupOwner" ,owner.SignupOwner )
router.post("/sendOtpOwner",owner.sendOtp )
router.post("/loginOwner",owner.Login)
router.get("/getOwner", owner.getOwner)
router.get("/updateOwner/:id",owner.updateOwner)
router.delete("/deleteOwner/:id",owner.deleteOwner)

module.exports = router

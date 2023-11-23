const router = require("express").Router();
const user = require("../controllers/user/userController");
const jwt = require("jsonwebtoken")
const { validate } = require("../validation/validateModel");
const passport = require('../passport');



router.post("/signupUser", validate, user.SignupUser)
router.post("/sendOtp", user.sendOtp)
router.post("/loginUser", user.Login)
router.get("/getUser", user.getUser)
router.post("/resendOtp",user.resendOtp)
router.get("/updateUser/:id", user.updateUser)
router.delete("/deleteUser/:id", user.deleteUser)
router.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate</a>')
});

let typeValue;


router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)
router.post("/hello/:type", (req, res) => {
  const type = req.params
  typeValue = type;
  console.log("type",type)

})

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        
      failureRedirect: "/SendOtp",
    //   failureFlash: true,
    //   successFlash: "Successfully logged in!",
    }),
    (req, res) => {
      console.log("batado",req.user)
      const socialInfo = req.user
      console.log('type value -->', typeValue)
     
      let token=jwt.sign({ user: socialInfo, isUser: true }, "mynameisgiri");
      console.log({token})
      if (typeValue.type ==="nav")
      res.redirect(`http://localhost:3000?token=${token}`)
      else{
        res.redirect(`http://localhost:3000/PropertyListing?token=${token}`)
      }
    
    }
  );
router.get('/profile', (req, res) => {
   return res.send("good", req.user)
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
// router.get('auth/google/callback',
//     passport.authenticate('google', {
//         successRedirect: '/protected',
//         failureRedirect: '/auth/google',
//         failureFlash: true,
//         successFlash: "Successfully logged in!",
//     })
// )



module.exports = router

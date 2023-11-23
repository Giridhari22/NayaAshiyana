const passport = require('passport');
const User = require('./models/userModels');
const jwt = require("jsonwebtoken")
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
// const GithubStrategy = require("passport-github2").Strategy;

 // for google
passport.use(new GoogleStrategy({
    clientID:"320650663751-cotb0vah6olidasf8433jfse8aj3bkl3.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:4500/auth/google/callback",
    passReqToCallback   : true
  },
  async(request, accessToken, refreshToken, profile, done) =>{
    console.log({profile})
    
  const existingUser = await User.findOne({ googleId: profile.id });

  if (existingUser) {
    
    // User already exists, log in
    let token=jwt.sign({ user: existingUser, isUser: true }, "mynameisgiri");
   console.log({token})
    // return done(null,existingUser);
    return done(null,  existingUser, token ); 
  }

  // User doesn't exist, create a new user
  const newUser = new User({
    googleId: profile.id,
    name: profile.displayName,
    providerName:profile.provider,
    email:profile.email

  });

  await newUser.save();
  let token=jwt.sign({ user: newUser}, "mynameisgiri");
   
  // return done(null,newUser);
  return done(null,  newUser, token );
  // done(null, newUser)
  }
));


//for github

// passport.use(
//   new GithubStrategy(
//     {
//       clientID: "bd27895abb194a5e6702",
//       clientSecret: "d752fd2429789311fd2a8222856600800264d285",
//       callbackURL: "http://127.0.0.1:8000/auth/github/callback"
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }


//     // async(request, accessToken, refreshToken, profile, done) =>{
//     //   console.log({profile})
      
//     // const existingUser = await User.findOne({ githubId: profile.id });
  
//     // if (existingUser) {
      
//     //   // User already exists, log in
//     //   let token=jwt.sign({ user: existingUser, isUser: true }, "mynameisgiri");
//     //  console.log({token})
//     //   // return done(null,existingUser);
//     //   return done(null,  existingUser, token ); 
//     // }
  
//     // // User doesn't exist, create a new user
//     // const newUser = new User({
//     //   githubId: profile.id,
//     //   name: profile.displayName,
//     //   providerName:profile.provider,
//     //   email:profile.email
  
//     // });
  
//     // await newUser.save();
//     // let token=jwt.sign({ user: newUser}, "mynameisgiri");
     
//     // // return done(null,newUser);
//     // return done(null,  newUser, token );
//     // // done(null, newUser)
//     // }
//   )
// );




passport.serializeUser(function(user, done) {
  done(null, user);
})

passport.deserializeUser(function(user, done) {
  done(null, user);
})

module.exports = passport;
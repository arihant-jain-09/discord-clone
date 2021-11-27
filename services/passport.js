const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const keys=require('../config/keys');
const mongoose=require('mongoose');
const User=mongoose.model('users');

passport.serializeUser((user,done)=>{
    return done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then((results)=>{
        done(null,results)
    })
    .catch((err)=>console.log(err))
})
passport.use(new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback'
},async(accesstoken,refresh_token, profile,done)=>{
    const results=await User.findOne({googleId:profile.id});
    console.log(results);
    if(results) done(null,results);
    else{
        const user=await new User({
            googleId:profile.id,
            displayName:profile.displayName,
            email:profile.emails,
            photo:profile.photos
        }).save();
        done(null,user);
    }
}))
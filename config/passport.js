const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {User} = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
},function(accessToken, refreshToken, profile, cb){
    User.findOne({'googleId': profile.id}, function(err, user){
        console.log('trying')
        if(err) return cb(err);
        console.log('checking for user')
        if(user) {
            return cb(null, user)
         } else {
             console.log('No User Found')
             let newUser = new User({
                googleId: profile.id,
                name: profile.displayName,
                viewings: []
             })
             newUser.save(function(err){
                 if (err) return cb(err)
                 return cb(null, newUser)
             })
         }
    })

}))

passport.serializeUser(function(student,done){
    done(null, student.id)
})

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, student){
        done(err, student)
    })
})
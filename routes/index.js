var express = require('express');
var router = express.Router();
let passport = require('passport')
const request = require('request')

/* GET home page. */
router.get('/', function(req, res,) {
  res.redirect('/users');
});

router.get('/auth/google', passport.authenticate(
  'google',
  {scope: ['profile', 'email']}
))

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/users',
    failureRedirect: '/users'
  }
))

router.get('/logout', function(req,res){
  req.logout()
  res.redirect('/users')
})

module.exports = router;

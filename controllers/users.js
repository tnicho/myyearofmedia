const {User} = require('../models/user');
const rootURLBooks = "https://www.googleapis.com/books/v1/volumes?q="
const request = require('request')


module.exports = {
    index,
};

function index(req, res, next){
    res.render('users/index', {title: '2022', user : req.user});
}


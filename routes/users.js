var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users')
var booksCtrl = require('../controllers/books.js')
var moviesCtrl = require('../controllers/movies.js')

/* GET users listing. */
router.get('/', usersCtrl.index);
router.get('/books/search', booksCtrl.index);
router.get('/movies/search', moviesCtrl.index);
module.exports = router;

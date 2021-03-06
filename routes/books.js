var express = require('express');
var router = express.Router();
var booksCtrl = require('../controllers/books')


router.post('/users/books/search', booksCtrl.searchAPI);
router.get('/users/books/:id', booksCtrl.show)
router.post('/users/books/:id/create', booksCtrl.create)
router.get('/users/books/edit/:id', booksCtrl.edit)
router.delete('/users/books/:id', booksCtrl.delete)
router.put('/users/books/:id', booksCtrl.update)
module.exports = router;
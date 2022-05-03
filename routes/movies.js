var express = require('express');
var router = express.Router();
var moviesCtrl = require('../controllers/movies')

router.post('/users/movies/search', moviesCtrl.searchAPI);
router.get('/users/movies/:id', moviesCtrl.show)
router.post('/users/movies/:id/create', moviesCtrl.create)

module.exports = router;
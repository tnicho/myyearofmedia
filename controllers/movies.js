const {User,Viewings} = require('../models/user');
const rootURL = "https://imdb-api.com/en/API/"
const request = require('request')
module.exports = {
    index,
    searchAPI,
    show,
    create,
};


//Show the Search Page
function index(req, res){
    res.render('users/movies/search', {results:null, user: req.user})
}


function searchAPI(req, res){  

    request((rootURL + `SearchMovie/${process.env.IMDB_API_KEY}/${req.body.title} ${req.body.releaseYear}`), function(err, response, body){
        const searchResults = JSON.parse(body);
        console.log(searchResults)
        res.render('users/movies/search', {results: searchResults.results, user : req.user})
    })
}

function show (req, res){
    const movieId = req.params.id
    request((rootURL + `Title/${process.env.IMDB_API_KEY}/${movieId}/FullActor,Posters`), function(err, response, body){
        const movie = JSON.parse(body);
        res.render('users/movies/show', {movie, user: req.user})
    })
}

function create (req, res){
    console.log(req.user)
    req.user.viewings.push(req.body)
    req.user.save(function(err){
        //redirect back to the show page
      })

}
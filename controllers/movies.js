const {User,Viewings} = require('../models/user');
const rootSearchURL = "https://api.themoviedb.org/3/search/movie?api_key="
const rootShowURL = "https://api.themoviedb.org/3/movie/"
const request = require('request')
module.exports = {
    index,
    searchAPI,
    show,
    create,
    delete: deleteViewing,
    edit,
    update,
};


//Show the Search Page
function index(req, res){
    res.render('users/movies/search', {results:null, user: req.user})
}

function searchAPI(req, res){  
    let replaceSpaces = req.body.title.replaceAll(' ','%20');
    let searchYear = '';
    if (req.body.year) {
        searchYear = ('&year=' + req.body.year)
    }
    request((rootSearchURL + `${process.env.TMDB_API_KEY}&language=en-US&query=${replaceSpaces}&page=1&include_adult=false ${searchYear}`), function(err, response, body){
        const searchResults = JSON.parse(body);
        console.log(searchResults)
        res.render('users/movies/search', {results: searchResults.results, user : req.user})
    })
}
function show (req, res){
    const movieId = req.params.id;
    let movieDetails;
    let viewings;
    let director;
    let writer;
    let stars = '';
    request((rootShowURL + `${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`), function(err, response, body){
        movieDetails = JSON.parse(body);
        viewings = req.user.viewings.filter(viewing => viewing.apiId === req.params.id)
        request((rootShowURL + `${movieId}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`), function(err, response, body){
            const movieCredits = JSON.parse(body);
            for (let i = 0; i< 4; i++){
                stars = stars + movieCredits.cast[i].original_name +', '
            }
            director = movieCredits.crew.find(function (crew){
                return crew.job === 'Director'
            })
            writer = movieCredits.crew.find(function (crew){
                return crew.job === 'Screenplay'
            })
            res.render('users/movies/show', {
            movieDetails, stars, director: director.original_name, writer: writer.original_name, viewings, user: req.user
        })
        })
    })
}

function create(req, res){
    req.user.viewings.push(req.body)
    req.user.save(function(err){
    res.redirect('/users/movies/' + req.params.id)
    });
}

function deleteViewing(req,res){
    const idx = req.user.viewings.findIndex(viewing => viewing.id === req.params.id);
    req.user.viewings.splice(idx,1)
    req.user.save(function(err){
        res.redirect('/users/books/' + req.body.apiId)
        });
}

function edit (req, res){
    let viewing = req.user.viewings.find(viewing => viewing.id === req.params.id)
    let movieDetails;
    let director;
    let writer;
    let stars = '';
    request((rootShowURL + `${viewing.apiId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`), function(err, response, body){
        movieDetails = JSON.parse(body);
        viewings = req.user.viewings.filter(viewing => viewing.apiId === req.params.id)
        request((rootShowURL + `${viewing.apiId}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`), function(err, response, body){
            const movieCredits = JSON.parse(body);
            for (let i = 0; i< 4; i++){
                stars = stars + movieCredits.cast[i].original_name +', '
            }
            director = movieCredits.crew.find(function (crew){
                return crew.job === 'Director'
            })
            writer = movieCredits.crew.find(function (crew){
                return crew.job === 'Screenplay'
            })
            console.log(viewing)
            res.render('users/movies/edit', {
            movieDetails, stars, director: director.original_name, writer: writer.original_name, viewing, user: req.user
        })
        })
    })   
}

function update(req,res){
    const idx = req.user.viewings.findIndex(viewing => viewing.id === req.params.id);
    req.user.viewings.splice(idx,1, req.body)
    req.user.save(function(err){
        res.redirect('/users/movies/' + req.body.apiId)
    });
}

function deleteViewing(req,res){
    const idx = req.user.viewings.findIndex(viewing => viewing.id === req.params.id);
    req.user.viewings.splice(idx,1)
    req.user.save(function(err){
        res.redirect('/users/movies/' + req.body.apiId)
    });
}
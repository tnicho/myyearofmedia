const {User,Viewings} = require('../models/user');
const rootURL = "https://www.googleapis.com/books/v1/volumes"
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
    res.render('users/books/search', {results:null, user: req.user})
}

function searchAPI(req, res){
    let search = '?q=';
    let replaceSpaces = '';
    if (req.body.title){
        replaceSpaces = req.body.title
        replaceSpaces = replaceSpaces.replaceAll(' ','+')
        search = search + "intitle:" + replaceSpaces
    }
    if (req.body.author) {
        replaceSpaces = req.body.author
        replaceSpaces = replaceSpaces.replaceAll(' ','+')
        search = search + '+inauthor:'+ replaceSpaces
    }

    request((rootURL + search), function(err, response, body){
        const searchResults = JSON.parse(body);
        console.log(searchResults)
        res.render('users/books/search', {results: searchResults.items, user: req.user})
    })
}

function show (req, res){
    request((rootURL + '/' + req.params.id), function(err, response, body){
        const book = JSON.parse(body);
        const viewings = req.user.viewings.filter(viewing => viewing.apiId === req.params.id)
        res.render('users/books/show', {book, viewings, user: req.user})
    })
}

function create(req, res){
    req.user.viewings.push(req.body)
    req.user.save(function(err){
    res.redirect('/users/books/' + req.params.id)
    });
}

function deleteViewing(req,res){
    const idx = req.user.viewings.findIndex(viewing => viewing.id === req.params.id);
    req.user.viewings.splice(idx,1)
    req.user.save(function(err){
        res.redirect('/users/movies/' + req.body.apiId)
    });
}

function edit (req, res)
{
    const viewing = req.user.viewings.find(viewing => viewing.id === req.params.id)
    request((rootURL + '/' + viewing.apiId), function(err, response, body){
        const book = JSON.parse(body);
        res.render('users/books/edit', {book, viewing, user: req.user})
    })
    
}

function update(req,res){
    const idx = req.user.viewings.findIndex(viewing => viewing.id === req.params.id);
    req.user.viewings.splice(idx,1, req.body)
    req.user.save(function(err){
        res.redirect('/users/movies/' + req.body.apiId)
    });

}
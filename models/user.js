const { default: mongoose } = require("mongoose");

var viewingSchema = new mongoose.Schema({
    viewDate: String,
    rating: Number,
    notes: String,
    title: String,
    coverImage: String,
    release: String,
    mediaType: {
        type: String,
        enum: ['Book', 'Movie', 'TV']
    },
    creator: String,
    apiId: String,
});

var mediaSchema = new mongoose.Schema({
    mediaType: {
        type: String,
        enum: ['Book', 'Movie', 'TV']
    },
    title: String,
    creator: String,
    coverImage: String,
    release: String,
    
    viewings: [viewingSchema]
})

var userSchema = new mongoose.Schema({
    googleID: String,
    name: String,
    viewings: [viewingSchema],
    
}, {
    timestamps: true
});

let User = mongoose.model('User', userSchema);
let Viewings = mongoose.model('Viewing', viewingSchema);
module.exports = {User, Viewings}
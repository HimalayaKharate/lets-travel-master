// creating schema and class

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//creating schema
let postSchema = new Schema({
    id:String,
    title:String,
    date:Date,
    description: String,
    text: String,
    country: String,
    imageUrl: String,
    mapUrl: String,
    price: String
});
//Creating model
let Post = mongoose.model('Post', postSchema);


module.exports = {
    Post : Post
}
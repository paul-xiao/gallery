const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define collection and schema for Course
var Post = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    desc: {
        type: String
    }
},{
    timestamps: true,
    collection: 'post'
});

module.exports = mongoose.model('Post', Post);

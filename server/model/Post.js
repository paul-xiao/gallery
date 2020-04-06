const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define collection and schema for Course
var Post = new Schema({
    title: {
        type: String,
        required: true
    },
    attaches:[
        new Schema({
            name: {
                type: String,
            },
            link: {
                type: String,
            },
            type: {
                type: String,
            },
            size: {
                type: String,
            },
        },{
            timestamps: true,
            collection: 'file'
        })
    ],
    desc: {
        type: String
    }
},{
    timestamps: true,
    collection: 'post'
});

module.exports = mongoose.model('Post', Post);

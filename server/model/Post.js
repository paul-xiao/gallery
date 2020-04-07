const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define collection and schema for Course
var Post = new Schema({
    title: {
        type: String,
        required: true
    },
    files:[
        new Schema({
            name: {
                type: String,
            },
            path: {
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

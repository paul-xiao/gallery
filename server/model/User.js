const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var bcrypt = require('bcryptjs');

// Define collection and schema for Course
var User = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    nickname: {
        type: String
    },
    region: {
        type: String
    },
    slogan: {
        type: String
    }
},{
    timestamps: true,
    collection: 'user'
});

User.plugin(passportLocalMongoose);

User.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
User.methods.comparePassword =  function (passw, cb) {
    console.log(bcrypt.compareSync(passw, this.password))
    return bcrypt.compareSync(passw, this.password);
};

module.exports = mongoose.model('User', User);

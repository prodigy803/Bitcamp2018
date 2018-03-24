const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Initalize Schema
const Schema = mongoose.Schema


// Define a UserSchema
const UserSchema = new Schema({

    fullName    : String,
    userName    : String,
    password    : String,
    email       : String,
    proImage    : String,
    createdAt	: String,
    tPass	    : String,
	tPassTime   : String,
    type        : String,
    mobNo       : Number,
    mobVer      : Boolean,
    emailVer    : Boolean,
    country     : String,
    state       : String,
    city        : String,
    loc         : {
                    type: [Number],  // [<longitude>, <latitude>]
                    index: '2d'      // create the geospatial index
                },
    blockID     : String

});

// Define and Export Model
const User = mongoose.model('User', UserSchema);
module.exports = User;

// Query Functions
module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.getUserByUserName = (userName, callback) => {
    const query = { userName }
    User.findOne(query, callback);
}

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10)
        .then((salt) => bcrypt.hash(newUser.password, salt))
        .then((hash) => {
            newUser.password = hash;
            newUser.save(callback);
        }).catch((err) => console.log('There was an error adding a user.'));
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash)
        .then((isMatch) => {
            callback(null, isMatch);
        }).catch((err) => console.log('There was an error with authentication.'));
    }



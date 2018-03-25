const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Initalize Schema
const Schema = mongoose.Schema


// Define a UserSchema
const rfpSchema = new Schema({

    userId      : String,
    proType     : String,
    proSubType  : String,
    proName     : String,
    quantity    : Number,
    basePrice   : Number,
    proImage    : String,
    rfpTime     : String,
    approveTime : String,
    rfpstatus   : String
    
});

const rfp = mongoose.model('RFP', rfpSchema);
module.exports = rfp;

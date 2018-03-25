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
    quantity    : String,
    basePrice   : String,
    proImage    : String,
    rfpTime     : String,
    approveTime : String,
    rfpstatus   : String,
    bidStatus   : String,
    bidPrice    : String,
    bidders     : [{
                    uId      : String,
                    bidPrice : String,
                    bidTime  : String
                  }]
    
});

const rfp = mongoose.model('RFP', rfpSchema);
module.exports = rfp;

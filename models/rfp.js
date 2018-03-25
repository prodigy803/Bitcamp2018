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
<<<<<<< HEAD
    rfpstatus   : String

=======
    rfpstatus   : String,
    bidStatus   : String,
    bidPrice    : String
    
>>>>>>> cb53b0e23b9b4b778dbd8c41f338b6c1e3bbac17
});

const rfp = mongoose.model('RFP', rfpSchema);
module.exports = rfp;

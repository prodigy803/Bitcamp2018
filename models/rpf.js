const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Initalize Schema
const Schema = mongoose.Schema


// Define a UserSchema
const RpfSchema = new Schema({

    u_id :  String,
    product_type : String,
    product_subtype : String,
    product_name : String,
    quantity : Number,
    base_price : Number
});

const Rpf = mongoose.model('Rpf', RpfSchema);
module.exports = Rpf;

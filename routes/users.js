const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const request = require('request');
const database = require('../config/database');
const Web3 = require('web3');
const randomstring = require('randomstring');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const config = require('../config/config');

// Import Mongoose Model
const User = require('../models/user');

// web3.eth.getBalance(accounts[3], function(err, getBalance){
//     if(err == null) console.log(getBalance.c);
//     var data = getBalance;
//     console.log(data.c);
// });

// Connect to TestRPC
let web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));

// Register User
router.post('/register', (req, res, next) => {

    var count = 0;
    var ethID = 0;

    User.count(function(err, c) {
        console.log('Count is ' + c);
        count = c;
    });

    web3.eth.getAccounts(function(err, accounts){
        if(err == null) {
            console.log(accounts[0]);
            ethID = accounts[count];
        }
    });

    var options = {
        uri: 'https://geoip-db.com/json'
    };

    request(options, function (error, response, body) {

        if(error) {
            return res.json({success: false, msg: 'Failed To Find Location ! Try Again.'});
        }
        else {
            var data = JSON.parse(body);

            country = data.country_name;
            state = data.state;
            city = data.city;
            lon = data.longitude;
            lat = data.latitude;

            let newUser    = new User({

                fullName   : req.body.fullName,
                userName   : req.body.userName,
                password   : req.body.password,
                email      : req.body.email,
                proImage   : req.body.proImage,
                createdAt  : new Date(),
                type       : req.body.type,
                loc        : [parseFloat(lon),parseFloat(lat)],
                country    : country,
                state      : state,
                city       : city,
                ethID      : ethID

            });

            User.addUser(newUser, (err, user) => {
                (err) ? res.json({success: false, message: 'Failed to register user'}) : res.json({success: true, message: 'User registered'});
            });
        }

    });

});

// Authenticate User
router.post('/authenticate', (req, res, next) => {

    const userName = req.body.username;
    const password = req.body.password;

    User.getUserByUserName(userName, (err, user) => {

        if(err) return res.json({success: false, msg: 'Error In Authentication Request !'});

        if(!user) return res.json({success: false, msg: 'User not found!'});

        User.comparePassword(password, user.password, (err, isMatch) => {

            if(err) return res.json({success: false, msg: 'Error In Password Validation !'});

            if(isMatch) {
                const token = jwt.sign({data: user}, database.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: {

                        id          : user._id,
                        fullName    : user.fullName,
                        username    : user.userName,
                        proImage    : user.proImage,
                        email       : user.email,
                        type        : user.type,
                        loc         : user.loc,
                        country     : user.country,
                        state       : user.state,
                        city        : user.city

                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong Password!' });
            }
        });
    });
});


// Profile Page - Protected Route
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});


// Get all Users
router.get("/getUsers", function(req, res, next){

	User.find({}, (err, allUsers) => {

		if(err){
			return res.json({success: false, msg: 'Internal Server Error !'});
		}else{
			return res.json({success: true, msg: allUsers});
		}
	});
});

// Forget Password / Reset Password
router.post('/forgetpass', (req, res, next) => {

    const email = req.body.email;
    const newPassword = req.body.newPassword;
    const token = req.body.token;

    if ( !newPassword || !newPassword.trim() || !token || !token.trim()) {

        const random = randomstring.generate(8);

        User.find({email: email}, (err, user) => {
            
            if(err) {

                return res.json({ success: false, msg: 'Email ID is Not Registered !' });

            }else {

                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(random, salt);
                user[0].tPass = hash;
                user[0].tPassTime = new Date();

                user[0].save(function(err, mail) {

                    if (err) {

                        return res.json({ success: true, msg: 'Temporary Password Not Saved' });

                    } else {

                        const transporter = nodemailer.createTransport(`smtps://${config.email}:${config.password}@smtp.gmail.com`);

                        const mailOptions = {

                            from: `"${config.name}" <${config.email}>`,
                            to: email,
                            subject: 'Reset Password Request ',
                            html: `Hello ${user[0].userName},<br><br>
                            &nbsp;&nbsp;&nbsp;&nbsp; Your reset password token is <b>${random}</b>.
                            The token is valid for only 2 minutes.<br><br>
                            Thanks,<br>
                            BitCamp.`

                        };

                        let emailStatus = transporter.sendMail(mailOptions);

                        if(emailStatus != undefined){
                            return res.json({ success: true, msg: 'Check mail for instructions' });
                        }else{
                            return res.json({ success: false, msg: 'Email Not Sent' });
                        }

                    }
                });

            }
        });

	} else {

        User.find({email: email}, (err, user) => {

            if(err) {

                return res.json({ success: false, msg: 'Email ID is Not Registered !' });

            }else {

                const diff = new Date() - new Date(user[0].tPassTime);
                const seconds = Math.floor(diff / 1000);
                console.log(`Seconds : ${seconds}`);

                if (seconds < 120) {

                    if (bcrypt.compare(token, user[0].tPass)) {

                        const salt = bcrypt.genSaltSync(10);
                        const hash = bcrypt.hashSync(newPassword, salt);
                        user[0].password = hash;
                        user[0].tPass = undefined;
                        user[0].tPassTime = undefined;

                        user[0].save(function(err) {

                            if (err) {

                                return res.json({ success: true, msg: 'Failed to Save New Password into DB' });

                            } else {

                                return res.json({ success: true, msg: 'Password Changed Sucessfully' });

                            }
                        });

                    }else{
                        return res.json({ success: false, msg: 'Invalid Token' });
                    }
                }
                else{
                    return res.json({ success: false, msg: 'Time Out ! Try again' });
                }

            }
        });

	}

});


// Check for Unique EmailID
router.post('/existEmail', (req, res, next) => {

    email = req.body.email;

    User.find({email: email}, (err, emailFound) => {

		if(emailFound.length){
            var msg = email + " Already Registered ! Try Another Email-ID.";
            return res.json({ success: true, msg: msg });
		}else{
            var msg = email + " This Email-ID is Valid."
			return res.json({ success: true, msg: msg });
		}
	});

});

// Check for Unique UserName
router.post('/existUserName', (req, res, next) => {

    userName = req.body.username;

    User.find({userName: userName}, (err, userNameFound) => {

		if(userNameFound.length){
            var msg = userName + " Already Registered ! Try Another UserName.";
            return res.json({ success: true, msg: msg });
		}else{
            var msg = userName + " This UserName is Valid.";
			return res.json({ success: true, msg: msg });
		}
	});

});

// Set File Storage Destination
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload Variable
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('user_image');

// Check File Type
function checkFileType(file, cb) {
    //Allowed Extension
    const filetypes = /jpeg|jpg|png|gif/;
    // Check Ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check MIME Type
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    }else{
        cb('Error: Images Only!');
    }
  }

// Upload User's Profile Pic
router.post('/upload', ( req, res ) => {

    upload(req, res, (err) => {

        if(err){
            // console.log(err);
        }else {
            if(req.file == undefined){
                console.log("No File Selected");
            }else{
                user_id = req.body.user_id;
                filename = req.file.filename;
                filePath = 'uploads/' + filename;
                User.findById(user_id, (err, update) => {
                    if(err){
                        res.status(500).json({ errmsg: err });
                    } else {
                        update.proimage = filePath;
                        update.save(function(err) {
                            if (err) {
                                res.status(500).json({ errmsg: err });
                            } else {
                                res.status(200).json({ msg: "Image Path Updated!", proImage: filePath });
                            }
                        });
                    }
                });
            }
        }
    });
});

router.get("/sendotp", function(req, res, next){
    var msg91 = require("msg91")("163728AzL4L4F5595b4811", "MSGIND", "4" );

    var mobileNo = "9892851277";
    var message = "Your OTP is 4567. Verify your mobile number using this OTP."

    msg91.send(mobileNo, message, function(err, response){
        console.log(err);
        console.log(response);
    });

    msg91.getBalance("4", function(err, msgCount){
        console.log(err);
        console.log(msgCount);
    });

});

module.exports = router;

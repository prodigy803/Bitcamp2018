const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const request = require('request');
const config = require('../config/database');

// Import Mongoose Model
const RFP = require('../models/rfp');


// Register User
router.post('/create', (req, res, next) => {

    const reqFile = req.body.proImage;
    const userId = req.body.userId;
    let rfpId = 0;

    let newRFP    = new RFP({

        userId      : req.body.userId,
        proType     : req.body.proType,
        proSubType  : req.body.proSubType,
        proName     : req.body.proName,
        quantity    : req.body.quantity,
        basePrice   : req.body.amount,
        proImage    : req.body.proImage,
        rfpTime     : Date(),
        approveTime : "Default",
        rfpstatus   : "Submitted",
        bidStatus   : "Submitted",
        bidPrice    : req.body.amount

    });

    RFP.save(newRFP, (err, saveRFP) => {
        if(err){
            return res.json({success: false, message: 'Failed to Register Your Product'});
        }else {
            return res.json({success: true, message: 'RFP Submitted Successfully !'});
        }

    });
});

// Get All RFPs
router.get('/getrfp', (req, res, next) => {

    RFP.find({}, (err, allRFP) => {
		
		if(err){
			return res.json({success: false, message: 'Failed to get All RFPs'});
		}else{
			return res.json({success: true, message: allRFP});
        }
	});
});


module.exports = router;

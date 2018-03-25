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
        bidStatus   : "Submitted"

    });

    newRFP.save(newRFP, (err, saveRFP) => {
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

// Update Bids
router.post('/updatebid', (req, res, next) => {

    rfpId = req.body.rfpId;
    userId = req.body.uId;
    bidPrice = req.body.bidPrice;

    RFP.findByIdAndUpdate(rfpId,
        {$push: {bidders: {

            "uId": userId,
            "bidPrice": bidPrice,
            "bidTime": Date()

        }}},
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
                return res.json({success: false, message: 'Failed to Make Your Bid !'});
            }else{
                return res.json({success: true, message: 'Congrats You are the Latest Highest Bidder!'});
            }
        }
    );

});


module.exports = router;

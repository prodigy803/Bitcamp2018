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
}).single('pro_image');

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
        proImage    : "Default",
        rfpTime     : Date.now(),
        approveTime : req.body.approveTime,
        rfpstatus   : req.body.rfpstatus

    });

    RFP.save(newRFP, (err, saveRFP) => {
        if(err){
            console.log(err);
            return res.json({success: false, message: 'Failed to Register Your Product'});
        }else {
            console.log(saveRFP);
            rfpId = saveRFP._id;

            console.log(rfpId);
            upload(reqFile, res, (err) => {

                if(err){
                    console.log(err);
                }else {
                    if(reqFile.file == undefined){
                        console.log("No File Selected");
                    }else{
                        filename = reqFile.file.filename;
                        filePath = 'uploads/' + filename;
                        RFP.findById(rfpId, (err, creatRFP) => {
                            if(err){
                                return res.json({success: false, message: 'Failed to Upload Product Image'});
                            } else {
                                createRFP = filePath;
                                createRFP.save(function(err) {
                                    if (err) {
                                        return res.json({success: false, message: 'Failed to Save RFP'});
                                    } else {
                                        return res.json({ success: true, msg: "Image Path Updated!", proImage: filePath });
                                    }
                                });
                            }
                        });
                    }
                }
            });

            return res.json({success: true, message: 'RFP Submitted Successfully !'});
        }

    });
});

module.exports = router;

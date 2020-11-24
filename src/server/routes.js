let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    router = express.Router();
var DIR = './uploads/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// User model
let Dicom = require('./models/Dicom');

router.post('/post-dicom', upload.single('dicomImg'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const dicom = new Dicom({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        isLabeled: req.body.isLabeled,
        label: req.body.label,
        dicomImg: req.body.dicomImg
    });
    dicom.save().then(result => {
        res.status(201).json({
            message: "Dicom saved correctly!",
            dicomCreated: {
                _id: result._id,
                isLabeled: result.isLabeled,
                label: result.label,
                dicomImg: result.dicomImg
            }
        })
    }).catch(err => {
        // eslint-disable-next-line no-unused-expressions
        console.log(err)
            res.status(500).json({
                error: err
            });
    })
})

router.get("/", (req, res, next) => {
    Dicom.find().then(data => {
        res.status(200).json({
            message: "Dicom retrived succesfully",
            dicoms: data
        });
    });
});

module.exports = router;
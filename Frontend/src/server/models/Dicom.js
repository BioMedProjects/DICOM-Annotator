const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dicomSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    isLabeled: Boolean,
    label: String,
    dicomImg: {
        type: String
    }
}, {
    collection: 'dicoms'
})

module.exports = mongoose.model('Dicom', dicomSchema)
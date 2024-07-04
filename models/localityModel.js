const mongoose = require('mongoose');

const LocalitySchema = new mongoose.Schema({
    localityName: {
        type: String,
        required: true,
    },
});

const Locality = mongoose.model('Locality', LocalitySchema);
module.exports = Locality;

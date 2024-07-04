const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    propertyName: {
        type: String,
        required: true,
    },
    localityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Locality',
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
});

const Property = mongoose.model('Property', PropertySchema);
module.exports = Property;

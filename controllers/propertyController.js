const Property = require('../models/propertyModel');
const Locality = require('../models/localityModel');

const addNewProperty = async (req, res) => {
    const { propertyName, localityName, ownerName } = req.body;

    try {
        let locality = await Locality.findOne({ localityName });
        if (!locality) {
            locality = new Locality({ localityName });
            await locality.save();
        }

        const property = new Property({
            propertyName,
            localityId: locality._id,
            ownerName,
        });

        await property.save();
        res.json({ message: 'Property added', propertyId: property._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const fetchAllProperties = async (req, res) => {
    const { localityName, localityId } = req.query;

    try {
        let locality;
        if (localityName) {
            locality = await Locality.findOne({ localityName });
        } else if (localityId) {
            locality = await Locality.findById(localityId);
        }

        if (!locality) {
            return res.status(404).json({ error: 'Locality not found' });
        }

        const properties = await Property.find({ localityId: locality._id });
        res.json(properties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updatePropertyDetails = async (req, res) => {
    const { propertyId, localityId, ownerName } = req.body;

    try {
        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        if (localityId) {
            property.localityId = localityId;
        }

        if (ownerName) {
            property.ownerName = ownerName;
        }

        await property.save();
        res.json({ message: 'Property updated', property });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deletePropertyRecord = async (req, res) => {
    const { propertyId } = req.body;

    try {
        const property = await Property.findByIdAndDelete(propertyId);

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        res.json({ message: 'Property deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const fetchPropertyById = async (req, res) => {
    const { propertyId } = req.params;

    try {
        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        res.json(property);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addNewProperty,
    fetchAllProperties,
    updatePropertyDetails,
    deletePropertyRecord,
    fetchPropertyById,
};

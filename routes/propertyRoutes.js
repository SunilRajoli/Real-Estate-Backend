const express = require('express');
const {
    addNewProperty,
    fetchAllProperties,
    updatePropertyDetails,
    deletePropertyRecord,
    fetchPropertyById,
} = require('../controllers/propertyController');

const router = express.Router();

router.post('/add', addNewProperty);
router.get('/fetch', fetchAllProperties);
router.put('/update', updatePropertyDetails);
router.delete('/delete', deletePropertyRecord);
router.get('/:propertyId', fetchPropertyById);

module.exports = router;

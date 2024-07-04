const express = require('express');
const bodyParser = require('body-parser');
const propertyRoutes = require('./routes/propertyRoutes');
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());
app.use('/api/properties', propertyRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

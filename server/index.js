// Import express
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { application } = require('express');

// Initializing our express app
const app = express();


var corsOptions = {
    origin: "http://localhost:4000"
};

// Parse requests of content-type "application/json"
app.use(cors(corsOptions));

app.use(bodyParser.json());

const db = require('./Model/Model')
db.sequelize.sync();

application.use(bodyParser.urlencoded({ extended: true }))

// Route
app.get('/', (req, res) => {
    res.json({ message: 'we are up!' })
})


// Assign a port number, where it would run
const PORT = process.env.PORT || 5000;

// Listen on the port
app.listen(PORT, () => console.log(`Our Server is running on port ${PORT}`));




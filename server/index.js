// Import express
const express = require('express');
/*
If this were react, it would have been:
import express from 'express';
because the export export syntax, works this way:

const app = () => {
    return (
    <div></div>
    )
}

export default App;


But for the case in express:

const express = require('express');
because the method of export is


modules.exports = express();
*/

// Initializing our express app
const app = express();

// Assign a port number, where it would run
const PORT = process.env.PORT || 5000;

// Listen on the port
app.listen(PORT, () => console.log(`Our Server is running on port ${PORT}`));
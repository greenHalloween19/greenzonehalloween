const express = require('express');
const connectToDB = require('./config/db');

const app = express();

// Call the connect to DB function.
connectToDB();

app.get('/', (req, res) => res.send('API WILL BE HERE SOON!'));

// Looks for env variable (need for Heroku), if it doesnt exist we will just use port 5000.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

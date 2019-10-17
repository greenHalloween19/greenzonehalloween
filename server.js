const express = require('express');
const connectToDB = require('./config/db');

const app = express();

// Call the connect to DB function.
connectToDB();

// Middleware initialization
app.use(express.json({ extended: false }));

// API Routes
app.get('/', (req, res) => res.send('Green Zone Halloween API.'));
app.use('/scores', require('./routes/api/scores'));

// Looks for env variable (need for Heroku), if it doesnt exist we will just use port 5000.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

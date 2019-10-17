const express = require('express');
const router = express.Router();

// @route GET api/scores
// @desc Get List of User Scores in Descending Order.
// @access Public
router.get('/', (req, res) => res.send('Scores Route'));

module.exports = router;

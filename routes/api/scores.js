const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Score = require('../../models/Score');

// @route POST api/scores
// @desc Add a Score to the list.
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required.').isLength({ max: 15 }),
    check(
      'score',
      'Score is required and needs to be a valid number.'
    ).isNumeric()
  ],
  async (req, res) => {
    // Can view this logic and the logic above in the express-validator documentation.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const score = new Score({
        name: req.body.name,
        score: req.body.score
      });

      const postedScore = await score.save();

      res.json(postedScore);
    } catch (e) {
      console.error(e);
      res.status(500).send('Failed to post score.');
    }
  }
);

// @route GET api/scores
// @desc Get the List of Scores.
// @access Public
router.get('/', async (req, res) => {
  try {
    let scoresList = await Score.find({}).sort({score: -1});
    res.json(scoresList);
  } catch (e) {
    console.error(e);
    res.status(500).send('Failed to get user list');
  }
});


// @route DELETE api/scores
// @desc Delete the Current list of Scores.
// @access Public
router.delete('/', async (req, res) => {
  try {
    let scoresList = await Score.find({});
    
    if (!scoresList || scoresList.length < 1) {
      res.status(404).send('No scores were found.');
    }

    await Score.find({}).remove().exec();
    res.send('The current scores list was deleted.');

    res.json(scoresList);
  } catch (e) {
    console.error(e);
    res.status(500).send('Failed to remove the list of scores.');
  }
});

// @route DELETE api/scores/:id
// @desc Delete the score with given id.
// @access Public
router.delete('/:id', async (req, res) => {
  try {
    let score = await Score.findById(req.params.id);
    
    if (!score) {
      res.status(404).send('No scores were found.');
    }
    await score.remove();
    res.send('The score was successfully deleted.');
  } catch (e) {
    console.error(e);
    res.status(500).send('Failed to remove the score.');
  }
});

module.exports = router;

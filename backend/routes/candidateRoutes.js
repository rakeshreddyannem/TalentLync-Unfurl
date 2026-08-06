const express = require('express');
const router = express.Router();
const {
  getCandidates,
  createCandidate,
  toggleShortlist,
  deleteCandidate,
  unfurlUrl,
} = require('../controllers/candidateController');

// Route for proxy unfurl
router.get('/unfurl', unfurlUrl);

// CRUD Candidate Routes
router.route('/')
  .get(getCandidates)
  .post(createCandidate);

router.route('/:id/shortlist')
  .patch(toggleShortlist);

router.route('/:id')
  .delete(deleteCandidate);

module.exports = router;

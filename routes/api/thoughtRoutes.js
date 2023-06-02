const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  postReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
.get(getThoughts)
.post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
.get(getSingleThought);

router.route('/:id')
.put(updateThought)
.delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:id/reactions')
.post(postReaction);

// /api/thoughts/:thoughtId/reactions/:id
router.route('/:thoughtId/reactions/:id')
.delete(deleteReaction);

module.exports = router;

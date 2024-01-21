const router = require('express').Router()

const { 
    allThoughts,
    singleThought,
    newThought,
    updateThought,
    deleteThought,
    updateReaction,
    deleteReaction
} = require('../../controllers');

router.route('/')
    .get(allThoughts)
    .post(newThought);

router.route('/:thoughtId')
    .get(singleThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions')
    .put(updateReaction)
    .delete(deleteReaction);


module.exports = router

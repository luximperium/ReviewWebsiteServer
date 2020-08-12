const express = require('express');
const router = express.Router();
let validateSession = require('../middleware/validate-session');

const Review = require('../db').import('../models/review');

//Practice route for testing
// router.get('/practice', function(req, res){
//     res.send('Hey!! This is a review practice route!')
// })

//Creating a new review - works
router.post('/create', validateSession, (req, res) => {
    const reviewEntry = {
        title: req.body.review.title,
        artistName: req.body.review.artistName,
        projectName: req.body.review.projectName,
        rating: req.body.review.rating,
        description: req.body.review.description,
        author: req.user.username,
        owner: req.user.id
    }
    Review.create(reviewEntry)
    .then(review => res.status(200).json(review))
    .catch(err => res.status(500).json({ error: err }))
});

//Getting a review by title - works
router.get('/:title', function (req, res) {
    let title = req.params.title;

    Review.findAll({
        where: {title: title}
    })
    .then(review => res.status(200).json(review))
    .catch(err => res.status(500).json({ error: err }))
});

router.get('/:projectName', function (req, res) {
    let projectName = req.params.projectName;

    Review.findAll({
        where: {projectName: projectName}
    })
    .then(review => res.status(200).json(review))
    .catch(err => res.status(500).json({ error: err }))
});

//GET all user's reviews - works
router.get('/user/mine', validateSession, function (req, res) {
    
    Review.findAll({
        where: { owner: req.user.id }
    })
    .then(reviews => res.status(200).json(reviews))
    .catch(err => res.status(500).json({ error: err }))
});

//Get all reviews
router.get('/', function (req, res) {

    Review.findAll()
    .then(reviews => res.status(200).json(reviews))
    .catch(err => res.status(500).json({ error: err }))
})

//Updating a review - works
router.put('/:id', validateSession, function (req, res) {
    const updateReviewEntry = {
        title: req.body.review.title,
        rating: req.body.review.rating,
        description: req.body.review.description,
    };

    const query = { where : { id: req.params.id, owner: req.user.id }};

    Review.update(updateReviewEntry, query)
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(500).json({ error: err }));
})

//Deleting a review - works
router.delete('/delete/:id', validateSession, function (req,res) {
    const query = {where: { id: req.params.id, owner: req.user.id }};

    Review.destroy(query)
    .then(() => res.status(200).json({ message: 'Review Removed' }))
    .catch((err) => res.status(500).json({ error: err }));
})


module.exports = router;
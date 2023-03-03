const express = require('express');
const router = express.Router();

// return an array of all sauces
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /sauces'
    });
});

// return a single sauce with the given id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
}
);

// create a new sauce
router.post('/', (req, res, next) => {
    // save image to server and get path to image using multer

    // save sauce to database
    // set likes and dislikes to 0 and usersLiked and usersDisliked to empty arrays
    res.status(201).json({
        message: 'Handling POST requests to /sauces'
    });
});

// update a sauce with the given id
router.patch('/:id', (req, res, next) => {

    // update sauce in database
    // update image if necessary
    res.status(200).json({
        message: 'Updated sauce!'
    });
}
);

// delete a sauce with the given id
router.delete('/:id', (req, res, next) => {
    // delete sauce from database
    res.status(200).json({
        message: 'Deleted sauce!'
    });
}
);

// like or dislike a sauce with the given id
router.post('/:id/like', (req, res, next) => {
    // get user id from request
    // get like value from request
    // get sauce from database
    // if like value is 1, add user id to usersLiked array and increment likes
    // if like value is -1, add user id to usersDisliked array and increment dislikes
    // if like value is 0, remove user id from usersLiked array and decrement likes
    // if like value is 0, remove user id from usersDisliked array and decrement dislikes
    res.status(200).json({
        message: 'Liked or disliked sauce!'
    });
}
);

module.exports = router;
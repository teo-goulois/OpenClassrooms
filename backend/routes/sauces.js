const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const saucesCtrl = require('../controllers/sauces');

// return an array of all sauces
router.get('/', auth, saucesCtrl.getAll);

// return a single sauce with the given id
router.get('/:id', auth, saucesCtrl.getById);

// create a new sauce
router.post('/', auth, multer, saucesCtrl.postOne);

// update a sauce with the given id
router.patch('/:id', auth, multer, saucesCtrl.updateOne);

// delete a sauce with the given id
router.delete('/:id', auth, saucesCtrl.deleteOne);

// like or dislike a sauce with the given id
router.post('/:id/like', auth, saucesCtrl.handleLike);

module.exports = router;
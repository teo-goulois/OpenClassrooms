const Sauce = require('../models/sauce');
const fs = require('fs');

exports.getAll = async (req, res, next) => {
    try {
        const sauces = await Sauce.find();
        res.status(200).send(sauces);
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
}

exports.getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const sauce = await Sauce.findById({ _id: id });
        res.status(200).send(sauce);
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

exports.postOne = async (req, res, next) => {
    try {
        const sauce = JSON.parse(req.body.sauce)
        delete sauce.userId;
        // save sauce to database
        const newSauce = new Sauce({
            ...sauce,
            userId: req.auth.userId,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: []
        });
        await newSauce.save();
        res.status(201).json({
            message: 'Objet enregistré !'
        });
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

exports.updateOne = async (req, res, next) => {
    const sauce = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }
    
    console.log("🚀 ~ file: sauces.js:51 ~ exports.updateOne= ~ sauce:", sauce)
    delete sauce.userId;
    try {
        const currentSauce = await Sauce.findOne({ _id: req.params.id });

        if (currentSauce.userId !== req.auth.userId) {
            res.status(403).json({ message: 'Not authorized' });
        } else {
            await Sauce.updateOne({ _id: req.params.id }, { ...sauce, _id: req.params.id });
        }
        res.status(200).json({
            message: 'Sauce modifié!'
        });
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

exports.deleteOne = async (req, res, next) => {
    try {
        const sauce = await Sauce.findOne({ _id: req.params.id });

        if (sauce.userId !== req.auth.userId) {
            res.status(403).json({ message: 'Not authorized' });
        } else {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ message: error }));
            });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.handleLike = async (req, res, next) => {
    try {
        const sauce = await Sauce.findOne({ _id: req.params.id });

        switch (req.body.like) {
            case 1:
                sauce.usersLiked.push(req.auth.userId);
                sauce.likes++;
                break;
            case -1:
                sauce.usersDisliked.push(req.auth.userId);
                sauce.dislikes++;
                break;
            case 0:
                if (sauce.usersLiked.includes(req.auth.userId)) {
                    sauce.usersLiked.splice(sauce.usersLiked.indexOf(req.auth.userId), 1);
                    sauce.likes--;
                } else if (sauce.usersDisliked.includes(req.auth.userId)) {
                    sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(req.auth.userId), 1);
                    sauce.dislikes--;
                }
                break;
            default:
                break;
        }
        await Sauce.updateOne({ _id: req.params.id }, sauce);
        res.status(200).json({
            message: 'Sauce modifié!'
        });


    } catch (error) {
        res.status(500).json({ message: error });
    }

}
const Wall = require('../models/wall');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.wallById = (req, res, next, id) => {
    Wall.findById(id)
        .populate("postedBy", "_id name")
        .exec((err, wall) => {
            if(err || !wall) {
                return res.status(400).json({
                    error: err
                });
            }
            req.wall = wall;
            next();
        });
};

exports.getWalls = (req, res) => {
    const walls = Wall.find()
    .populate("postedBy", "_id name")
    .select("_id title body")
    .then((walls) => {
        res.json({
            walls
        });
    })
    .catch(err => console.log(err));
};

exports.createWall = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: "Resim yüklenemedi"
            });
        }
        let wall = new Wall(fields);
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        wall.postedBy = req.profile;
        if(files.photo) {
            wall.photo.data = fs.readFileSync(files.photo.path);
            wall.photo.contenType = files.photo.type;
        };
        wall.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.wallsByUser = (req, res) => {
    Wall.find({postedBy: req.profile._id})
        .populate("postedBy", "_id name")
        .sort("_created")
        .exec((err, walls) => {
            if(err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(walls);
        });
};

exports.isPosters = (req, res, next) => {
    let isPosters = req.wall && req.auth && req.wall.postedBy._id == req.auth._id;
    if(!isPosters) {
        return res.status(400).json({
            error: "Yetkiniz bulunmuyor"
        });
    }
    next();
};

exports.updateWall = (req, res, next) => {
    let wall = req.wall;
    wall = _.extend(wall, req.body);
    wall.updated = Date.now();
    wall.save(err => {
        if(err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(wall);
    });
};

exports.deleteWall = (req, res) => {
    let wall = req.wall;
    wall.remove((err, wall) => {
        if(err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: "Durum başarıyla silindi"
        });
    });
};
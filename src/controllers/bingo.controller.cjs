const db  = require('../models/index.cjs');
const Player = db.players;
const categories = require('../data/bookCategories.cjs');

    exports.create = (req, res) => {
        if (!req.body.name) {
            res.status(400).send(
                {message: "Please enter a name." }
            );
            return;
        }

        const player = new Player({
            name: req.body.name,
            categories: ["eanie","meanie","minie","moe"]
        });

        player.save(player)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    "message":
                        err.message || "An error occurred creating your account. Please try again."
                })
            })
    };

    // retrieve all players
    exports.findAll = (req, res) => {
        const name = req.query.name;
        let condition = name ? { name: {$regex: new RegExp(name), $options: "i"}} : {};

        Player.find(condition)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    "message":
                    err.message || "Some error occurred while retrieving your Reading Bingo sheet. Please try again."
                });
            });
        };


    // retrieve player by name
    exports.findOne = (req, res) => {
        const name = req.body.name;
        let condition = name ? { name: {$regex: new RegExp(name), $options: "i"}} : {};

        Player.find(condition)
            .then(data => {
                if (!data) { 
                    res.status(404).send( {"message": name + " not found. Please try again."});
                }
                else res.send(data);
            })
            .catch(err => {
                res.status(500)
                .send(
                    {"message": "Error finding " + name + ". Please try again."});
            });
    };
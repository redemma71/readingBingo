const db = require('../models/index.cjs');
const Player = require('../models/player.model.cjs');
const categories2022 = require('../data/bookCategories.json');
const { chooseCategories } = require('../utils/categoryUtils.cjs');

let debug = true; // for development

    // create a player
    module.exports.create = (req, res) => {
        let userName = req.body.name;
        let userAccountType = req.body.accountType;
        if (!userName) {
            res.status(400).send(
                {message: "Please enter a name." }
            );
            return;
        }

        let condition = req.body.name ? { name: {$regex: new RegExp(req.body.name), $options: "i"}} : {};
        Player.findOne(condition)
        .then((data) => {
            console.log('wassup?');
            console.log(data === null);
            console.log(userName);
            if (data === null) {
                const player = new Player({
                    name: req.body.name,
                    accountType: req.body.accountType,
                    categories: chooseCategories(categories2022.categories2022)
                });
        
                player.save(player)
                    .then(data => {
                        console.log(data);
                        return res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            "message":
                                err.message || "An error occurred creating your account. Please try again."
                        })
                    });
                    console.log('huh?');
            } else {
                if (debug) console.log(`${req.body.name} already exists. Please choose another name.`);
                res.status(400).send(
                   { "message": `${req.body.name} already exists. Please choose another name.` }
                );
            }
        })
        .catch((err) => {
            res.status(500).send({
                "message": err.message || "An error occurred creating your account. Please try again."
            })
        });


    };

    // retrieve all players
    module.exports.findAll = (req, res) => {
        const name = req.query.name;
        console.log(req.query.name);
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
    module.exports.findOne = (req, res) => {
        const name = req.params.name;
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

module.exports.update = (req, res) => {
    const name = req.params.name;
    let condition = name ? { name: {$regex: new RegExp(name), $options: "i"}} : {};

    Player.update(condition)
        .then(data => {
            if (!data) {
                res.status(404).send( {"message": `Error finding ${name}. Please try again.`});
            }
        })
        .catch(err => {
            res.status(500)
            .send(
                {"message": `Error finding ${name}. Please try again.`});
        });
    };
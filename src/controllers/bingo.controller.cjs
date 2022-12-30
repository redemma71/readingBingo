const db = require('../models/index.cjs');
const Player = require('../models/player.model.cjs');
const categories2022 = require('../data/bookCategories.json');
const { chooseCategories } = require('../utils/categoryUtils.cjs');
const { Alert } = require('react-bootstrap');

let debug = true; // for development

// create a player
module.exports.create = (req, res) => {
    let userName = req.body.name.toLowerCase();
    let email = req.body.email.toLowerCase();
    let accountType = req.body.accountType.toLowerCase();
    let password = req.body.password;
    
    if (!userName) {
        res.status(400).send(
            {message: "Please enter a name." }
        );
        return;
    }
    
    if (!email) {
        res.status(400).send(
            { message: "Please enter an email address." }
        );
        return;
    }

    Player.findOne({
        $and: [{
            email: req.body.email.toLowerCase()
        }, {
            userName: req.body.name.toLowerCase()
        }]
    }).then((data) => {
        if (data === null) {
            const player = new Player({
                name: userName,
                email: email,
                accountType: accountType,
                password: password,
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
        } else {
            let message = `${req.body.name} already exists. Please choose another name.`;
            if (debug) console.log(message);
            res.status(400).send(
                { "message": message }
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
    Player.find()
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
    const name = req.body.name;
    const password = req.body.password;
    let condition = name ? { name: {$regex: new RegExp(name), $options: "i"}} : {};

    Player.find(condition)
        .then(data => {
            console.log(data);
            if (!data[0].name) { 
                res.status(404).send( {"message": name + " not found. Please try again."});
            } else {
                data[0].verifyPassword(password, function(err, valid) {
                    if (err) {
                      console.log(err)
                      res.status(404).send({"message": err});
                    } else if (valid) {
                      console.log('Valid (callback)');
                      res.send(data); 
                    } else {
                      console.log('Invalid (callback)');
                      res.status(404).send({"message": "username/password error"});
                    }
                  });
                  
        }})
        .catch(err => {
            res.status(500)
            .send(
                {"message": "Error finding " + name + ". Please try again."});
        });
};

    module.exports.update = (req, res) => {
        const name = req.body.name;
        console.log(`updating ${name}'s record`);
        const picks = req.body.picks;
        let condition = name ? { name: {$regex: new RegExp(name), $options: "i"}} : {};

        Player.updateOne(condition,{$set: {picks: picks}})
            .then(data => {
                if (!data) {
                    res.status(404).send( {"message": `Error finding ${name}. Please try again.`});
                }
                res.send(data);
            })
            .catch(err => {
                res.status(500)
                .send(
                    {"message": `Error updating ${name}. Please try again.`});
            });
    };
    




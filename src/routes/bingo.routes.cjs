module.exports = app => {
    const players = require('../controllers/bingo.controller.cjs');
    let router = require("express").Router();

    // create a new player
    router.post("/player", players.create);

    // retrieve all players
    router.get("/players", players.findAll);

    // retrieve player by name
    router.get("/player", players.findOne);

    // path
    // app.use('/api/bingo', router);
};
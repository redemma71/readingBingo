const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema(
    { 
        name: String,
        email: String,
        categories: Object,
        picks: Object,
        accountType: String
    },
    { 
        timestamps: true 
    }
);

playerSchema.plugin(require('mongoose-bcrypt'));

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;
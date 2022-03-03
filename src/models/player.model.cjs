module.exports = mongoose => {
    const Player = mongoose.model(
        "player",
        mongoose.Schema(
            {
                name: String,
                categories: Object,
            },
            { timestamps: true }
        )
    );
    return Player;
};
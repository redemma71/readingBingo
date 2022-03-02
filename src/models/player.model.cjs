module.exports = mongoose => {
    const Player = mongoose.model(
        "player",
        mongoose.Schema(
            {
                name: String,
                categories: [String],
            },
            { timestamps: true }
        )
    );
    return Player;
};
module.exports.chooseCategories = (categories) => {
    let chosenCategories = [];
    for (let i = 0; i < 25; i++) {
        let choice = categories[Math.floor(Math.random() * categories.length)]
        if (! chosenCategories.includes(choice) ) {
            chosenCategories.push(choice);
        } else {
            --i; // decrement counter because of duplicate random choice
        }
    }
    return chosenCategories;
}
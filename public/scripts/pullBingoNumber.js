let balls = [
    "B1", "B2", "B3", "B4", "B5",
    "I1", "I2", "I3", "I4", "I5",
    "N1", "N2", "N3", "N4", "N5",
    "G1", "G2", "G3", "G4", "G5",
    "O1", "O2", "O3", "O4", "O5"
]

// january selection: B1; february: I2
let chosenBalls = [];

for (let i = 0; i < chosenBalls.length; i++) {
    let index = balls.indexOf(chosenBalls[i]);
    if (index !== -1) {
      balls.splice(index, 1);
    }
}

function drawABall() {
    return `The ball is ${balls[Math.floor(Math.random() * balls.length)]}.`;
}

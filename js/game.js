function setPositions() {
    const positions = [];
    const snakePositions = [13, 20, 28, 44, 58, 59, 65, 72, 78];
    const snakeNewPositions = [11, 10, 7, 34, 48, 39, 25, 52, 69];

    const ladderPositions = [5, 16, 21, 37, 42, 54, 60, 67, 73];
    const ladderNewPositions = [33, 36, 61, 56, 53, 64, 80, 77, 76];


    for (let i = 1; i <= 80; i++) {
        positions[i] = {};
        positions[i].from = i;


        if (snakePositions.indexOf(i) !== -1) {
            positions[i].to = snakeNewPositions[snakePositions.indexOf(i)];
            positions[i].type = "Snake";
        } else if (ladderPositions.indexOf(i) !== -1) {
            positions[i].to = ladderNewPositions[ladderPositions.indexOf(i)];
            positions[i].type = "Ladders";
        } else if (i === 29 || i === 46) {
            positions[i].to = i;
            positions[i].type = "pythonEffect";
        } else {
            positions[i].to = i;
            positions[i].type = "Normal";

        }
    }
    return positions;
}

const cells = setPositions();
for (let i = 1; i <= 80; i++) {
    console.log("Cell: " + i + " type: " + cells[i].type + " From: " + cells[i].from + " To: " + cells[i].to)
}
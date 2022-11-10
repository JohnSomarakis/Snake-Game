class Player {
    constructor(name, position, turn, dice, effect) {
        this.name = name;
        this.position = position;
        this.turn = turn;
        this.dice = dice;
        this.effect = effect;
    }

    getName = function () {
        return this.name;
    };

    getPosition = function () {
        return this.position;
    };

    getTurn = function () {
        return this.turn;
    };

    getDice = function () {
        return this.dice;
    };

    getEffect = function () {
        return this.effect;
    };


}

let PlayerRed;
let PlayerWhite;

function throwADice() {
    let dice = 1 + Math.floor(Math.random() * 6);
    console.log("Dice = " + dice);
    return dice;
}

function changePlayerTurn(PlayerWhite, PlayerRed) {
    if (PlayerWhite.getTurn() === true) {
        if (PlayerWhite.getDice() !== 6) {
            PlayerWhite.turn = false;
            PlayerRed.turn = true;
            console.log("PlayerWhite turn changed to PlayerRed");
        } else
            console.log("PlayerWhite Plays Again");
    } else {
        if (PlayerRed.getDice() !== 6) {
            PlayerRed.turn = false;
            PlayerWhite.turn = true;
            console.log("PlayerRed turn changed to PlayerWhite");
        } else
            console.log("PlayerRed Plays Again");
    }
}

function findNextPosition(dice, position, effect) {
    let newPosition = dice + position;
    if (newPosition <= 80) {
        //Stairs
        if (newPosition === 5)
            return 33;
        else if (newPosition === 16)
            return 36;
        else if (newPosition === 21)
            return 61;
        else if (newPosition === 37)
            return 56;
        else if (newPosition === 42)
            return 53;
        else if (newPosition === 54)
            return 64;
        else if (newPosition === 60)
            return 80;
        else if (newPosition === 67)
            return 77;
        else if (newPosition === 73)
            return 76;
        //Snakes
        if (!effect) {
            if (newPosition === 13)
                return 11;
            else if (newPosition === 20)
                return 10;
            else if (newPosition === 28)
                return 7;
            else if (newPosition === 44)
                return 34;
            else if (newPosition === 58)
                return 48;
            else if (newPosition === 59)
                return 36;
            else if (newPosition === 65)
                return 25;
            else if (newPosition === 72)
                return 52;
            else if (newPosition === 78)
                return 69;
        }
        //Python
        if (newPosition === 29 || newPosition === 46)
            if (PlayerWhite.getTurn() === true) {
                PlayerWhite.effect = true;
            } else
                PlayerRed.effect = true;
    } else {
        return 80 - newPosition % 10;
    }

    return newPosition;
}

function dicePressed() {
    let newPos;
    if (PlayerWhite.getTurn() === true) {
        PlayerWhite.dice = throwADice();
        newPos = findNextPosition(PlayerWhite.getDice(), PlayerWhite.getPosition(), PlayerWhite.getEffect());
        console.log("\nPlayerWhite moved from " + PlayerWhite.position + " to " + newPos);
        setPawnOnTable(PlayerWhite, PlayerRed, newPos);
        if (newPos === 80) {
            console.log("PlayerWhite is the Winner");
            alert("PlayerWhite is the Winner\nThe game will start again automatically");
            initGame();
        }
    } else {
        PlayerRed.dice = throwADice();
        newPos = findNextPosition(PlayerRed.getDice(), PlayerRed.getPosition(), PlayerRed.getEffect());
        console.log("\nPlayerRed moved from " + PlayerRed.position + " to " + newPos);
        setPawnOnTable(PlayerWhite, PlayerRed, newPos);
        if (newPos === 80) {
            console.log("PlayerRed is the Winner");
            alert("PlayerRed is the Winner\nThe game will start again automatically");
            initGame();
        }
    }


    changePlayerTurn(PlayerWhite, PlayerRed);
    setInfoBox();
}

function resetTableBoard() {
    for (let i = 1; i <= 80; i++)
        document.getElementById("position" + i).innerHTML = "<img  src='images/" + i + ".png'  height=70 width=70 alt='images/" + i + "'>";
    console.log("Table Board Reset Successfully");
}

function initGame() {

    PlayerWhite = new Player("White", 0, false, 0, false);
    PlayerRed = new Player("Red", 0, false, 0, false);

    //random Player Starts
    do {
        PlayerRed.dice = throwADice();
        PlayerWhite.dice = throwADice();
    } while (PlayerWhite.getDice() === PlayerRed.getDice());
    if (PlayerWhite.getDice() > PlayerRed.getDice()) {
        PlayerWhite.turn = true;
    } else
        PlayerRed.turn = true;
    setInfoBox();


    console.info("Game Initialized");

    console.log("Name:       " + PlayerWhite.getName());
    console.log("Position:   " + PlayerWhite.getPosition());
    console.log("Dice:       " + PlayerWhite.getDice());
    console.log("Turn:       " + PlayerWhite.getTurn());
    console.log("Effect:     " + PlayerWhite.getEffect())
    console.log("Name:       " + PlayerRed.getName());
    console.log("Position:   " + PlayerRed.getPosition());
    console.log("Dice:       " + PlayerRed.getDice());
    console.log("Turn:       " + PlayerRed.getTurn());
    console.log("Effect:     " + PlayerRed.getEffect())

    resetTableBoard();

}

//Graphical Methods

function setPawnOnTable(playerWhite, playerRed, newPosition) {
    if (PlayerWhite.getTurn() === true) {
        //remove the old Pawn
        if (playerWhite.getPosition() === playerRed.getPosition() && playerWhite.getPosition() !== 0) {
            document.getElementById("position" + playerWhite.getPosition()).innerHTML = "<img  src='imagesRed/" + playerRed.getPosition() + ".png'  height=70 width=70 alt='imagesRed/" + playerRed.getPosition() + "'>";
        } else if (playerWhite.getPosition() !== playerRed.getPosition() && PlayerWhite.getPosition() !== 0) {
            document.getElementById("position" + playerWhite.getPosition()).innerHTML = "<img  src='images/" + playerWhite.getPosition() + ".png'  height=70 width=70 alt='images/" + playerWhite.getPosition() + "'>";
        }
        //set the new Pawn
        if (newPosition === playerRed.getPosition())
            document.getElementById("position" + newPosition).innerHTML = "<img  src='imagesBoth/" + newPosition + ".png'  height=70 width=70 alt='imagesBoth/" + newPosition + "'>";
        else
            document.getElementById("position" + newPosition).innerHTML = "<img  src='imagesWhite/" + newPosition + ".png'  height=70 width=70 alt='imagesWhite/" + newPosition + "'>";
        playerWhite.position = newPosition;

    } else if (PlayerRed.getTurn() === true) {
        //remove the old Pawn
        if (playerWhite.getPosition() === playerRed.getPosition() && playerWhite.getPosition() !== 0) {
            document.getElementById("position" + playerRed.getPosition()).innerHTML = "<img  src='imagesWhite/" + playerWhite.getPosition() + ".png'  height=70 width=70 alt='imagesWhite/" + playerRed.getPosition() + "'>";
        } else if (playerWhite.getPosition() !== playerRed.getPosition() && playerRed.getPosition() !== 0) {
            document.getElementById("position" + playerRed.getPosition()).innerHTML = "<img  src='images/" + playerRed.getPosition() + ".png'  height=70 width=70 alt='images/" + playerRed.getPosition() + "'>";
        }
        //set the new Pawn
        if (newPosition === playerWhite.getPosition())
            document.getElementById("position" + newPosition).innerHTML = "<img  src='imagesBoth/" + newPosition + ".png'  height=70 width=70 alt='imagesBoth/" + newPosition + "'>";
        else
            document.getElementById("position" + newPosition).innerHTML = "<img  src='imagesRed/" + newPosition + ".png'  height=70 width=70 alt='imagesRed/" + newPosition + "'>";
        playerRed.position = newPosition;
    }
}

function setInfoBox() {
    document.getElementById("PlayerWhite_dice_img").innerHTML = "<img  src='ImagesDice/" + PlayerWhite.getDice() + ".png'  height=70 width=70 alt='ImagesDice/" + PlayerWhite.getDice() + "'>";
    document.getElementById("PlayerWhite_turn").innerHTML = PlayerWhite.getTurn();
    document.getElementById("PlayerWhite_Dice").innerHTML = PlayerWhite.getDice();
    document.getElementById("PlayerWhite_position").innerHTML = PlayerWhite.getPosition();
    document.getElementById("PlayerWhite_Effect").innerHTML = PlayerWhite.getEffect();
    document.getElementById("PlayerRed_dice_img").innerHTML = "<img  src='ImagesDice/" + PlayerRed.getDice() + ".png'  height=70 width=70 alt='ImagesDice/" + PlayerRed.getDice() + "'>";
    document.getElementById("PlayerRed_Turn").innerHTML = PlayerRed.getTurn();
    document.getElementById("PlayerRed_dice").innerHTML = PlayerRed.getDice();
    document.getElementById("PlayerRed_position").innerHTML = PlayerRed.getPosition();
    document.getElementById("PlayerRed_effect").innerHTML = PlayerRed.getEffect();


}
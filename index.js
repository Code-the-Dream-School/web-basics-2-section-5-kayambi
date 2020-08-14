
//------------------------ Game Project---------------------------
//Do you remember the game Battleship we created before? well .... it is time to make it with the DOM!!
//We are providing you with the design of a board (in the DOM) for a player1, 
// you have to create the board for the player2 using the id property 'board_player2' -> it is the second list (ul) in your index.html file
//First ask the players for their names (use propmt) 
//Now each time the turn player clicks on any cell of the opponent's board (is this the player1  or player2)
// (you have to verify if the player is clicking the right board) the program needs to verify if 
// there is an opponent's ship in that cell.
//  If it is then the opponent has one less ship
//We want you to store the data of each player in two Player objects.
//  Each object has to store: name, remaining boats, and their respective board.
//Each board needs to be initialized randomly with '0' and four '1' wich means the state of the cell. 
// Numbers 1 are representing the 4 positions of the player's ships
//Also we want you to display the name of the turn player in the tag that has the id 'turn_player'. 
// And if there is a winner  a text with: 'Congratulationes {name_player}!! you win'
//in the index.html file you are going to find 4 more ids: 'name_player1' , 'name_player2' , 'ships_player1' , 'ships_player2'. 
// We want to see the information of each player in the respective elements
//As our previous Battleship, the winner is the player that hits the 4 opponent's ships first
//one more Thing create a 'reset' and a 'new game' buttons as childs of the element with the id 'buttons'. 
// the reset button has to start the game again and the new game create a new game with new players and a new random board.


const board_Player1 = document.getElementById('board_player1'); // board player1ID
const board_player2 = document.getElementById('board_player2'); // board player2ID

let turn_player = document.getElementById('turn_player');    // this could be player1 or player two 
let name_player1 = document.getElementById('name_player1');  // name  of the player1
let name_player2 = document.getElementById('name_player2');   // name of the player2
let ships_player1 = document.getElementById('ships_player1');  // ships_player1
let ships_player2 = document.getElementById('ships_player2');   // ship_player2

for (var x = 0; x < 4; x++) {
    const li = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board
    for (var y = 0; y < 4; y++) {
      const cell = document.createElement('div');
      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
      cell.value = 0;//state of the cell

      //this function adds the click event to each cell
      cell.addEventListener( 'click', (e) => {
          let cell = e.target; // get the element clicked
          console.log( cell.innerHTML) 
          //display the coordinates in the console
        // this  means that the contents of the element will be invisible, 
          cell.style.visibility = 'hidden';
        //   but the element stays in its original position and size / 
        // try it clicking on any of the black cells (in your browser) and see whats happens
          cell.style.background ="purple"; 
          //with this propertie you can change the background color of the clicked cell. 
        //   try comment the line bellow and uncomment this line. Do not forget to save this file and refresh the borwser to see the changes

      });

      li.appendChild(cell); //adding each cell into the row number x
    }

     board_Player1.appendChild(li); //adding each row into the board
}


// you have to create the board for the player2 
// using the id property 'board_player2' -> it is the second list (ul) in your index.html file
//First ask the players for their names (use propmt)
let  givenNames = new Array();
    var pattern = /[\w\d]{1,}/ig;
    for(let i=0 ; i < 1 ; i++){
        let name = prompt("What is your name").toUpperCase();
        if (name && name.match(pattern)) {
            givenNames.push(name)
        }
    }
displayName();
function displayName(){
    if (givenNames.length>0){
        document.getElementById("name_player2").innerHTML = `<strong>${givenNames}</strong>`
    }else{
        `<h1>Nothing to print<h1>`
    }
}

function createBoard(player)
{
    const board_Player = document.getElementById(player);
​
    for (var x = 0; x < 4; x++) 
    {
        const li = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board
        for (var y = 0; y < 4; y++) 
        {
            const cell = document.createElement('div');
            cell.className = "square"; // adding css properties to make it looks like a square
            cell.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
            cell.value = 0;//state of the cell
            cell.style.color = "black";
            //this function adds the click event to each cell
            cell.addEventListener( 'click', (e) => 
            {
                let cell = e.target; // get the element clicked
                // console.log( cell.textContent) //display the coordinates in the console
                // cell.style.visibility = 'hidden';// this  means that the contents of the element will be invisible, 
                // but the element stays in its original position and size / 
            });
            li.appendChild(cell); //adding each cell into the row number x
        }
        board_Player.appendChild(li); //adding each row into the board
    }
}
​
let myButton = document.getElementById("start-button");
let startCounter = 0;
let gameOver = false;
let player_1 = {name: "", boats: 4, board: getBoard()};
let player_2 = {name: "", boats: 4, board: getBoard()};
​
function startGame()
{
    startCounter = startCounter + 1;
    if (startCounter < 2)
    {
        createBoard("board_player1");
        createBoard("board_player2");
​
        player_1.name = prompt("Player 1 ,what is your name?");
​
        player_2.name = prompt("Player 2, what is your name?");
        while (player_2.name === player_1.name)
        {
            player_2.name = prompt("Name already in use! Please enter a unique name for Player 2.")
        }
​
        document.getElementById("name_player1").innerHTML = player_1.name;
        document.getElementById("name_player2").innerHTML = player_2.name;

        document.getElementById("buttons").innerHTML = `<button onclick="reset()">Reset</button><br><br><button onclick="newGame()">New Game</button>`;
​
        runGame(player_1, player_2);
    }
    else if (gameOver)
    {
        document.getElementById("board_player1").innerHTML = "";
        document.getElementById("board_player2").innerHTML = "";
​
        createBoard("board_player1");
        createBoard("board_player2");
​
        runGame(player_1, player_2);
    }
    else
        messageBox("Cannot start game. Game in progress...");
}
​
function runGame(p1, p2)
{
    gameOver = false;
    turn_player = randomNumber(1, 2);
    if (turn_player === 1)
        document.getElementById("turn_player").innerText = p1.name;
    else if (turn_player === 2)
        document.getElementById("turn_player").innerText = p2.name;
    else
        document.getElementById("turn_player").innerText = "Unknown Player";
    let board_player_1 = document.getElementById("board_player1");
    let board_player_2 = document.getElementById("board_player2");
    for (let i = 0; i < board_player_1.childNodes.length; i++)
    {
        for (let j = 0; j < board_player_1.childNodes[i].childNodes.length; j++)
        {
            board_player_1.childNodes[i].childNodes[j].value = p1.board[i][j];
            board_player_1.childNodes[i].childNodes[j].onclick = function(e) { validate(e); };
            board_player_2.childNodes[i].childNodes[j].value = p2.board[i][j];
            board_player_2.childNodes[i].childNodes[j].onclick = function(e) { validate(e); };
        }
    }
    document.getElementById("ships_player1").innerText = p1.boats;
    document.getElementById("ships_player2").innerText = p2.boats;
}
​
function validate(e)
{
    let tar = e.target;
    let player_board = tar.parentElement.parentElement.parentElement;
    let board_name = player_board.childNodes[3].childNodes[1].lastChild.innerText;
    let current_player = document.getElementById("turn_player").innerText;
    if (board_name === current_player)
        messageBox(`You cannot use this board...<br>Try clicking on your opponent's board.`);
    else
    {
        let opponent_name = "";
        if (tar.value === 1)
        {
            messageBox("Hooray! You have sunk one of your opponent's ships!");
            if (current_player === player_1.name)
            {
                player_2.boats = player_2.boats - 1;
                if (player_2.boats === 0)
                {
                    messageBox(`Congratulations ${player_1.name}! You are the winner!!<br><br><h3>Game over.</h3>`);
                    mySquares = document.getElementsByClassName("square");
                    for (i = 0; i < mySquares.length; i++)
                    {
                        mySquares[i].onclick = null;
                    }
                    gameOver = true;
                }
                document.getElementById("ships_player2").innerText = player_2.boats;
                opponent_name = player_2.name;
                tar.style.background = "green";
                tar.style.color = "transparent";
                tar.onclick == null;
            }
            else if (current_player === player_2.name)
            {
                player_1.boats = player_1.boats - 1;
                if (player_1.boats === 0)
                {
                    messageBox(`Congratulations ${player_2.name}! You are the winner!!<br><br><h3>Game over.</h3>`);
                    mySquares = document.getElementsByClassName("square");
                    for (i = 0; i < mySquares.length; i++)
                    {
                        mySquares[i].onclick = null;
                    }
                    gameOver = true;
                }
                document.getElementById("ships_player1").innerText = player_1.boats;
                opponent_name = player_1.name;
                tar.style.background = "green";
                tar.style.color = "transparent";
                tar.onclick == null;
            }
            if (!gameOver)
            {
                setTimeout(function()
                {
                    document.getElementById("message-box").innerHTML += `<div id="message-box"><h3>Now it's ${opponent_name}'s turn...</h3></div>`;
                }, 2000);
                document.getElementById("turn_player").innerText = opponent_name;
            }
        }
        else if (tar.value === 0)
        {
            tar.onclick = null;
            tar.style.background = "purple";
            tar.style.color = "transparent";
            messageBox("You did not find a ship...");
            if (current_player === player_1.name)
                document.getElementById("turn_player").innerText = player_2.name;
            else
                document.getElementById("turn_player").innerText = player_1.name;
            setTimeout(function()
            {
                if (current_player === player_1.name)
                    document.getElementById("message-box").innerHTML += `<div id="message-box"><h3>Now it's ${player_2.name}'s turn.</h3></div>`;
                else
                    document.getElementById("message-box").innerHTML += `<div id="message-box"><h3>Now it's ${player_1.name}'s turn.</h3></div>`;
            }, 2000);
        }
    }
    return
}
​
function getBoard()
{
    let ships = [];
    let board = new Array(4);
    let cells = new Array(16).fill(0);
    while (ships.length < 4)
    {
        let num = randomNumber(0, 15);
        if (ships.indexOf(num) === -1) ships.push(num);
    }
    for (let i = 0; i < board.length; i++)
    {
        cells[ships[i]] = 1;
        board[i] = new Array(4);
    }
    for (let i = 0; i < 4; i++)
    {
        for (let j = 0; j < 4; j++)
            board[i][j] = cells.shift();
    }
    for (let i = 0; i < 4; i++)
        console.log(board[i]);
    console.log("------------------");
    return board
}
​
function reset()
{
    gameOver = true;
    player_1.boats = 4;
    player_2.boats = 4;
    messageBox("Game was just reset.");
    startGame();
    return
}
​
function messageBox(msg)
{
    if (!document.getElementById("message-box"))
        document.getElementById("buttons").innerHTML += `<div id="message-box"><h3>${msg}</h3></div>`;
    else
    {
        document.getElementById("message-box").remove();
        document.getElementById("buttons").innerHTML += `<div id="message-box"><h3>${msg}</h3></div>`;
    }
}
​
function newGame()
{
    location.reload();
    return
}
​
function randomNumber(min, max) 
{  
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}



const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");
const statusDisplay = document.getElementById("status");

// Define the initial game variables
let currentPlayer = "X"; 
let gameActive = true;   // Boolean to control game state
let gameState = Array(9).fill(""); // Represents the game board

// Define the winning conditions
const winningConditions = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
];

// Function to handle cell clicks
const handleCellClick = (event) => {
    const cell = event.target; // Get the clicked cell
    const cellIndex = cell.id.split("-")[1]; // Extract the cell index from the ID

    if (gameState[cellIndex] !== "" || !gameActive) {
        // Ignore clicks on already-filled cells or if the game is over
        return;
    }

    // Update the game state and UI
    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check for a win or draw
    checkResult();
};

// Function to check the result of the game
const checkResult = () => {
    let roundWon = false;

    // Check if any winning condition is met
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    // Check for a draw
    if (!gameState.includes("")) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    // Switch turns
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Turn for ${currentPlayer}`;
};

// Function to restart the game
const resetGame = () => {
    gameState = Array(9).fill(""); // Reset game state
    gameActive = true; // Reactivate the game
    currentPlayer = "X"; // Reset to Player X's turn
    statusDisplay.textContent = "Turn for X"; // Reset the status message

    // Clear the UI board
    cells.forEach((cell) => (cell.textContent = ""));
};

// Add event listeners to each cell
cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
});

// Add an event listener to the reset button
resetButton.addEventListener("click", resetGame);

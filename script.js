
const word = ["EXTRA", "FISH", "SNAKE", "MUTE", "TOOL", "BOOK", "CAVE", "HILL", "TREE", "FARM", "SHOE", "BELL", "FORK", "GATE", "WIND", 
                "CORN", "GRASS", "SNAIL", "PLANT", "HOUSE", "APPLE", "BRICK", "CLOUD", "TRAIL", 
                "FLAME", "RIVER", "STARS", "CARGO", "GRAPE", "MOUSE", "CHAIR", "BLADE", "CROWN", 
                "FENCE", "BREAD", "SHELL", "FLOOR", "PLANE", "WHALE", "PLATE", "BRUSH", "DRILL", 
                "SWING", "BRANCH" ]; // declares word that needs to be found
                
const placeholders = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // letters of the alphabet to place randomly across the board
const tableCells = document.querySelectorAll("td"); // finds all TD elemends
const resetButton = document.getElementById("resetButton"); // finds reset button
const submitButton = document.getElementById("submitButton"); // finds submit button
const wordToFind1 = document.getElementById("findWord1"); // finds placeholder word1 on left hand side
const wordToFind2 = document.getElementById("findWord2"); // finds placeholder word2 on left hand side
const wordToFind3 = document.getElementById("findWord3"); // finds placeholder word2 on left hand side
const wordToFind4 = document.getElementById("findWord4"); // finds placeholder word2 on left hand side
const wordToFind5 = document.getElementById("findWord5"); // finds placeholder word2 on left hand side
const restartButton = document.getElementById("restart"); // finds restart button
let showWord = document.getElementById("selectedLetters"); // finds text element below table


// This code checks if the win condition has been met.
// if true it will hide the table and display the win screen

let correctWords = 0; // defines number of correct words

function checkWinCondition(){ // checks win condition

    if(correctWords < 5){
        document.getElementById("winScreen").style.display = "none"; // win screen is disabled
    }
    else if(correctWords >= 5){
        console.log("you won")
        document.getElementById("board").style.display = "none"; // hide table
        document.getElementById("winScreen").style.display = "block"; // enable win screen
        document.getElementById("selectedLetters").style.display = "none"; // hides text bar below board
        document.getElementById("submitButton").style.display = "none"; // hides submit button
        document.getElementById("resetButton").style.display = "none"; // hides reset button
    }
}
checkWinCondition();

function updateCorrectWords(newCount){
    correctWords = newCount; // uses new count as the counter for correct words
    checkWinCondition() // calls checkWinCondition function
}

//generates a random number to be used as an index for choosing a random word
let wordChooser1 = Math.floor(Math.random() * word.length);
let wordChooser2 = Math.floor(Math.random() * word.length);
let wordChooser3 = Math.floor(Math.random() * word.length);
let wordChooser4 = Math.floor(Math.random() * word.length);
let wordChooser5 = Math.floor(Math.random() * word.length);

// if both random numbers are the same, regenerate number

while (wordChooser1 == wordChooser2 // rerolls word chooser 1
    || wordChooser1 == wordChooser3
    || wordChooser1 == wordChooser4 
    || wordChooser1 == wordChooser5 )
    {
    wordChooser1 = Math.floor(Math.random() * word.length);
    console.log("re-roll wordChooser1")
}

while (wordChooser2 == wordChooser1 // rerolls word chooser 2
    || wordChooser2 == wordChooser3 
    || wordChooser2 == wordChooser4 
    || wordChooser2 == wordChooser5 )
    {
    wordChooser2 = Math.floor(Math.random() * word.length);
    console.log("re-roll wordChooser2")
}

while (wordChooser3 == wordChooser1 // rerolls word chooser 3
    || wordChooser3 == wordChooser2 
    || wordChooser3 == wordChooser4 
    || wordChooser3 == wordChooser5)
    {
    wordChooser3 = Math.floor(Math.random() * word.length);
    console.log("re-roll wordChooser3")
}

while (wordChooser4 == wordChooser1 // rerolls word chooser 4
    || wordChooser4 == wordChooser2 
    || wordChooser4 == wordChooser3 
    || wordChooser4 == wordChooser5)
    {
    wordChooser4 = Math.floor(Math.random() * word.length);
    console.log("re-roll wordChooser4")
}

while (wordChooser5 == wordChooser1 // rerolls word chooser 5
    || wordChooser5 == wordChooser2 
    || wordChooser5 == wordChooser3 
    || wordChooser5 == wordChooser4)
    {
    wordChooser5 = Math.floor(Math.random() * word.length);
    console.log("re-roll wordChooser5")
}


//chooses which words to be used in list
const word1 = word[wordChooser1];
const word2 = word[wordChooser2];
const word3 = word[wordChooser3];
const word4 = word[wordChooser4];
const word5 = word[wordChooser5];

//places words on the screen's sidebar
wordToFind1.textContent = word1;
wordToFind2.textContent = word2;
wordToFind3.textContent = word3;
wordToFind4.textContent = word4;
wordToFind5.textContent = word5;

// This section fills the table with random letters
// simple and effective
tableCells.forEach(cell => {
    let randomNum = Math.floor(Math.random() * 26) // generates random number between 0 and 26
    cell.textContent = placeholders[randomNum] // places letters into table cell
});


// This section of the script places the words that need to be found by the user into the table
// In this itteration, it runs a check in the switch statements to see if there are any conflicts with previously placed words
// There is definitely many flaws like it only supporting two fixed words but as a personal project I'm contempt

let placedTiles = []; // Array to store coordinates of placed letters

function tryPlaceWord(word) { // Function to check and place a word
    let placed = false;

    while (placed == false) {
        let decider = Math.floor(Math.random() * 5); // Random direction (0-4)
        let xDecider = Math.floor(Math.random() * 8); // Random x coordinate
        let yDecider = Math.floor(Math.random() * 8); // Random y coordinate

        console.log(`Trying to place "${word}" at starting coordinates (${xDecider}, ${yDecider}) in direction ${decider}`);

        let canPlace = true;
        let coordinates = []; // Holds coordinates for this word

        switch (decider) {
 
            case 0: // Horizontal placement
                if (xDecider + word.length <= 7) { // ensures that the word from it's starting coordinates fits into table
                    for (let i = 0; i < word.length; i++) { 
                        let coord = `${xDecider + i}-${yDecider}`;
                        if (placedTiles.includes(coord)) { // during loop, check if the the current coordinate is the same as previously placed word
                            canPlace = false;
                            break; // if conflict occurs, break out of for loop and don't continue
                        }
                        coordinates.push(coord); // appends coordinates to be used for placing
                    }
                } else {
                    canPlace = false;
                }
                break;

            case 1: // Diagonal (top-left to bottom-right)
                if (xDecider + word.length <= 7 && yDecider + word.length <= 7) { // ensures word fits into table on x & y coordinatees
                    for (let i = 0; i < word.length; i++) {
                        let coord = `${xDecider + i}-${yDecider + i}`;
                        if (placedTiles.includes(coord)) { // during loop, check if the the current coordinate is the same as previously placed word
                            canPlace = false;
                            break; // if conflict occurs, break out of for loop and don't continue
                        }
                        coordinates.push(coord); // appends coordinates to be used for placing
                    }
                } else {
                    canPlace = false;
                }
                break;

            case 2: // Diagonal (bottom-left to top-right)
                if (xDecider + word.length <= 7 && yDecider - word.length >= 0) { // ensures word fits into table on x & y coordinatees
                    for (let i = 0; i < word.length; i++) {
                        let coord = `${xDecider + i}-${yDecider - i}`;
                        if (placedTiles.includes(coord)) { // during loop, check if the the current coordinate is the same as previously placed word
                            canPlace = false;
                            break; // if conflict occurs, break out of for loop and don't continue
                        }
                        coordinates.push(coord); // appends coordinates to be used for placing
                    }
                } else {
                    canPlace = false;
                }
                break;

            case 3: // Vertical (top to bottom)
                if (yDecider + word.length <= 7) { // ensures word fits into table on x & y coordinatees
                    for (let i = 0; i < word.length; i++) {
                        let coord = `${xDecider}-${yDecider + i}`;
                        if (placedTiles.includes(coord)) { // during loop, check if the the current coordinate is the same as previously placed word
                            canPlace = false;
                            break; // if conflict occurs, break out of for loop and don't continue
                        }
                        coordinates.push(coord); // appends coordinates to be used for placing
                    }
                } else {
                    canPlace = false;
                }
                break;

            case 4: // Vertical (bottom to top)
                if (yDecider - word.length >= 0) { // ensures word fits into table on x & y coordinatees
                    for (let i = 0; i < word.length; i++) {
                        let coord = `${xDecider}-${yDecider - i}`;
                        if (placedTiles.includes(coord)) { // during loop, check if the the current coordinate is the same as previously placed word
                            canPlace = false;
                            break; // if conflict occurs, break out of for loop and don't continue
                        }
                        coordinates.push(coord); // appends coordinates to be used for placing
                    }
                } else {
                    canPlace = false;
                }
                break;
        }

        if (canPlace) { // canPlace = true
            coordinates.forEach((coord, index) => {
                placedTiles.push(coord); // pushes coordinate into currently placed tiles to be checked on the next pass for conflicts
                let cell = document.getElementById(coord); // retrieves cell id in which the letter will be placed
                cell.textContent = word[index]; // places letter into cell based on the word's index
                console.log(`Placed "${word[index]}" at ${coord}`);
            });
            placed = true; //ends loop
        } else {
            console.log(`Failed to place "${word}", retrying...`);
        }
    }
}

// Place words
tryPlaceWord(word1);

tryPlaceWord(word2);

tryPlaceWord(word3);

tryPlaceWord(word4);

tryPlaceWord(word5);


// This section of the code is used for selecting the letters
// It checks for if the user selected an adjacent cell to the previously chosen one
// it checks if the user is following a straight path in selecting a direction they decided to go

let origin = null; // Stores the original clicked cell's coordinates
let selectedCells = ""; // Stores the selected cell contents
let wordCoordinate = [];

let isDiagonalTop = false;
let isDiagonalBottom = false;
let isHorizontal = false;
let isVerticalTop = false;
let isVerticalBottom = false;

tableCells.forEach(cell => {
    cell.addEventListener("click", () => {
        const [col, row] = cell.id.split("-").map(Number); // splits html id to individually store column and row
        
        // If no origin is set, set it to the first clicked cell
        if (!origin) {
            origin = { col, row };  // Set origin coordinates
            selectedCells += cell.textContent;  // Append cell text to selectedCells
            showWord.textContent = selectedCells; // Displays selected letters below table
            cell.classList.add("active");  // Mark the origin cell as active
            wordCoordinate.push(`${col}-${row}`);
            console.log(`Origin set to: ${cell.id}`);
            
            return;

        }
        
        // Check if the clicked cell is adjacent to the origin cell
        if (Math.abs(row - origin.row) <= 1 && Math.abs(col - origin.col) <= 1) {

            if(col - origin.col == 1 && row - origin.row == -1 // Diagonal Top selector
                && isDiagonalBottom == false
                && isHorizontal == false
                && isVerticalTop == false
                && isVerticalBottom == false){

                origin = { col, row }; // sets origin to current cell
                selectedCells += cell.textContent;  // Append cell text to selectedCells
                showWord.textContent = selectedCells; // Displays selected letters below table
                cell.classList.add("active");  // Mark the clicked cell as active
                console.log(`Clicked and added: ${cell.id}, Selected: ${selectedCells}`);

                isDiagonalTop = true;
            }

            if(col - origin.col == 0 && row - origin.row == -1 // Vertical Top selector
                && isDiagonalTop == false
                && isDiagonalBottom == false
                && isHorizontal == false
                && isVerticalBottom == false){

                origin = { col, row }; // sets origin to last clicked cell
                selectedCells += cell.textContent;  // Append cell text to selectedCells
                showWord.textContent = selectedCells; // Displays selected letters below table
                cell.classList.add("active");  // Mark the clicked cell as active
                console.log(`Clicked and added: ${cell.id}, Selected: ${selectedCells}`);

                isVerticalTop = true;
    
            }

            if(col - origin.col == 1 && row - origin.row == 1 // Diagonal Bottom selector
                && isDiagonalTop == false
                && isVerticalTop == false
                && isHorizontal == false
                && isVerticalBottom == false){

                origin = { col, row }; // sets origin to current cell
                selectedCells += cell.textContent;  // Append cell text to selectedCells
                showWord.textContent = selectedCells; // Displays selected letters below table
                cell.classList.add("active");  // Mark the clicked cell as active
                console.log(`Clicked and added: ${cell.id}, Selected: ${selectedCells}`);

                isDiagonalBottom = true;
    
            }
            
            if(col - origin.col == 0 && row - origin.row == 1 // vertical Bottom selector
                && isDiagonalTop == false
                && isVerticalTop == false
                && isHorizontal == false
                && isDiagonalBottom == false){

                origin = { col, row }; // sets origin to current cell
                selectedCells += cell.textContent;  // Append cell text to selectedCells
                showWord.textContent = selectedCells; // Displays selected letters below table
                cell.classList.add("active");  // Mark the clicked cell as active
                console.log(`Clicked and added: ${cell.id}, Selected: ${selectedCells}`);

                isVerticalBottom = true;
    
            }

            if(col - origin.col == 1 && row - origin.row == 0 // horizontal selector
                && isDiagonalTop == false
                && isVerticalTop == false
                && isVerticalBottom == false
                && isDiagonalBottom == false){
                    
                origin = { col, row }; // sets origin to current cell
                selectedCells += cell.textContent;  // Append cell text to selectedCells
                showWord.textContent = selectedCells; // Displays selected letters below table
                cell.classList.add("active");  // Mark the clicked cell as active
                console.log(`Clicked and added: ${cell.id}, Selected: ${selectedCells}`);

                isHorizontal = true;
    
            }
            // if all booleans are false, the user tried moving in an illegal way
            else if(isDiagonalTop == false 
                && isDiagonalBottom == false 
                && isHorizontal == false 
                && isVerticalTop == false 
                && isVerticalBottom == false){
                    showWord.textContent = "can't select letters backwards"
                }
            
        wordCoordinate.push(`${col}-${row}`); // appends selected cells into array
        } 
        
        else { // adjacent letters must be selected
            showWord.textContent = "only adjacent letters can be selected";
        }
    });
});

// Reset button
// on click, reset selected values to original
resetButton.addEventListener("click", () => {
    origin = null;
    selectedCells = "";
    showWord.textContent = "";
    isDiagonalTop = false;
    isDiagonalBottom = false;
    isHorizontal = false;
    isVerticalTop = false;
    isVerticalBottom = false;
    wordCoordinate = [];
    tableCells.forEach(cell => {
        cell.classList.remove("active");
    })
});


// submit button
// on click, check if the correct word was selected
// performs a reset in both cases
submitButton.addEventListener("click", () =>{
    if(selectedCells == word1 || selectedCells == word2 || selectedCells == word3 || selectedCells == word4 || selectedCells == word5){

        
        correctWords++; //each correct words will increment counter
        updateCorrectWords(correctWords); // updates win condition with counter


        //set each correct word in sidebar to correct color
        if(selectedCells == word1){ // if word 1 is selected and correct, change appropriate word in side bar to green background
            wordToFind1.classList.add("activeCorrect");
        }
        else if(selectedCells == word2){ // if word 2 is selected and correct, change appropriate word in side bar to green background
            wordToFind2.classList.add("activeCorrect");
        }
        else if(selectedCells == word3){ // if word 3 is selected and correct, change appropriate word in side bar to green background
            wordToFind3.classList.add("activeCorrect");
        }
        else if(selectedCells == word4){ // if word 3 is selected and correct, change appropriate word in side bar to green background
            wordToFind4.classList.add("activeCorrect");
        }
        else if(selectedCells == word5){ // if word 3 is selected and correct, change appropriate word in side bar to green background
            wordToFind5.classList.add("activeCorrect");
        }


        // every cell coordinate that was correct is set to active
        for (let coord in wordCoordinate) { // correct letters that were chosen will stay green on the board
            let toSelect = document.getElementById(wordCoordinate[coord]);
            if (toSelect) toSelect.classList.add("activeCorrect");
        }
        // resets variables back to original settings
        showWord.textContent = `${selectedCells} is correct!!`;
        origin = null; 
        selectedCells = "";
        wordCoordinate = [];
        isDiagonalTop = false;
        isDiagonalBottom = false;
        isHorizontal = false;
        isVerticalTop = false;
        isVerticalBottom = false;
    }

    else{ // if answer is incorrect, resets variables
        showWord.textContent = `${selectedCells} is incorrect`;
        origin = null;
        selectedCells = "";
        isDiagonalTop = false;
        isDiagonalBottom = false;
        isHorizontal = false;
        isVerticalTop = false;
        isVerticalBottom = false;
        wordCoordinate = [];
        tableCells.forEach(cell => {
            cell.classList.remove("active");
        })
    }
})

// restarts window
// can only be seen if win condition is met
restartButton.addEventListener("click", () =>{
    window.location.reload();
})

const word = "XAVIER"; // declares word that needs to be found
const placeholders = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // letters of the alphabet to place randomly across the board
const tableCells = document.querySelectorAll("td"); // finds all TD elemends
const resetButton = document.getElementById("resetButton"); // finds reset button
const submitButton = document.getElementById("submitButton"); // finds submit button
const wordToFind = document.getElementById("findWord"); // finds placeholder word on left hand side

wordToFind.textContent = word;

// places random letter into every cell
tableCells.forEach(cell => {
    let randomNum = Math.floor(Math.random() * 26) // generates random number between 0 and 26
    cell.textContent = placeholders[randomNum] // places letters into table cell
});


let placed = false; // variable used to break out of while loop


//This loop places word into table
//Contains code for placing diagonally, vertically and horizontally 
while(placed == false){
    let decider = Math.floor(Math.random() * 5); // variable to choose which direction the word will go
    let i = 0 // used to iterate over word
    let xDecider = Math.floor(Math.random() * 8); // decides starting x coordinate
    let yDecider = Math.floor(Math.random() * 8); // decides starting y coordinate
    console.log(xDecider);
    console.log(yDecider);

    switch(decider){
        case 0: // places word horizontally
            console.log("case 0");
            if(xDecider + word.length > 7){ // if the word lenght exceeds table lenght, don't place
                console.log("couldn't place");
            }

            else if(xDecider + word.length <= 7){ // if word can fit in table, place into table
                for(letter in word){
                    let places = document.getElementById(`${xDecider}-${yDecider}`); // gets x and y coordiantes of table
                    places.textContent = word[i]; // places each letter based on i variable
                    xDecider++; // increases x coordinate
                    i++;
                    placed = true; // loop finished
                    console.log("placed 0");
                }
            }
        break

    case 1: // places word top diagonally
        console.log("case 1");
        if(xDecider + word.length > 7){ // if the word lenght exceeds table lenght, don't place
            console.log("couldn't place");
        }

        else if(xDecider + word.length <= 7 && yDecider + word.length <= 7){ // if word can fit in table, place into table
            for(letter in word){
                let places = document.getElementById(`${xDecider}-${yDecider}`); // gets x and y coordiantes of table
                places.textContent = word[i]; // places each letter based on i variable
                xDecider++; // increases x coordinate
                yDecider++ // increases y coordinate
                i++;
                placed = true; // loop finished
                console.log("placed 1");
            }
        }
        break

    case 2: // places word bottom diagonally
        console.log("case 2");
        if(xDecider + word.length > 7 && yDecider - word.length < 0){
            console.log("couldn't place");
        }

        else if(xDecider + word.length <= 7 && yDecider - word.length >= 0){
            for(letter in word){
                let places = document.getElementById(`${xDecider}-${yDecider}`); // gets x and y coordiantes of table
                places.textContent = word[i]; // places each letter based on i variable
                xDecider++; // increases x coordinate
                yDecider--
                i++;
                placed = true; // loop finished
                console.log("placed 2");
            }
        }
        break

    case 3: // places text vertical down
        console.log("case 3");
        if(yDecider + word.length > 7){ // if the word lenght exceeds table lenght, don't place
            console.log("couldn't place");
        }

        else if(yDecider + word.length <= 7){ // if word can fit in table, place into table
            for(letter in word){
                let places = document.getElementById(`${xDecider}-${yDecider}`); // gets x and y coordiantes of table
                places.textContent = word[i]; // places each letter based on i variable
                yDecider++; // increases x coordinate
                i++;
                placed = true; // loop finished
                console.log("placed 3");
            }
        }
        break

    case 4: // places text vertical top
        console.log("case 4");
        if(yDecider + word.length > 8){ // if the word lenght exceeds table lenght, don't place
            console.log("couldn't place");
        }

        if (yDecider - word.length < -1){
            console.log("couldn't place");
        }

        else{ // if word can fit in table, place into table
            for(letter in word){
                let places = document.getElementById(`${xDecider}-${yDecider}`); // gets x and y coordiantes of table
                places.textContent = word[i]; // places each letter based on i variable
                yDecider--; // increases x coordinate
                i++;
                placed = true; // loop finished
                console.log("placed 4");
            }
        }
        break
    }
}


// This section adds an event listner to each cell of the table
// After choosing a cell, an origin is picked and it checks if a nearby cell has been clicked
// if a cell outside of the most recently chosen cell, it doesn't allow the user to select it

let showWord = document.getElementById("selectedLetters");
let origin = null; // Stores the original clicked cell's coordinates
let selectedCells = ""; // Stores the selected cell contents


tableCells.forEach(cell => {
    cell.addEventListener("click", () => {
        const [col, row] = cell.id.split("-").map(Number);

        // If no origin is set, set it to the first clicked cell
        if (!origin) {
            origin = { row, col };  // Set origin coordinates
            selectedCells += cell.textContent;  // Append cell text to selectedCells
            showWord.textContent = selectedCells; // Displays selected letters below table
            cell.classList.add("active");  // Mark the origin cell as active
            console.log(`Origin set to: ${cell.id}`);
            return;

        }

        // Check if the clicked cell is adjacent to the origin cell
        const isAdjacent = Math.abs(row - origin.row) <= 1 && Math.abs(col - origin.col) <= 1;

        if (isAdjacent) {
            selectedCells += cell.textContent;  // Append cell text to selectedCells
            showWord.textContent = selectedCells; // Displays selected letters below table
            cell.classList.add("active");  // Mark the clicked cell as active
            origin = { row, col };  // Update the origin to the current cell
            console.log(`Clicked and added: ${cell.id}, Selected: ${selectedCells}`);
            
        } 
        
        else {
            console.log("Only adjacent cells can be clicked!");
        }
    });
});

// Reset button
// on click, reset selected values to original
resetButton.addEventListener("click", () => {
    origin = null;
    selectedCells = "";
    showWord.textContent = "";
    tableCells.forEach(cell => {
        cell.classList.remove("active");
    })
});

// submit button
// on click, check if the correct word was selected
submitButton.addEventListener("click", () =>{
    if(selectedCells == word){
        console.log("correct!");
    }
    else{
        console.log("incorrect");
    }
})


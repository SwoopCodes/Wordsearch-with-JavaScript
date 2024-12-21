
const word = "EXTRA"; // declares word that needs to be found
const placeholders = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // letters of the alphabet to place randomly across the board
const tableCells = document.querySelectorAll("td"); // finds all TD elemends
const resetButton = document.getElementById("resetButton"); // finds reset button
const submitButton = document.getElementById("submitButton"); // finds submit button
const wordToFind = document.getElementById("findWord"); // finds placeholder word on left hand side
let showWord = document.getElementById("selectedLetters"); // finds text element below table

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

    case 3: // places word vertical down
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

    case 4: // places word vertical top
        console.log("case 4");
        if(yDecider + word.length > 8){ // if the word lenght exceeds table lenght in the x direction, don't place
            console.log("couldn't place");
        }

        if (yDecider - word.length < -1){ // if the word lenght exceeds table lenght in the y direction, don't place
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


// This section of the code is used for selecting the letters
// It checks for if the user selected an adjacent cell to the previously chosen one
// it checks if the user is following a straight path in selecting a direction they decided to go

let origin = null; // Stores the original clicked cell's coordinates
let selectedCells = ""; // Stores the selected cell contents

let isDiagonalTop = false;
let isDiagonalBottom = false;
let isHorizontal = false;
let isVerticalTop = false;
let isVerticalBottom = false;

tableCells.forEach(cell => {
    cell.addEventListener("click", () => {
        const [col, row] = cell.id.split("-").map(Number);

        // If no origin is set, set it to the first clicked cell
        if (!origin) {
            origin = { col, row };  // Set origin coordinates
            selectedCells += cell.textContent;  // Append cell text to selectedCells
            showWord.textContent = selectedCells; // Displays selected letters below table
            cell.classList.add("active");  // Mark the origin cell as active
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
            
            if(col - origin.col == 0 && row - origin.row == 1 // Diagonal Bottom selector
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

            if(col - origin.col == 1 && row - origin.row == 0 // Diagonal Bottom selector
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
    tableCells.forEach(cell => {
        cell.classList.remove("active");
    })
});

// submit button
// on click, check if the correct word was selected
submitButton.addEventListener("click", () =>{
    if(selectedCells == word){
        showWord.textContent = `${selectedCells} is correct!!`;
        origin = null;
        selectedCells = "";
        tableCells.forEach(cell => {
            cell.classList.remove("active");
        })
    }
    else{
        console.log(`${selectedCells} is incorrect!`);
    }
})

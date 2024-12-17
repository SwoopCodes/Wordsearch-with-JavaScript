
const word = "HELLO"; // declares word that needs to be found

let selected = "" // selected letters by user

const placeholders = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // letters of the alphabet to place randomly across the board


let xCoordinate = 0; // x coordinates of table
let yCoordinate = 0; // y coordinates of table

const tableCells = document.querySelectorAll("td"); // finds all TD elemends

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
                    let places = document.getElementById(`x${xDecider}y${yDecider}`); // gets x and y coordiantes of table
                    places.textContent = word[i]; // places each letter based on i variable
                    xDecider++; // increases x coordinate
                    i++;
                    placed = true; // loop finished
                    console.log("placed 0");
                }
            }
        break

    case 1: // places word bottom diagonally
        console.log("case 1");
        if(xDecider + word.length > 7){ // if the word lenght exceeds table lenght, don't place
            console.log("couldn't place");
        }

        else if(xDecider + word.length <= 7 && yDecider + word.length <= 7){ // if word can fit in table, place into table
            for(letter in word){
                let places = document.getElementById(`x${xDecider}y${yDecider}`); // gets x and y coordiantes of table
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
                let places = document.getElementById(`x${xDecider}y${yDecider}`); // gets x and y coordiantes of table
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
                let places = document.getElementById(`x${xDecider}y${yDecider}`); // gets x and y coordiantes of table
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
                let places = document.getElementById(`x${xDecider}y${yDecider}`); // gets x and y coordiantes of table
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
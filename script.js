
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


let i = 0; // i 

// places word into table
// to be changed later
for(letter in word){
    let places = document.getElementById(`x${xCoordinate}y${yCoordinate}`); // gets x and y coordiantes of table
    places.textContent = word[i]; // places each letter based on i variable
    xCoordinate++; // increases x coordinate
    i++;
}

//adds event listener to every cell
// on click - append cell data into 'selected' variable
tableCells.forEach(cell => {
    cell.addEventListener("click", function(){
        selected += cell.textContent
        console.log(selected)
    })
});
const word = "HELLO";

let xCoordinate = 0;
let yCoordinate = 0;

let i = 0;

for(letter in word){
    let places = document.getElementById(`x${xCoordinate}y${yCoordinate}`);
    places.textContent = word[i];
    x++
    i++
}

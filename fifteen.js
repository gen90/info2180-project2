//Multiple Backgrounds Extra Feature

window.onload = function(){
    controls();
    EMPTY_TILE = "4,4";
    PUZZLEAREA = document.getElementById('puzzlearea');
    puzzlearea.style.display = 'grid';
    puzzlearea.style.gridTemplateColumns = 'repeat(4,auto)';
    puzzlePieces = document.querySelectorAll('#puzzlearea div');
    RandomLoad();
    CLICKED = false;
    for(var x = 0; x<puzzlePieces.length;x++){
        pieceSetup(puzzlePieces[x],x)   
   }
   var button = document.getElementById('shufflebutton');
   button.addEventListener('click',shuffle);

}
 

//pieceSetup gives the puzzle pieces all its initial features;
//1. Adds the class puzzlepiece to each piece as well as sets style properties of its position
// and background size
// Each row contains for spaces and each column contains 4 spaces
// To determine the row a piece is in its equal to the total amount of times
// 4 can go into its index + 1.
// The column for a piece will be equal to the modulus of when 4 divides the index + 1
//From this we can calculate the relative positioning of the background image on the piece using
//-100 times the row or column value. We can not set the backgroundPosition of each piece
//So that initially they form the background image.
function pieceSetup(piece,i){
    piece.classList.add('puzzlepiece');
    piece.style.position= 'relative';
    piece.style.backgroundSize = '400px 400px';
    let column = i%4;
    let row = Math.floor(i/4);
    let positionx = (-100*(column)).toString() +"px ";
    let positiony = (-100*(row)).toString() + "px";
    piece.style.backgroundPosition =positionx + positiony;
    idInitialize(piece,makeID(row+1,column+1));
    piece.addEventListener("mouseover",movable);
    piece.addEventListener("mouseleave",revert);
    piece.addEventListener("click",move);
}

// Shuffle aims to rearrange all of the puzzle pieces, and the empty space on the board. For 99 iterations, 
// a random puzzle piece will be chozen and its position swapped with the empty tile.
function shuffle(){
    CLICKED = true;
    for(var i=0;i<99;i++){
        current = PUZZLEAREA.children[Math.floor(Math.random() *15)];
        switch1(current);
    }

}

function idInitialize(item,newid){
    item.setAttribute("id",newid);
}

// Switch1 switches a piece with the empty tile. To do this, it gets the location of the empty
// tile , row and column from its assignment and then moves to that location.
// The id of this tile is replaced with its new position, ie the old position of the empty tile
// and the empty tile now has a value equal to its new position, the old position of the puzzle piece
function switch1(current){
    current.style.gridColumn = EMPTY_TILE[0];
    current.style.gridRow = EMPTY_TILE[2];
    var oldID = current.getAttribute("id");
    idInitialize(current,EMPTY_TILE);
    EMPTY_TILE = oldID;

}

function makeID(x,y){
    return x.toString() + "," + y.toString();
}

//isMovable checks if a paticular puzzle piece is next to the empty square.
//It does this by checking if any of the 4 possible squares that a piece
// can move it is empty, is not an element with an id. If it is them it returns true.
// Otherwise the function returns false
function isMovable(p){
    pID = p.getAttribute("id");
    xcoord = parseInt(pID[0]);
    ycoord = parseInt(pID[2]);
    if(makeID(xcoord-1,ycoord)==EMPTY_TILE)
        return true;
    if(makeID(xcoord,ycoord-1) ==EMPTY_TILE)
        return true;
    if(makeID(xcoord+1,ycoord)== EMPTY_TILE)
        return true;
    if(makeID(xcoord,ycoord+1)==EMPTY_TILE)
        return true;
    return false;
}

function movable(){
    if(isMovable(this)&& CLICKED)
        this.classList.add('movablepiece');
}

function revert(){
    this.classList.remove('movablepiece');
}

function move(){
    if(isMovable(this)){
        switch1(this);
    }
}

//Controls sets up the control panel with the new backgrounds that the puzzle area can be changed to.
// 5 buttons are created with an image in it. These buttons are added to a div tag and then to the control
// panel. If any one of the buttons are clicked, then the src information of the image in the button is 
// collected and the background image of each puzzle piece is then changed.
function controls(){
    var controls = document.getElementById('controls');
    var imageButtons = document.createElement("div");
    imageButtons.style.marginTop = "10px"

   var image1= document.createElement("button");
   image1.innerHTML = "<img src = \"background.jpg\"/ height = \" 100px\" width = \"100px\">";
   image1.style.margin = "5px";
   image1.addEventListener("click",changePic)
   imageButtons.appendChild(image1);

   var image2 = document.createElement("button");
   image2.innerHTML = "<img src = \"https://images.unsplash.com/photo-1516617442634-75371039cb3a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6febeaaa69fd0cab717c6bab09776051&w=1000&q=80\"/ height = \" 100px\" width = \"100px\">"
   image2.style.margin = "5px";
   image2.addEventListener("click",changePic);
   imageButtons.appendChild(image2);
   
   var image3= document.createElement("button");
   image3.innerHTML = "<img src = \"http://www.cartoonswallpapers.net/wallpapers/naruto-shippuden-background-ipad-air-2.jpg\"/ height = \" 100px\" width = \"100px\">"
   image3.style.margin = "5px";
   image3.addEventListener("click",changePic);
   imageButtons.appendChild(image3);
  
   var image4= document.createElement("button");
   image4.innerHTML = "<img src = \"https://static.makeuseof.com/wp-content/uploads/2017/02/Photoshop-Replace-Background-Featured-670x335.jpg\"/ height = \" 100px\" width = \"100px\">"
   image4.style.margin = "5px";
   image4.addEventListener("click",changePic);
   imageButtons.appendChild(image4);
   
   var image5= document.createElement("button");
   image5.innerHTML = "<img src = \"https://brightcove04pmdo-a.akamaihd.net/5104226627001/5104226627001_5222667852001_5214854492001-vs.jpg?pubId=5104226627001&videoId=5214854492001\"/ height = \" 100px\" width = \"100px\">"
   image5.style.margin = "5px";
   image5.addEventListener("click",changePic);
   imageButtons.appendChild(image5);
   
   controls.appendChild(imageButtons);
}

function changePic(){
    setBackground(this.querySelector("img"));
}
function setBackground(image){
    for(var i=0;i<15;i++){
        PUZZLEAREA.children[i].style.backgroundImage = "url("+ image.src + ")";
    }   
}
//To load a random image as the background, a random number from 0 to 5 is selected and this number represents
// the index of list of all images in the control panel. Once an image is selected, the background of all the 
// puzzle pieces are set.
function RandomLoad(){
    var x = Math.floor(Math.random() *5);
    image = document.querySelectorAll("#controls img")[x];
    setBackground(image);
}
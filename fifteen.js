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

//To shuffle we need to move the puzzle pieces to a random position on the grid.
//We initially set out to go through each puzzle piece and switch it with a new random
//piece that will be found with the Math.random function.
//There are certain limitations,however, while looping, the loops will reach a point where it
// will look for the element with id (4,4) which would be the missing piece from the grid
// or where it will the new element found using the random number system is equal to the 
//current piece being accessed. In this case we do no want the pieces to shuffle.
//We also do not want to have to reshuffle pieces that have already been shuffled. 
// Each time a piece is shuffled, its id is added to a list, so when shuffling is to take place
// again. If any of the pieces to be suffled is in that list, we will not reshuffle.
// Another scenario is when the random piece, is the empty square on the grid. In that case, we did not 
// switch the position of two pieces, instead we only move one piece.
// In all other cases, we are switching the positions of the current piece, with the new random piece
// and changing thier ids to their new position.
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
//as well as the id that the new piece will be given. "The id of the empty space"
// If not this function will return false
function isMovable(p){
    pID = p.getAttribute("id");
    xcoord = parseInt(pID[0]);
    ycoord = parseInt(pID[2]);
    if(makeID(xcoord-1,ycoord)==EMPTY_TILE && (xcoord-1)>=1)
        return true;
    if(makeID(xcoord,ycoord-1) ==EMPTY_TILE && (ycoord-1)>=1)
        return true;
    if(makeID(xcoord+1,ycoord)== EMPTY_TILE&& (xcoord+1)<=4)
        return true;
    if(makeID(xcoord,ycoord+1)==EMPTY_TILE && (ycoord+1)<=4)
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

function RandomLoad(){
    var x = Math.floor(Math.random() *5);
    image = document.querySelectorAll("#controls img")[x];
    setBackground(image);
}
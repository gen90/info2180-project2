window.onload = function(){
    let puzzleArea = document.getElementById('puzzlearea');
    puzzleArea.style.display = 'grid';
    puzzleArea.style.gridTemplateColumns = 'repeat(4,auto)';
    puzzlePieces = document.querySelectorAll('#puzzlearea div');

    for(var x = 0; x<puzzlePieces.length;x++){
        pieceSetup(puzzlePieces[x],x)   
   }
   var button = document.getElementById('shufflebutton');
   button.addEventListener('click',shuffle);
   clicked = false;

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
    piece.addEventListener("mouseleave",original);
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
    clicked = true;
    for(var x=1;x<5;x++){
       for(var y = 1;y<5;y++){
           var newx = Math.floor(Math.random() * 4);  
           var newy = Math.floor(Math.random() * 4);
           var currentID = makeID(x,y);
           var newID = makeID(newx+1,newy+1);
           var currentPiece = document.getElementById(currentID);  
           var newPiece = document.getElementById(newID);
               
           if(currentPiece==null){continue;}
           else{
                    if(newPiece==null){
                            switch1(currentPiece,newx+1,newy+1);
                            idInitialize(currentPiece,newID);                         
                        }
                        else{   
                            switch2(currentPiece,newPiece,newx+1,newy+1,x,y);                               
                            idInitialize(currentPiece,newID);
                            idInitialize(newPiece,currentID);
                        } 
                         
            }
        }
   

    }
}

function idInitialize(item,newid){
    item.setAttribute("id",newid);
}

function switch1(current,newx,newy){
    current.style.gridColumn = (newy).toString();
    current.style.gridRow = (newx).toString();
}

function switch2(current,newP,newx,newy,x,y){
    current.style.gridColumn = (newy).toString();
    current.style.gridRow = (newx).toString();          
    newP.style.gridRow = (x).toString();
    newP.style.gridColumn = (y).toString();
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
    if(document.getElementById(makeID(xcoord-1,ycoord))==null && (xcoord-1)>=1)
        return [true,makeID(xcoord-1,ycoord)];
    if(document.getElementById(makeID(xcoord,ycoord-1)) ==null && (ycoord-1)>=1)
        return [true,makeID(xcoord,ycoord-1)];
    if(document.getElementById(makeID(xcoord+1,ycoord))== null&& (xcoord+1)<=4)
        return [true,makeID(xcoord+1,ycoord)];
    if(document.getElementById(makeID(xcoord,ycoord+1))==null && (ycoord+1)<=4)
        return [true,makeID(xcoord,ycoord+1)];
    return [false,0];
}

function movable(){
    if(isMovable(this)[0]&& clicked)
        this.classList.add('movablepiece');
}

function original(){
    if(clicked)
    this.classList.remove('movablepiece');
}

function move(){
    var piece_move = isMovable(this);
    if(piece_move[0]){
        console.log(this.getAttribute("id"));
        id = piece_move[1];
        switch1(this,parseInt(id[0]),parseInt(id[2]));
        idInitialize(this,id);
        console.log(this.getAttribute("id"));
    }
}




for(let y = 7 ; y>=0 ; y--){
    let gameRows = document.createElement('div'); 
      gameRows.id =  y;
      document.getElementById('gameBoard').appendChild (gameRows)
        
    for(let x=0; x<8 ; x++){
        let gameColumn = document.createElement('h1');
             gameColumn.id =  x.toString() + y.toString(); 
             gameColumn.innerHTML = gameColumn.id;
             gameColumn.style.color = 'lime';
             gameColumn.addEventListener('click',selectedElement);
             document.getElementById(y).appendChild (gameColumn);
    }
}


let promotionRows = document.createElement('div'); 
    promotionRows.id =  'promotionRow';
    document.getElementById('gameBoard').appendChild (promotionRows)


    for(let x=0; x<4 ; x++){
        let promotionBox = document.createElement('h1');
            promotionBox.id =  x.toString() + 'promotionRow'; 
            promotionBox.style.border = '5px' ;
            promotionBox.addEventListener('click',promotionElements);
             document.getElementById('promotionRow').appendChild (promotionBox);
    }

let gameRows = document.createElement('div'); 
    gameRows.id =  'loosersRow';
    document.getElementById('gameBoard').appendChild (gameRows)

function appendLostPiece(name){
let LooserRow = document.createElement('h1'); 
    LooserRow.id =  name;
    LooserRow.style.border = '5px' ;
    document.getElementById('loosersRow').appendChild (LooserRow);
}





function updateBoard(){
for(let x = 0 ; x<8 ; x++){
    for(let y=0; y<8 ; y++){
      if ((x % 2 == 0 && y % 2 == 0) || (x % 2 !== 0 && y % 2 !== 0)){
        document.getElementById( x.toString() + y.toString()).style.backgroundColor  = 'grey';
        } else {
        document.getElementById(x.toString() + y.toString()).style.backgroundColor  = 'white';
        };
        document.getElementById(x.toString() + y.toString()).style.backgroundImage  = null;
    }
 
    blackPieces.printList();
    whitePieces.printList();
}
}



////////////////


class piece  {
    constructor (locationX,locationY,color,piece){
        this.locationX = locationX;
        this.locationY = locationY;
        this.location = locationX.toString() + locationY.toString();
        this.color = color;
        this.piece = piece;
        this.name = locationX + locationY + color + piece;
        this.image = `url(pieceImages/${piece}-${color}.svg)`
        this.next = null;
    }
}


class LinkedList {
    constructor(){
        this.head = null;
    }

    appendNode(newNode){
        let node =  this.head;
        if(node ==null){
            this.head = newNode;
            return;
        }
        while(node.next){
            node=node.next;
        }
        node.next = newNode;
    }

    printList(){
        let node = this.head;

        while(node !==null){
        document.getElementById(node.location).style.backgroundImage  = node.image;
        node = node.next;
        }
    }

    deleteList(){
        let node = this.head;

        while(node !==null){
        document.getElementById(node.location).style.backgroundImage  = null;
        node = node.next;
        }
    }


    isThereAPieceHere(location){
        let node = this.head;
        let selected = false;

        while(node !==null){
        if(location==node.location){
            selected = true;
            pieceAtLocation = node.piece;
            pieceNameAtLocation = node.name;
        }
        node = node.next;
        }
        return selected;
    }

    whichPieceSelected(location){
        let node = this.head;
        let selected = false;

        while(node !==null){
        if(location==node.location){
            selected = true;
            selectedPiece = node.piece;
            selectedPieceName = node.name;
            selectedPieceLocation = node.location;
        }
        node = node.next;
        }
        return selected;
    }


    attackEachPiece (){
        let node = this.head;

        while(node !==null){
            selectedPiece = node.piece;
            selectedPieceName = node.name;
            selectedPieceLocation = node.location;
            generateAllPossibleMoves();
            node = node.next;
        }

        if (node ===  null){
            selectedPiece = '';
            selectedPieceName = '';
            selectedPieceLocation = '';
        }
    }



    changePieceLocation(name,location){
        let node = this.head;

        while(node !==null){
        if(name==node.name){
            node.location = location;
        }
        node = node.next;
        }
    }

    changePiece(name,piece){
        let node = this.head;

        while(node !==null){
        if(name==node.name){
            node.piece = piece;
            node.image = `url(pieceImages/${node.piece}-${node.color}.svg)`
        }
        node = node.next;
        }
    }
}


let whitePieces = new LinkedList();
let blackPieces = new LinkedList();


for(let x = 0; x<8; x++){
let pieceSetUp = ['rook','knight','bishop','queen','king','bishop','knight','rook'];

    whitePieces.appendNode(new piece(x,0,'w', pieceSetUp[x]))
    whitePieces.appendNode(new piece(x,1,'w', 'pawn'))
    blackPieces.appendNode(new piece(x,7,'b', pieceSetUp[x]))
    blackPieces.appendNode(new piece(x,6,'b', 'pawn'))
}



let blackPromotions = new LinkedList();
let whitePromotions = new LinkedList();


for(let x = 0; x<4; x++){
let pieceSetUp = ['rook','knight','bishop','queen'];

whitePromotions.appendNode(new piece(x,'promotionRow','w', pieceSetUp[x]))
blackPromotions.appendNode(new piece(x,'promotionRow','b', pieceSetUp[x]))
}




/////////////////////////////////////////////////////////////////////

updateBoard();


/////////////////////////////////////////////////////////////////////



let currentTurnPieces = whitePieces;
let opponetTurnPieces = blackPieces;

function updateWhosTurn(){
    document.getElementById('turn').innerHTML  = `Whos Turn : ${currentTurnPieces.head.color == 'w' ? 'white': 'black'}`;
}

function toggleTurn() {
    opponetTurnPieces == blackPieces ? opponetTurnPieces = whitePieces : opponetTurnPieces = blackPieces;
    currentTurnPieces == blackPieces ? currentTurnPieces = whitePieces : currentTurnPieces = blackPieces;
    updateWhosTurn();
}






/////////////////////////////////////////////////////////////////////



let pieceAtLocation = '';
let pieceNameAtLocation = '';

let selectedPiece = '';
let selectedPieceLocation = '';
let selectedPieceName = '';


function promotionElements(){

    currentTurnPieces == whitePieces ? whitePromotions.whichPieceSelected(event.target.id) : blackPromotions.whichPieceSelected(event.target.id) ;
        movePiece(event.target.id);
}

function selectedElement () {

    if (currentTurnPieces.whichPieceSelected(event.target.id)){
        updateBoard();

        switch(selectedPiece){
            case 'pawn':
                checkPawnMove();
                break;
            case 'rook':
                checkRookMove();
                break;
            case 'knight':
                checkKnightMove();
                break;
            case 'bishop':
                checkBishopMove();
                break;
            case 'queen':
                checkQueenMove();
                break;
            case 'king':
                checkKingMove();
                break;
            default:
                break;
        }

    } else if (selectedPiece !==''){
        movePiece(event.target.id);
    }
}



let movesPlayed = [];
let enPassant = "";

let check = false;

let amIPromoting = [false];

   


function movePiece(targetLocation){

    if ( event.target.style.backgroundColor  === 'red'){
        //moves the piece
        currentTurnPieces.changePieceLocation(selectedPieceName,targetLocation);
        

         //record the move to the moves made array
         movesPlayed.push([selectedPiece,selectedPieceName,selectedPieceLocation,targetLocation]);
       

        //check for en passant move
        if (enPassant == targetLocation && selectedPiece== 'pawn'){ 
            currentTurnPieces === whitePieces ? targetLocation = Number(targetLocation) -1 : targetLocation = Number(targetLocation) +1 ;
        }


        //check for promtion
        if ((targetLocation[1] == 7 || targetLocation[1] == 0 )&& selectedPiece== 'pawn'){
            currentTurnPieces=== whitePieces ? whitePromotions.printList() : blackPromotions.printList();
            amIPromoting[0] = true;
            amIPromoting.push(selectedPieceName);
            promotionBackGoundColor();
        }

        //removes taken piece
        if(opponetTurnPieces.isThereAPieceHere(targetLocation)){ removeIfPieceTaken(targetLocation); } ;

     
       
        
        if(check){
            toggleTurn();
            currentTurnPieces.attackEachPiece()
            if (check){
                undo();
            } 
            
            updateBoard();

            toggleTurn();
        } 
        


      if(!amIPromoting[0]){  
        //change turn
     //   currentTurnPieces.attackEachPiece()
        toggleTurn(); }

        
    }


    //check for promtion
    if(amIPromoting[0]  && selectedPieceName !== amIPromoting[1] ){
        currentTurnPieces.changePiece(amIPromoting[1], selectedPiece)

        movesPlayed[movesPlayed.length-1][4] = ('promotion');
        amIPromoting[0] = false
        amIPromoting.pop();
        promotionBackGoundColor();
        whitePromotions.deleteList();
        //change turn
     //   currentTurnPieces.attackEachPiece()
        toggleTurn();
    }
 
    selectedPiece = '';
    selectedPieceLocation = '';
    selectedPieceName = '';


  //  if (check){document.getElementById('test').innerHTML = 'check'} else {document.getElementById('test').innerHTML = 'NOT check' };

    updateBoard();
    document.getElementById('test').innerHTML= movesPlayed;

    function removeIfPieceTaken(){
            appendLostPiece(pieceNameAtLocation);
            opponetTurnPieces.changePieceLocation(pieceNameAtLocation,pieceNameAtLocation);

            movesPlayed[movesPlayed.length-1].push('taken', pieceNameAtLocation);
    }

    function promotionBackGoundColor(){
        let color = 'gold';
        amIPromoting[0] ? color = 'gold' : color = '';
        for(let i = 0 ; i<4 ; i ++){
            document.getElementById(i+'promotionRow').style.backgroundColor = color;
        }
    }
}

/*

function amIinCheck(){

    let  currentTurnKingLocation = opponetTurnPieces.head.next.next.next.next.next.next.next.next.location;
   // document.getElementById('test').innerHTML = currentTurnKingLocation;
     if (document.getElementById(currentTurnKingLocation).style.backgroundColor === 'red'){
        check = true ;
     } else { check = false}

}


function generateAllPossibleMoves(){


    switch(selectedPiece){
        case 'pawn':
            checkPawnMove();
            break;
        case 'rook':
            checkRookMove();
            break;
        case 'knight':
            checkKnightMove();
            break;
        case 'bishop':
            checkBishopMove();
            break;
        case 'queen':
            checkQueenMove();
            break;
        case 'king':
            checkKingMove();
            break;
        default:
            break;
    }
    

    amIinCheck();
    }
    

*/


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



 /// check availible moves for each piece //////////////////////////////////////////////////////////

//takes an array of points [x,y] relative to the selected piece and makes the background red
function generatePossibleMoves(testPoints){
    let arrayGraphPoints = [];

    //takes a point [x,y] and returns a string x,y pushed into the arrayGraphPoints ////// point is describedd with the selected piece at [0,0]
    function isPointOnTheBoard(increment){

        let x =  Number(selectedPieceLocation[0]) +increment[0];
        let y =   Number(selectedPieceLocation[1]) +increment[1];

        if (x>=0 && x<8 && y>=0 && y<8){ arrayGraphPoints.push( x.toString() + y.toString());} 
    }

    testPoints.forEach((x) => isPointOnTheBoard(x));
    arrayGraphPoints.forEach(x => { currentTurnPieces.isThereAPieceHere(x) ? null : document.getElementById(x).style.backgroundColor = 'red';});
}


function  checkKingMove() {
    let testPoints= [[0,1],[0,-1],[1,0],[1,1],[1,-1],[-1,0],[-1,-1],[-1,1]]  
    generatePossibleMoves(testPoints);
}


function checkKnightMove(){
    let testPoints= [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[-1,2],[1,-2],[-1,-2]]
    generatePossibleMoves(testPoints);
}




function testCordinate (XorYorincrement,increment){
    
    let testlocation = '';

    if (XorYorincrement === 'x'){
        testlocation = (testX+increment) + testY.toString();
    } else if(XorYorincrement === 'y') {
        testlocation = testX.toString() + (testY+increment);
    } else {
        testlocation = (testX+XorYorincrement).toString() + (testY+increment).toString();
    };

    if (!currentTurnPieces.isThereAPieceHere(testlocation)){
        document.getElementById(testlocation).style.backgroundColor = 'red';
    } else { return 'stop'} 

    if( opponetTurnPieces.isThereAPieceHere(testlocation) ){ 
        document.getElementById(testlocation).style.backgroundColor = 'red';
        return 'stop'
        };
} 



function checkRookMove() {      

    let up = true;
    let down = true;
    let left = true;
    let right = true;

     testX =  Number(selectedPieceLocation[0])
     testY =  Number(selectedPieceLocation[1])
        
    for(let increment = 1; increment<8 ;increment++){
        if(testX+increment<8 && right){  testCordinate('x', increment) === 'stop' ? right = false : null ;};
        if(testX-increment>=0 && left){  testCordinate('x',-increment) === 'stop' ? left  = false : null ;};
        if(testY+increment<8 &&    up){  testCordinate('y', increment) === 'stop' ? up    = false : null ;};
        if(testY-increment>=0 && down){  testCordinate('y', -increment) === 'stop' ? down  = false : null ;};
    }
}




function checkBishopMove() {
    let rightUp = true;
    let leftDown = true;
    let rightDown = true;
    let leftUp = true;

     testX =  Number(selectedPieceLocation[0])
     testY =  Number(selectedPieceLocation[1])

    for(let increment = 1; increment<8 ;increment++){
        if(testX+increment<8 && testY+increment<8 && rightUp    ){testCordinate(increment, increment)  === 'stop' ? rightUp   = false : null ;}
        if(testX-increment>=0 && testY-increment>=0 && leftDown ){testCordinate(-increment, -increment)=== 'stop' ? leftDown  = false : null ;}
        if(testX+increment<8 &&  testY-increment>=0 && rightDown){testCordinate(increment, -increment) === 'stop' ? rightDown = false : null ;}
        if(testX-increment>=0 && testY+increment<8 && leftUp    ){testCordinate(-increment, increment) === 'stop' ? leftUp    = false : null ;}
    }
}

function checkQueenMove(){
    checkBishopMove();
    checkRookMove();
}



function  checkPawnMove() {
    let x = Number(selectedPieceLocation[0])
    let y = Number(selectedPieceLocation[1])
    let increment = 1;

   currentTurnPieces === whitePieces ? increment = 1 : increment = -1;

    if( !currentTurnPieces.isThereAPieceHere("" + x + (y+increment)) && !opponetTurnPieces.isThereAPieceHere("" + x + (y+increment))){
        document.getElementById("" + x + (y+increment)).style.backgroundColor = 'red';

        if (y ==1 && currentTurnPieces == whitePieces || y==6 && currentTurnPieces == blackPieces){
            if( !currentTurnPieces.isThereAPieceHere("" + x + (y+increment+increment)) && !opponetTurnPieces.isThereAPieceHere("" + x + (y+increment+increment))){
                document.getElementById("" + x + (y+increment+increment)).style.backgroundColor = 'red';
            }
        }
    } 

    

    if(opponetTurnPieces.isThereAPieceHere(""+(x + 1) + (y + increment))){
        document.getElementById(""+(x + 1) + (y + increment)).style.backgroundColor = 'red';
    }

    if(opponetTurnPieces.isThereAPieceHere(""+(x - 1) + (y + increment))){
        document.getElementById(""+(x - 1) + (y + increment)).style.backgroundColor = 'red';
    }

   ///code for making en passant an availible move
    if (movesPlayed[movesPlayed.length-1][0] === 'pawn' && (Number(movesPlayed[movesPlayed.length-1][3]) - Number(movesPlayed[movesPlayed.length-1][2]))=== (increment * -2)){
       
        if (selectedPieceLocation == (Number(movesPlayed[movesPlayed.length-1][3]) + 10)) {
            document.getElementById(""+(x - 1) + (y + increment)).style.backgroundColor = 'red';
            enPassant = ""+(x - 1) + (y + increment);
        }

        if (selectedPieceLocation == (Number(movesPlayed[movesPlayed.length-1][3]) - 10)) {
            document.getElementById(""+(x + 1) + (y + increment)).style.backgroundColor = 'red';
            enPassant= ""+(x + 1) + (y + increment);
        }
    }
}





//////// testing pices ///////////////
/*
whitePieces.appendNode(new piece(3,3,'w','king'));
blackPieces.appendNode(new piece(3,2,'b','king'));


whitePieces.appendNode(new piece(1,2,'w','rook'));

whitePieces.appendNode(new piece(6,2,'w','bishop'));
blackPieces.appendNode(new piece(2,3,'b','bishop'));

updateBoard();
*/






//currentTurnPieces.testEachPiece();




function undo() {
    let previousMove = movesPlayed[movesPlayed.length -1]

    opponetTurnPieces.changePieceLocation(previousMove[1],previousMove[2])

    if (previousMove[4] === 'taken'){ 
        currentTurnPieces.changePieceLocation(previousMove[5],previousMove[3])
        document.getElementById(previousMove[5]).parentNode.removeChild(document.getElementById(previousMove[5]));
    }

    if (previousMove[4] === 'promotion'){ 
        opponetTurnPieces.changePiece(previousMove[1],previousMove[0])
    } 

    if ( previousMove[4] === 'promotion'  && previousMove.length === 6){ 
        currentTurnPieces.changePieceLocation(previousMove[5],previousMove[3])
        document.getElementById(previousMove[5]).parentNode.removeChild(document.getElementById(previousMove[5]));
    }

    movesPlayed.pop();

    document.getElementById('test').innerHTML= movesPlayed;

    updateBoard();
    toggleTurn();
}

function restart (){
    while(movesPlayed.length>0){
        undo();
    }
}
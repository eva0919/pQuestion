var boardWidth = 50,
	boardHight = 50,
	circleArray = new Array(25),
	c_canvas,
	canvasContext;

function Cell(row, column) {
    this.row = row;
    this.column = column;
}
function drawBoard(){
	canvasContext.clearRect(0, 0, 251, 251);

    canvasContext.beginPath();

	for (var x = 0.5; x < 300; x += boardWidth) {
	  canvasContext.moveTo(x, 0);
	  canvasContext.lineTo(x, 250);
	}
	for (var y = 0.5; y < 300; y += boardHight) {
	  canvasContext.moveTo(0, y);
	  canvasContext.lineTo(250, y);
	}
	canvasContext.strokeStyle = "#000";
	canvasContext.stroke();	
	canvasContext.closePath();
	drawCircle();
	if(finish(circleArray)){
		endGame();
	}
}
function drawCircle(){
	var row,column,x,y,radius;
	
	for(var i = 0 ; i < 25 ; i +=1){
		if(circleArray[i]){
			row = Math.floor(i/5);
			column = i % 5;
			x = column * boardWidth + boardWidth/2;
			y = row * boardHight + boardHight/2;
			radius = (boardWidth/2) - (boardWidth/10);
			canvasContext.beginPath();
			canvasContext.arc(x, y, radius, 0, Math.PI*2, false);
			canvasContext.closePath();
			canvasContext.strokeStyle = "#eee";
			canvasContext.fillStyle = "#FFFF77"
			canvasContext.stroke();	
			canvasContext.fill();			
		}
	}
	
}
function lighting(cell){
	// clicked cell turn off or on
	var flag = cell.row*5 + cell.column;
	circleArray[flag] =  !circleArray[flag];
	// Up cell
	if (cell.row - 1 >= 0){
		flag = (cell.row-1)*5 + cell.column;
		circleArray[flag] =  !circleArray[flag];
	}
	// Bottom cell
	if (cell.row + 1 <= 4){
		flag = (cell.row+1)*5 + cell.column;
		circleArray[flag] =  !circleArray[flag];
	}
	// Left cell
	if (cell.column - 1 >= 0){
		flag = cell.row*5 + ( cell.column-1);
		circleArray[flag] =  !circleArray[flag];
	}
	// Right cell
	if (cell.column + 1 <= 4){
		flag = cell.row*5 + ( cell.column+1);
		circleArray[flag] =  !circleArray[flag];
	}

}
function handleClick(e){
	var cell = getCursorPosition(e);
	// var flag = cell.row*5 + cell.column;
	lighting(cell);
	render();
}

function getCursorPosition(e) {
    /* returns Cell with .row and .column properties */
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
		x = e.pageX;
		y = e.pageY;
    }
    else {
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= c_canvas.offsetLeft;
    y -= c_canvas.offsetTop;
    x = Math.min(x, 249);
    y = Math.min(y, 249);
    var cell = new Cell(Math.floor(y/boardHight), Math.floor(x/boardWidth));
    return cell;
}
function finish(arr){
	l = arr.length;
	end = true;
	for(var i = 0 ; i < l ; i +=1){
		end = end && arr[i];
	}
	return end;
}
function render(){
	drawBoard();
	drawCircle();
}
function endGame(){
	// canvasContext.clearRect(0, 0, 251, 251);
	canvasContext.fillStyle = "#000"
	canvasContext.font = "bold 30px sans-serif";
	canvasContext.textAlign = "center";
	canvasContext.textBaseline = "bottom";
	canvasContext.fillText("You Win!!!", 125, 105);
	canvasContext.fillText("Congratulations.", 125, 140);
	c_canvas.removeEventListener("click",handleClick);
}
function newGame(){
	for(var i = 0 ; i < 25 ; i+=1){
		circleArray[i] = false;
	}
	c_canvas = document.getElementById("box");
	canvasContext = c_canvas.getContext("2d");
	c_canvas.addEventListener("click", handleClick, false);
	drawBoard();
}

newGame();


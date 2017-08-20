//Generate player board
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = []; //overall game board
  for (let rowIndex= 0; rowIndex < numberOfRows; rowIndex++) {
    let row = []; //single row added to game board
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
    row.push(' ');
    }
    board.push(row);
  }
  return(board);
};

//Generate bomb board
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
    let board = []; //overall bomb board
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = []; //single row added to bomb board
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(null);
      }
      board.push(row);
    }

   let numberOfBombsPlaced = 0; //bomb counter
   while (numberOfBombsPlaced < numberOfBombs) {
     let randomRowIndex = Math.floor((Math.random() * numberOfRows));
     let randomColumnIndex = Math.floor((Math.random() * numberOfColumns));
       if(board[randomRowIndex][randomColumnIndex] !== 'B') {
         board[randomRowIndex][randomColumnIndex] = 'B';
         numberOfBombsPlaced++;
       }
   }
    return(board);
  };

//determine number of adjacent bombs
  const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
    const neighborOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    const numberOfRows = bombBoard.length;
    //not sure of line below see instruction 11
    const numberOfColumns = bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <numberOfColumns) {
        //last(second) array item below may not be correct instruction 20
        if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });
    //code below possibly in wrong location see instructions from elise for number 22
    return(numberOfBombs);
    //could be wrong location see 23
  };

  //user flips tile
    const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
      if(playerBoard[rowIndex][columnIndex] != ' ') {
        console.log('This tile has already been flipped!');
        return;
      } else if (bombBoard[rowIndex][columnIndex] === 'B') {
         playerBoard[rowIndex][columnIndex] = 'B';
       } else {
         playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
       }
     };

//format game
  const printBoard = board => {
    //NOT SURE THE BELOW CODE IS RIGHT
    console.log(board.map(row => row.join(' | ')).join('\n'));
  };

  //test functions
 let playerBoard = generatePlayerBoard(3, 4);

 let bombBoard = generateBombBoard (3, 4, 5);
 console.log('Player Board: ');
 printBoard(playerBoard);

 console.log('Bomb Board: ');
 printBoard(bombBoard);

 flipTile(playerBoard, bombBoard, 0, 0);
 console.log('Updated Player Board: ');
 printBoard(playerBoard);

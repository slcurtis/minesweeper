const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for (let rowIndex= 0; rowIndex < numberOfRows; rowIndex++) {
    let row = [];
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
    row.push(' ');
    }
    board.push(row);
  }
  return(board);
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(null);
      }
      board.push(row);
    }
   let numberOfBombsPlaced = 0;
   while (numberOfBombsPlaced < numberOfBombs) {
     let randomRowIndex = Math.floor((Math.random() * numberOfRows));
     let randomColumnIndex = Math.floor((Math.random() * numberOfColumns));
     board[randomRowIndex][randomColumnIndex] = 'B';
     numberOfBombsPlaced++;
     //Code in while loop has potential to place bombs on bombs - fix this
   }
    return(board);
  };
  const printBoard = board => {
    //NOT SURE THE BELOW CODE IS RIGHT
    console.log(board.map(row => row.join(' | ')).join('\n'));
  };
 let playerBoard = generatePlayerBoard(3, 4);
 let bombBoard = generateBombBoard (3, 4, 5);
 console.log('Player Board: ');
 printBoard(playerBoard);
 console.log('Bomb Board: ');
 printBoard(bombBoard);

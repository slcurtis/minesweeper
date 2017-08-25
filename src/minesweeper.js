class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  //add playMove method
   playMove(rowIndex, columnIndex) {
     this._board.flipTile(rowIndex, columnIndex);
     if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
       console.log('Bomb! Game Over!');
      this._board.print();
    } else if (!this._board.hasSafeTiles()) {
        console.log('You won!');
      this._board.print();
    } else {
      console.log('Current Board: ');
      this._board.print();
    }
   }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = (numberOfRows * numberOfColumns);
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard =  Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    //this._numberOfEmptySpaces = numberOfRows * numberOfColumns;
  }
  //add playerBoard() Getter Method
  get playerBoard() {
    return this._playerBoard;
  }
  //user flips tile
  flipTile(rowIndex, columnIndex) {
      if(this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
         this._playerBoard[rowIndex][columnIndex] = 'B';
       } else {
         this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
       }

       //decrease the instance property by 1
       this._numberOfTiles--;
     }

//update getNumberOfNeighborBombs()
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
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

    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });
    return(numberOfBombs);
    }

  //check for safe tiles
    hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }

//update printBoard()
  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  };

  //add generatePlayerBoard & update .generatePlayerBoard
  static generatePlayerBoard (numberOfRows, numberOfColumns) {
    let board = []; //overall game board
    for (let rowIndex= 0; rowIndex < numberOfRows; rowIndex++) {
      let row = []; //single row added to game board
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' ');
      }
     board.push(row);
    }
    return board;
  }

  // add & update generateBombBoard
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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
    }
 }

  //test functions
 /*let playerBoard = generatePlayerBoard(3, 4);

 let bombBoard = generateBombBoard (3, 4, 5);
 console.log('Player Board: ');
 printBoard(playerBoard);

 console.log('Bomb Board: ');
 printBoard(bombBoard);*/

 /*flipTile(playerBoard, bombBoard, 0, 0);
 console.log('Updated Player Board: ');
 printBoard(playerBoard);*/
 const g = new Game(3, 3, 9);
 g.playMove(0, 0);

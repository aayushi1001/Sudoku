import React, { Component } from "react";
import generator from "sudoku";
import './App.css';
import SudokuBoard from "./components/SudokuBoard"

window.generator = generator;

/*
creating the matrix for sudoku
some of the values would be read only (that cannot be changed)
Others would be null for the user to enter
 */

function generateSudoku(){
  const raw = generator.makepuzzle();
  const result = { rows: [] };

  for(let i=0;i<9;++i){
    const row = {cols: [] , index:i};
    for(let j=0;j<9;++j){
      const value = raw[i*9+j]     /* you would actually get the value of a particular cell that is assigned to you by this function make.puzzel() */
      const col = {
        row:i,
        col:j,
        value:value,
        readonly: value !== null
      };
      row.cols.push(col);
    }
    result.rows.push(row);
  }
return result;
}

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      sudoku: generateSudoku()
    }
  }
  render() {
    return(
    <div className="App">
      <header className="App-header">
        <h1>Sudoku</h1>
      </header>
      <SudokuBoard sudoku={this.state.sudoku}/>
    </div>
    )
  }
}

export default App;

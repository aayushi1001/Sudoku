import React, { Component } from "react";
import generator from "sudoku";
import './App.css';
import SudokuBoard from "./components/SudokuBoard"
import produce from "immer";


/*
creating the matrix for sudoku
some of the values would be read only (that cannot be changed)
Others would be null for the user to enter
 */

function generateSudoku(){
  const raw = generator.makepuzzle();
  const rawSolution = generator.solvepuzzle(raw);

  const formatted = raw.map(e => (e === null ? null : e + 1 ));
  const formattedSolution = rawSolution.map(e => e + 1);

  const result = { 
    rows: [], 
    solution:formattedSolution,
    startTime: new Date(),
    solvedTime : null
  };

  for(let i=0;i<9;++i){
    const row = {cols: [] , index:i};
    for(let j=0;j<9;++j){
      const value = raw[i*9+j]    /* you would actually get the value of a particular cell that is assigned to you by this function make.puzzel() */
      const col = {
        row:i,
        col:j,
        value:value === null? null : value+1,
        readonly: value !== null
      };
      row.cols.push(col);
    }
    result.rows.push(row);
  }
return result;
}


function checkSolution(sudoku){
  const candidate = sudoku.rows.map((row) => row.cols.map((col) => col.value)).flat()

  for(let i=0;i<candidate.length;++i){
    if(candidate[i] === null || candidate[i] !== sudoku.solution[i]){
      return false;
    }
  }
  return true;
}

class App extends Component {

  constructor(props){
    super(props);
    this.state = produce({},() =>({             /* using immer makes this state immutable here */
        sudoku: generateSudoku()
    }));
  }

  handleChange = e => {
    this.setState(
      produce(state => {
      state.sudoku.rows[e.row].cols[e.col].value = e.value; 
      if(!state.sudoku.solvedTime){
        const solved = checkSolution(state.sudoku) 
        if(solved){
          state.sudoku.solvedTime = new Date();  
        }
      }
    })
    );
  }

 
  solveSudoku = e => {
    this.setState(
      produce(state => {
        state.sudoku.rows.forEach(row => 
          row.cols.forEach(col => {
            col.value = state.sudoku.solution[col.row * 9 + col.col];
        })    
        );
      })
    );
  };

  render() {
    return(
    <div className="App">
      <header className="App-header">
        <h3>Here's Your Sudoku Challenge!!</h3>
      </header>
      <SudokuBoard sudoku={this.state.sudoku} onChange={this.handleChange} />
      <button className = "ans" onClick = {this.solveSudoku}>Can't Solve? Get the ans.</button>
    </div>
    )
  }
}

export default App;


import { useState } from 'react';
import './App.css';

function App() {

  const [grid, setgrid] = useState([
    [4,3,1,5,9,8],
    [2,3,0,4,8,7],
    [1,2,0,5,9,7],
  ]);


  const [isRevealed, setIsRevealed] = useState( new Array(grid.length).fill('').map(() => new Array(grid[0].length).fill(false)));
  console.log(isRevealed)


  const [firstClick, setfirstClick] = useState(false);
  const [secondClick, setsecondClick] = useState(false);
  const [prevrow, setprevrow] = useState(0);
  const [precol, setprevcol] = useState(0);


  const handleCardClicked = (rowIndex,colIndex)=>{
    
    const tempGrid = [...isRevealed]
    
    if(!firstClick){
      
      setprevrow(rowIndex)
      setprevcol(colIndex)
      setfirstClick(true)
      tempGrid[rowIndex][colIndex] = true;
      setIsRevealed([...tempGrid])
    }
    else{
      setsecondClick(true)
      tempGrid[rowIndex][colIndex] = true;
      setIsRevealed([...tempGrid])
      if(grid[prevrow][precol] !== grid[rowIndex][colIndex]){
        setTimeout(() => {
          tempGrid[rowIndex][colIndex] =false
          tempGrid[prevrow][precol] =false
          setIsRevealed([...tempGrid])
          setfirstClick(false)
        setsecondClick(false)
        }, 1000);
      }else{
        setfirstClick(false)
        setsecondClick(false)
        setIsRevealed([...tempGrid])
      }
    }if(isRevealed.flat().every((Revealed) => Revealed)){
      alert("Winner")
    }
  }

  return (
    <>
    <div className="App">
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
        {row.map((number, colIndex) => (
          <div onClick={() => handleCardClicked(rowIndex, colIndex)} key={colIndex}
            className={"card " + (isRevealed[rowIndex][colIndex] ? "revealed" : " ")}>{isRevealed[rowIndex][colIndex] ? number : " "}</div>
        ))}
        </div>
      ))}
      </div>
    </div>
    </>
  );
}

export default App;

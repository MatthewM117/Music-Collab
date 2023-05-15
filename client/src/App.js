import './App.css';
import './styles.css';
import io from 'socket.io-client';
import {useEffect, useState, useRef} from 'react';

const socket = io.connect("http://localhost:3001")

function App() {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  const [gridData, setGridData] = useState(Array.from({ length: 88 }, () => Array.from({ length: 100 }, () => "")));
  const [isBarMoving, setBarMoving] = useState(false);
  const [bpm, setBpm] = useState(120);
  const beatsPerMeasure = 4; // Number of beats required to traverse 4 cells
  const secondsPerBeat = 60 / bpm;
  const cellSize = 2000;
  const animationDuration = (beatsPerMeasure * secondsPerBeat * 1000 * cellSize) / 100;
  let animationFrameId = useRef(null);
  let debounce = useRef(false);
  let prevCell = useRef(null);

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
    }
  };

  const sendMessage = () => {
    socket.emit('send_message', {message, room})
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message);
    });

    socket.on('receive_bpm', (data) => {
      setBpm(data.newBpm);
    })
  }, [socket]);

  useEffect(() => {
    socket.on('receive_grid', (data) => {
      const newGrid = [...gridData];

      newGrid[data.rowIndex][data.cellIndex] = data.value;
      
      setGridData(newGrid);
    });
  }, [gridData, socket]);

  function handleClick(event, rowIndex, cellIndex) {
    
    event.preventDefault(); // prevent the default right-click actions

    const newGridData = [...gridData];

    // left click
    if (event.button === 0) {
      switch (rowIndex) {
        case 0:
          newGridData[rowIndex][cellIndex] = 'C8';
          break;
        case 1:
          newGridData[rowIndex][cellIndex] = 'B8';
          break;
        case 2:
          newGridData[rowIndex][cellIndex] = 'A#/Bb8';
          break;
        case 3:
          newGridData[rowIndex][cellIndex] = 'A8';
          break;
        case 4:
          newGridData[rowIndex][cellIndex] = 'G#/Ab8';
          break;
        case 5:
          newGridData[rowIndex][cellIndex] = 'G8';
          break;
        case 6:
          newGridData[rowIndex][cellIndex] = 'F#/Gb8';
          break;
        case 7:
          newGridData[rowIndex][cellIndex] = 'F8';
          break;
        case 8:
          newGridData[rowIndex][cellIndex] = 'E8';
          break;
        case 9:
          newGridData[rowIndex][cellIndex] = 'D#/Eb8';
          break;
        case 10:
          newGridData[rowIndex][cellIndex] = 'D8';
          break;
        case 11:
          newGridData[rowIndex][cellIndex] = 'C#/Db8';
          break;
        case 12:
          newGridData[rowIndex][cellIndex] = 'C7';
          break;
        case 13:
          newGridData[rowIndex][cellIndex] = 'B7';
          break;
        case 14:
          newGridData[rowIndex][cellIndex] = 'A#/Bb7';
          break;
        case 15:
          newGridData[rowIndex][cellIndex] = 'A7';
          break;
        case 16:
          newGridData[rowIndex][cellIndex] = 'G#/Ab7';
          break;
        case 17:
          newGridData[rowIndex][cellIndex] = 'G7';
          break;
        case 18:
          newGridData[rowIndex][cellIndex] = 'F#/Gb7';
          break;
        case 19:
          newGridData[rowIndex][cellIndex] = 'F7';
          break;
        case 20:
          newGridData[rowIndex][cellIndex] = 'E7';
          break;
        case 21:
          newGridData[rowIndex][cellIndex] = 'D#/Eb7';
          break;
        case 22:
          newGridData[rowIndex][cellIndex] = 'D7';
          break;
        case 23:
          newGridData[rowIndex][cellIndex] = 'C#/Db7';
          break;
        case 24:
          newGridData[rowIndex][cellIndex] = 'C6';
          break;
        case 25:
          newGridData[rowIndex][cellIndex] = 'B6';
          break;
        case 26:
          newGridData[rowIndex][cellIndex] = 'A#/Bb6';
          break;
        case 27:
          newGridData[rowIndex][cellIndex] = 'A6';
          break;
        case 28:
          newGridData[rowIndex][cellIndex] = 'G#/Ab6';
          break;
        case 29:
          newGridData[rowIndex][cellIndex] = 'G6';
          break;
        case 30:
          newGridData[rowIndex][cellIndex] = 'F#/Gb6';
          break;
        case 31:
          newGridData[rowIndex][cellIndex] = 'F6';
          break;
        case 32:
          newGridData[rowIndex][cellIndex] = 'E6';
          break;
        case 33:
          newGridData[rowIndex][cellIndex] = 'D#/Eb6';
          break;
        case 34:
          newGridData[rowIndex][cellIndex] = 'D6';
          break;
        case 35:
          newGridData[rowIndex][cellIndex] = 'C#/Db6';
          break;
        case 36:
          newGridData[rowIndex][cellIndex] = 'C5';
          break;
        case 37:
          newGridData[rowIndex][cellIndex] = 'B5';
          break;
        case 38:
          newGridData[rowIndex][cellIndex] = 'A#/Bb5';
          break;
        case 39:
          newGridData[rowIndex][cellIndex] = 'A5';
          break;
        case 40:
          newGridData[rowIndex][cellIndex] = 'G#/Ab5';
          break;
        case 41:
          newGridData[rowIndex][cellIndex] = 'G5';
          break;
        case 42:
          newGridData[rowIndex][cellIndex] = 'F#/Gb5';
          break;
        case 43:
          newGridData[rowIndex][cellIndex] = 'F5';
          break;
        case 44:
          newGridData[rowIndex][cellIndex] = 'E5';
          break;
        case 45:
          newGridData[rowIndex][cellIndex] = 'D#/Eb5';
          break;
        case 46:
          newGridData[rowIndex][cellIndex] = 'D5';
          break;
        case 47:
          newGridData[rowIndex][cellIndex] = 'C#/Db5';
          break;
        case 48:
          newGridData[rowIndex][cellIndex] = 'C4';
          break;
        case 49:
          newGridData[rowIndex][cellIndex] = 'B4';
          break;
        case 50:
          newGridData[rowIndex][cellIndex] = 'A#/Bb4';
          break;
        case 51:
          newGridData[rowIndex][cellIndex] = 'A4';
          break;
        case 52:
          newGridData[rowIndex][cellIndex] = 'G#/Ab4';
          break;
        case 53:
          newGridData[rowIndex][cellIndex] = 'G4';
          break;
        case 54:
          newGridData[rowIndex][cellIndex] = 'F#/Gb4';
          break;
        case 55:
          newGridData[rowIndex][cellIndex] = 'F4';
          break;
        case 56:
          newGridData[rowIndex][cellIndex] = 'E4';
          break;
        case 57:
          newGridData[rowIndex][cellIndex] = 'D#/Eb4';
          break;
        case 58:
          newGridData[rowIndex][cellIndex] = 'D4';
          break;
        case 59:
          newGridData[rowIndex][cellIndex] = 'C#/Db4';
          break;
        case 60:
          newGridData[rowIndex][cellIndex] = 'C3';
          break;
        case 61:
          newGridData[rowIndex][cellIndex] = 'B3';
          break;
        case 62:
          newGridData[rowIndex][cellIndex] = 'A#/Bb3';
          break;
        case 63:
          newGridData[rowIndex][cellIndex] = 'A3';
          break;
        case 64:
          newGridData[rowIndex][cellIndex] = 'G#/Ab3';
          break;
        case 65:
          newGridData[rowIndex][cellIndex] = 'G3';
          break;
        case 66:
          newGridData[rowIndex][cellIndex] = 'F#/Gb3';
          break;
        case 67:
          newGridData[rowIndex][cellIndex] = 'F3';
          break;
        case 68:
          newGridData[rowIndex][cellIndex] = 'E3';
          break;
        case 69:
          newGridData[rowIndex][cellIndex] = 'D#/Eb3';
          break;
        case 70:
          newGridData[rowIndex][cellIndex] = 'D3';
          break;
        case 71:
          newGridData[rowIndex][cellIndex] = 'C#/Db3';
          break;
        case 72:
          newGridData[rowIndex][cellIndex] = 'C2';
          break;
        case 73:
          newGridData[rowIndex][cellIndex] = 'B2';
          break;
        case 74:
          newGridData[rowIndex][cellIndex] = 'A#/Bb2';
          break;
        case 75:
          newGridData[rowIndex][cellIndex] = 'A2';
          break;
        case 76:
          newGridData[rowIndex][cellIndex] = 'G#/Ab2';
          break;
        case 77:
          newGridData[rowIndex][cellIndex] = 'G2';
          break;
        case 78:
          newGridData[rowIndex][cellIndex] = 'F#/Gb2';
          break;
        case 79:
          newGridData[rowIndex][cellIndex] = 'F2';
          break;
        case 80:
          newGridData[rowIndex][cellIndex] = 'E2';
          break;
        case 81:
          newGridData[rowIndex][cellIndex] = 'D#/Eb2';
          break;
        case 82:
          newGridData[rowIndex][cellIndex] = 'D2';
          break;
        case 83:
          newGridData[rowIndex][cellIndex] = 'C#/Db2';
          break;
        case 84:
          newGridData[rowIndex][cellIndex] = 'C1';
          break;
        case 85:
          newGridData[rowIndex][cellIndex] = 'B1';
          break;
        case 86:
          newGridData[rowIndex][cellIndex] = 'A#/Bb1';
          break;
        case 87:
          newGridData[rowIndex][cellIndex] = 'A1';
          break;
        default:
          newGridData[rowIndex][cellIndex] = '';
          break;
      }
    }
    // right click
    else if (event.button === 2) {
      newGridData[rowIndex][cellIndex] = '';
    }

    setGridData(newGridData);

    // send new grid data to other user's in the room
    const value = newGridData[rowIndex][cellIndex];
    socket.emit('update_grid', {rowIndex, cellIndex, value, room});
  }

  //const cellSize = 30; // in pixels
  //const numRows = Math.floor(window.innerHeight / cellSize);
  //const numCols = Math.floor(window.innerWidth / cellSize) + 100;
  const numCols = 100;
  /**
   * IMPORTANT NOTE:
   * to edit number of columns, make sure the numCols value is the same as the second length value
   * from where const gridData is set, and then edit the width of the grid div
   * 
   * to edit the number of rows, simply change the first length value where const gridData is declared
   */
  
  const barRef = useRef(null)

  function toggleBarAnimation() {
    setBarMoving((prevState) => !prevState);
  }

  useEffect(() => {
    if (isBarMoving) {
      barRef.current.style.animation = `moveBar ${animationDuration / 1000}s linear infinite`;
    } else {
      barRef.current.style.animation = '';
      cancelAnimationFrame(animationFrameId.current);
      debounce.current = false;
      prevCell.current = null;
    }
  }, [isBarMoving, animationDuration]);

  // keyboard input
  const handleKeyDown = (event) => {
    if (event.code === 'Space') {
      event.preventDefault();
      toggleBarAnimation();
    }
  };

  const handleAnimInputChange = (event) => {
    const newBpm = Number(event.target.value)
    setBpm(newBpm);

    // send new bpm value to other users in the room
    socket.emit('update_bpm', {newBpm, room})
  }

  const checkCellBackgroundColor = () => {
    const barPosition = barRef.current.getBoundingClientRect();
    //const cells = document.getElementsByClassName('cell--active');
    const cells = document.querySelectorAll('.cell--active');
    cells.forEach(cell => {
      const cellPosition = cell.getBoundingClientRect();
      if (
        barPosition.left <= cellPosition.right &&
        barPosition.right >= cellPosition.left &&
        barPosition.top <= cellPosition.bottom &&
        barPosition.bottom >= cellPosition.top
      ) {
        if (!debounce.current && cell !== prevCell.current) {
          debounce.current = true;
          prevCell.current = cell;
          console.log(cell.textContent);
          /*
          if (cell.textContent === 'C2') {
            console.log("playing c2");
          }*/
          
        }
      } else if (cell === prevCell.current) {
        debounce.current = false;
      }
    });

    if (isBarMoving) {
      animationFrameId.current = requestAnimationFrame(checkCellBackgroundColor);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // empty dependecy array in order to ensure this is only ran once

  useEffect(() => {
    if (isBarMoving) {
      animationFrameId.current = requestAnimationFrame(checkCellBackgroundColor);
    }
  }, [isBarMoving]);

  return (
    <div className="App">
      <input 
        placeholder='Room number...'
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room </button>
      <input placeholder="Send message..." onChange={(event) => {
        setMessage(event.target.value);
      }}/>
      <button onClick={sendMessage}>Send</button>
      <h1> Message: </h1>
      {messageReceived}

      <label htmlFor="bpmInput">BPM:</label>
      <input id="bpmInput" type="number" value={bpm} onChange={handleAnimInputChange} />

      <div className="grid-container">
        <div className="grid" style={{ height: "100vh", width: "500vw" }}>
        <div ref={barRef} className="bar"></div>
        {gridData.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from(row).slice(0, numCols).map((cell, cellIndex) => (
              <div
                key={`${rowIndex}-${cellIndex}`}
                className={`cell ${cell ? "cell--active" : ""} ${cellIndex % 4 === 3 ? "bold-column" : ""}`}
                //style={{ backgroundColor: cell.color }}
                onClick={(event) => handleClick(event, rowIndex, cellIndex)}
                onContextMenu={(event) => handleClick(event, rowIndex, cellIndex)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>

    </div>
  );
}

export default App;

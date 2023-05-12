import './App.css';
import './styles.css';
import io from 'socket.io-client';
import {useEffect, useState} from 'react';

const socket = io.connect("http://localhost:3001")

function App() {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  const [gridData, setGridData] = useState(Array.from({ length: 50 }, () => Array.from({ length: 100 }, () => "")));

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
  }, [socket]);

  useEffect(() => {
    socket.on('receive_grid', (data) => {
      const newGrid = [...gridData];
      if (data.value === '') {
        newGrid[data.rowIndex][data.cellIndex] = '';
      }
      else {
        newGrid[data.rowIndex][data.cellIndex] = 'X';
      }
      
      setGridData(newGrid);
    });
  }, [gridData, socket]);

  function handleClick(event, rowIndex, cellIndex) {
    
    event.preventDefault(); // prevent the default right-click actions

    const newGridData = [...gridData];

    // left click
    if (event.button === 0) {
      newGridData[rowIndex][cellIndex] = 'X';
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

      <div className="grid-container">
        <div className="grid" style={{ height: "100vh", width: "500vw" }}>
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

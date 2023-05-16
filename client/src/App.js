import './App.css';
import './styles.css';
import io from 'socket.io-client';
import React, {useEffect, useState, useRef} from 'react';
import A0 from './piano-notes/A0.mp3'
import A1 from './piano-notes/A1.mp3'
import A2 from './piano-notes/A2.mp3'
import A3 from './piano-notes/A3.mp3'
import A4 from './piano-notes/A4.mp3'
import A5 from './piano-notes/A5.mp3'
import A6 from './piano-notes/A6.mp3'
import A7 from './piano-notes/A7.mp3'
import Ab1 from './piano-notes/Ab1.mp3'
import Ab2 from './piano-notes/Ab2.mp3'
import Ab3 from './piano-notes/Ab3.mp3'
import Ab4 from './piano-notes/Ab4.mp3'
import Ab5 from './piano-notes/Ab5.mp3'
import Ab6 from './piano-notes/Ab6.mp3'
import Ab7 from './piano-notes/Ab7.mp3'
import B0 from './piano-notes/B0.mp3'
import B1 from './piano-notes/B1.mp3'
import B2 from './piano-notes/B2.mp3'
import B3 from './piano-notes/B3.mp3'
import B4 from './piano-notes/B4.mp3'
import B5 from './piano-notes/B5.mp3'
import B6 from './piano-notes/B6.mp3'
import B7 from './piano-notes/B7.mp3'
import Bb0 from './piano-notes/Bb0.mp3'
import Bb1 from './piano-notes/Bb1.mp3'
import Bb2 from './piano-notes/Bb2.mp3'
import Bb3 from './piano-notes/Bb3.mp3'
import Bb4 from './piano-notes/Bb4.mp3'
import Bb5 from './piano-notes/Bb5.mp3'
import Bb6 from './piano-notes/Bb6.mp3'
import Bb7 from './piano-notes/Bb7.mp3'
import C1 from './piano-notes/C1.mp3'
import C2 from './piano-notes/C2.mp3'
import C3 from './piano-notes/C3.mp3'
import C4 from './piano-notes/C4.mp3'
import C5 from './piano-notes/C5.mp3'
import C6 from './piano-notes/C6.mp3'
import C7 from './piano-notes/C7.mp3'
import C8 from './piano-notes/C8.mp3'
import D1 from './piano-notes/D1.mp3'
import D2 from './piano-notes/D2.mp3'
import D3 from './piano-notes/D3.mp3'
import D4 from './piano-notes/D4.mp3'
import D5 from './piano-notes/D5.mp3'
import D6 from './piano-notes/D6.mp3'
import D7 from './piano-notes/D7.mp3'
import Db1 from './piano-notes/Db1.mp3'
import Db2 from './piano-notes/Db2.mp3'
import Db3 from './piano-notes/Db3.mp3'
import Db4 from './piano-notes/Db4.mp3'
import Db5 from './piano-notes/Db5.mp3'
import Db6 from './piano-notes/Db6.mp3'
import Db7 from './piano-notes/Db7.mp3'
import E1 from './piano-notes/E1.mp3'
import E2 from './piano-notes/E2.mp3'
import E3 from './piano-notes/E3.mp3'
import E4 from './piano-notes/E4.mp3'
import E5 from './piano-notes/E5.mp3'
import E6 from './piano-notes/E6.mp3'
import E7 from './piano-notes/E7.mp3'
import Eb1 from './piano-notes/Eb1.mp3'
import Eb2 from './piano-notes/Eb2.mp3'
import Eb3 from './piano-notes/Eb3.mp3'
import Eb4 from './piano-notes/Eb4.mp3'
import Eb5 from './piano-notes/Eb5.mp3'
import Eb6 from './piano-notes/Eb6.mp3'
import Eb7 from './piano-notes/Eb7.mp3'
import F1 from './piano-notes/F1.mp3'
import F2 from './piano-notes/F2.mp3'
import F3 from './piano-notes/F3.mp3'
import F4 from './piano-notes/F4.mp3'
import F5 from './piano-notes/F5.mp3'
import F6 from './piano-notes/F6.mp3'
import F7 from './piano-notes/F7.mp3'
import G1 from './piano-notes/G1.mp3'
import G2 from './piano-notes/G2.mp3'
import G3 from './piano-notes/G3.mp3'
import G4 from './piano-notes/G4.mp3'
import G5 from './piano-notes/G5.mp3'
import G6 from './piano-notes/G6.mp3'
import G7 from './piano-notes/G7.mp3'
import Gb1 from './piano-notes/Gb1.mp3'
import Gb2 from './piano-notes/Gb2.mp3'
import Gb3 from './piano-notes/Gb3.mp3'
import Gb4 from './piano-notes/Gb4.mp3'
import Gb5 from './piano-notes/Gb5.mp3'
import Gb6 from './piano-notes/Gb6.mp3'
import Gb7 from './piano-notes/Gb7.mp3'

const socket = io.connect('http://localhost:3001');

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
  const [username, setUsername] = useState('Guest');
  const [inputValue, setInputValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const chatBoxRef = useRef(null);
  let doOnce = useRef(false);
  const chatInputFocus = useRef(false);

  const resetDoOnce = () => {
    doOnce.current = false;
  }

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', {room, username});
      receiveMessage(`joined room ${room}`, `${username} (you)`);
    }
  };
  
  function receiveMessage(theMessage, theUsername) {
    if (!doOnce.current) {
      doOnce.current = true;
      if (theUsername === '') {
        theUsername = 'Guest';
      }
      const div = document.createElement("div");
      div.textContent = `${theUsername}: ${theMessage}`;
      if (theUsername === 'Server') {
        div.style = 'padding-left: 2%; color: #D8BFD8';
      }
      else {
        div.style = 'padding-left: 2%';
      }
      
      document.getElementById("chat-box").append(div);

      const chatBoxElement = chatBoxRef.current
      chatBoxElement.scrollTop = chatBoxElement.scrollHeight;

      setTimeout(resetDoOnce, 500);
    }
  }

  useEffect(() => {
    socket.on('receive_bpm', (data) => {
      setBpm(data.newBpm);
      receiveMessage(`BPM changed to ${data.newBpm}`, 'Server');
    });

    socket.on('joined_room', (data) => {
      receiveMessage(`${data} joined the room`, 'Server');
    });

    socket.on('receive_message', (data) => {
      receiveMessage(data.message, data.username);
    });

    socket.on('user_disconnected', (data) => {
      receiveMessage(`${data} disconnected`, 'Server');
    });

  }, [socket]);

  useEffect(() => {
    socket.on('receive_grid', (data) => {
      const newGrid = [...gridData];

      newGrid[data.rowIndex][data.cellIndex] = data.value;
      
      setGridData(newGrid);
    });
  }, [gridData, socket]);

  const resetGrid = () => {
    const newGridData = [...gridData]
    for (let i = 0; i < newGridData.length; i++) {
      for (let j = 0; j < newGridData[i].length; j++) {
        if (newGridData[i][j] !== '') {
          newGridData[i][j] = '';
          const rowIndex = i;
          const cellIndex = j;
          const value = '';
          socket.emit('update_grid', {rowIndex, cellIndex, value, room});
        }
      }
    }
    setGridData(newGridData);
  };

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
          newGridData[rowIndex][cellIndex] = 'B7';
          break;
        case 2:
          newGridData[rowIndex][cellIndex] = 'Bb7';
          break;
        case 3:
          newGridData[rowIndex][cellIndex] = 'A7';
          break;
        case 4:
          newGridData[rowIndex][cellIndex] = 'Ab7';
          break;
        case 5:
          newGridData[rowIndex][cellIndex] = 'G7';
          break;
        case 6:
          newGridData[rowIndex][cellIndex] = 'Gb7';
          break;
        case 7:
          newGridData[rowIndex][cellIndex] = 'F7';
          break;
        case 8:
          newGridData[rowIndex][cellIndex] = 'E7';
          break;
        case 9:
          newGridData[rowIndex][cellIndex] = 'Eb7';
          break;
        case 10:
          newGridData[rowIndex][cellIndex] = 'D7';
          break;
        case 11:
          newGridData[rowIndex][cellIndex] = 'Db7';
          break;
        case 12:
          newGridData[rowIndex][cellIndex] = 'C6';
          break;
        case 13:
          newGridData[rowIndex][cellIndex] = 'B6';
          break;
        case 14:
          newGridData[rowIndex][cellIndex] = 'Bb6';
          break;
        case 15:
          newGridData[rowIndex][cellIndex] = 'A6';
          break;
        case 16:
          newGridData[rowIndex][cellIndex] = 'Ab6';
          break;
        case 17:
          newGridData[rowIndex][cellIndex] = 'G6';
          break;
        case 18:
          newGridData[rowIndex][cellIndex] = 'Gb6';
          break;
        case 19:
          newGridData[rowIndex][cellIndex] = 'F6';
          break;
        case 20:
          newGridData[rowIndex][cellIndex] = 'E6';
          break;
        case 21:
          newGridData[rowIndex][cellIndex] = 'Eb6';
          break;
        case 22:
          newGridData[rowIndex][cellIndex] = 'D6';
          break;
        case 23:
          newGridData[rowIndex][cellIndex] = 'Db6';
          break;
        case 24:
          newGridData[rowIndex][cellIndex] = 'C5';
          break;
        case 25:
          newGridData[rowIndex][cellIndex] = 'B5';
          break;
        case 26:
          newGridData[rowIndex][cellIndex] = 'Bb5';
          break;
        case 27:
          newGridData[rowIndex][cellIndex] = 'A5';
          break;
        case 28:
          newGridData[rowIndex][cellIndex] = 'Ab5';
          break;
        case 29:
          newGridData[rowIndex][cellIndex] = 'G5';
          break;
        case 30:
          newGridData[rowIndex][cellIndex] = 'Gb5';
          break;
        case 31:
          newGridData[rowIndex][cellIndex] = 'F5';
          break;
        case 32:
          newGridData[rowIndex][cellIndex] = 'E5';
          break;
        case 33:
          newGridData[rowIndex][cellIndex] = 'Eb5';
          break;
        case 34:
          newGridData[rowIndex][cellIndex] = 'D5';
          break;
        case 35:
          newGridData[rowIndex][cellIndex] = 'Db5';
          break;
        case 36:
          newGridData[rowIndex][cellIndex] = 'C4';
          break;
        case 37:
          newGridData[rowIndex][cellIndex] = 'B4';
          break;
        case 38:
          newGridData[rowIndex][cellIndex] = 'Bb4';
          break;
        case 39:
          newGridData[rowIndex][cellIndex] = 'A4';
          break;
        case 40:
          newGridData[rowIndex][cellIndex] = 'Ab4';
          break;
        case 41:
          newGridData[rowIndex][cellIndex] = 'G4';
          break;
        case 42:
          newGridData[rowIndex][cellIndex] = 'Gb4';
          break;
        case 43:
          newGridData[rowIndex][cellIndex] = 'F4';
          break;
        case 44:
          newGridData[rowIndex][cellIndex] = 'E4';
          break;
        case 45:
          newGridData[rowIndex][cellIndex] = 'Eb4';
          break;
        case 46:
          newGridData[rowIndex][cellIndex] = 'D4';
          break;
        case 47:
          newGridData[rowIndex][cellIndex] = 'Db4';
          break;
        case 48:
          newGridData[rowIndex][cellIndex] = 'C3';
          break;
        case 49:
          newGridData[rowIndex][cellIndex] = 'B3';
          break;
        case 50:
          newGridData[rowIndex][cellIndex] = 'Bb3';
          break;
        case 51:
          newGridData[rowIndex][cellIndex] = 'A3';
          break;
        case 52:
          newGridData[rowIndex][cellIndex] = 'Ab3';
          break;
        case 53:
          newGridData[rowIndex][cellIndex] = 'G3';
          break;
        case 54:
          newGridData[rowIndex][cellIndex] = 'Gb3';
          break;
        case 55:
          newGridData[rowIndex][cellIndex] = 'F3';
          break;
        case 56:
          newGridData[rowIndex][cellIndex] = 'E3';
          break;
        case 57:
          newGridData[rowIndex][cellIndex] = 'Eb3';
          break;
        case 58:
          newGridData[rowIndex][cellIndex] = 'D3';
          break;
        case 59:
          newGridData[rowIndex][cellIndex] = 'Db3';
          break;
        case 60:
          newGridData[rowIndex][cellIndex] = 'C2';
          break;
        case 61:
          newGridData[rowIndex][cellIndex] = 'B2';
          break;
        case 62:
          newGridData[rowIndex][cellIndex] = 'Bb2';
          break;
        case 63:
          newGridData[rowIndex][cellIndex] = 'A2';
          break;
        case 64:
          newGridData[rowIndex][cellIndex] = 'Ab2';
          break;
        case 65:
          newGridData[rowIndex][cellIndex] = 'G2';
          break;
        case 66:
          newGridData[rowIndex][cellIndex] = 'Gb2';
          break;
        case 67:
          newGridData[rowIndex][cellIndex] = 'F2';
          break;
        case 68:
          newGridData[rowIndex][cellIndex] = 'E2';
          break;
        case 69:
          newGridData[rowIndex][cellIndex] = 'Eb2';
          break;
        case 70:
          newGridData[rowIndex][cellIndex] = 'D2';
          break;
        case 71:
          newGridData[rowIndex][cellIndex] = 'Db2';
          break;
        case 72:
          newGridData[rowIndex][cellIndex] = 'C1';
          break;
        case 73:
          newGridData[rowIndex][cellIndex] = 'B1';
          break;
        case 74:
          newGridData[rowIndex][cellIndex] = 'Bb1';
          break;
        case 75:
          newGridData[rowIndex][cellIndex] = 'A1';
          break;
        case 76:
          newGridData[rowIndex][cellIndex] = 'Ab1';
          break;
        case 77:
          newGridData[rowIndex][cellIndex] = 'G1';
          break;
        case 78:
          newGridData[rowIndex][cellIndex] = 'Gb1';
          break;
        case 79:
          newGridData[rowIndex][cellIndex] = 'F1';
          break;
        case 80:
          newGridData[rowIndex][cellIndex] = 'E1';
          break;
        case 81:
          newGridData[rowIndex][cellIndex] = 'Eb1';
          break;
        case 82:
          newGridData[rowIndex][cellIndex] = 'D1';
          break;
        case 83:
          newGridData[rowIndex][cellIndex] = 'Db1';
          break;
        case 84:
          newGridData[rowIndex][cellIndex] = 'C0';
          break;
        case 85:
          newGridData[rowIndex][cellIndex] = 'B0';
          break;
        case 86:
          newGridData[rowIndex][cellIndex] = 'Bb0';
          break;
        case 87:
          newGridData[rowIndex][cellIndex] = 'A0';
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
    playAudio(newGridData[rowIndex][cellIndex]);
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
    console.log(chatInputFocus);
    if (event.code === 'Space' && !chatInputFocus.current) {
      event.preventDefault();
      toggleBarAnimation();
    }
  };

  const handleAnimInputChange = (event) => {
    const newBpm = Number(event.target.value)
    setBpm(newBpm);

    // send new bpm value to other users in the room
    socket.emit('update_bpm', {newBpm, room})
    receiveMessage(`BPM changed to ${newBpm}`, 'Server');
  };

  const audioSources = {
    C8: C8,
    C7: C7,
    C6: C6,
    C5: C5,
    C4: C4,
    C3: C3,
    C2: C2,
    C1: C1,
    A7: A7,
    A6: A6,
    A5: A5,
    A4: A4,
    A3: A3,
    A2: A2,
    A1: A1,
    A0: A0,
    Ab7: Ab7,
    Ab6: Ab6,
    Ab5: Ab5,
    Ab4: Ab4,
    Ab3: Ab3,
    Ab2: Ab2,
    Ab1: Ab1,
    B7: B7,
    B6: B6,
    B5: B5,
    B4: B4,
    B3: B3,
    B2: B2,
    B1: B1,
    B0: B0,
    Bb7: Bb7,
    Bb6: Bb6,
    Bb5: Bb5,
    Bb4: Bb4,
    Bb3: Bb3,
    Bb2: Bb2,
    Bb1: Bb1,
    Bb0: Bb0,
    D7: D7,
    D6: D6,
    D5: D5,
    D4: D4,
    D3: D3,
    D2: D2,
    D1: D1,
    Db7: Db7,
    Db6: Db6,
    Db5: Db5,
    Db4: Db4,
    Db3: Db3,
    Db2: Db2,
    Db1: Db1,
    E7: E7,
    E6: E6,
    E5: E5,
    E4: E4,
    E3: E3,
    E2: E2,
    E1: E1,
    Eb7: Eb7,
    Eb6: Eb6,
    Eb5: Eb5,
    Eb4: Eb4,
    Eb3: Eb3,
    Eb2: Eb2,
    Eb1: Eb1,
    F7: F7,
    F6: F6,
    F5: F5,
    F4: F4,
    F3: F3,
    F2: F2,
    F1: F1,
    G7: G7,
    G6: G6,
    G5: G5,
    G4: G4,
    G3: G3,
    G2: G2,
    G1: G1,
    Gb7: Gb7,
    Gb6: Gb6,
    Gb5: Gb5,
    Gb4: Gb4,
    Gb3: Gb3,
    Gb2: Gb2,
    Gb1: Gb1,
  };

  const playAudio = (note) => {
    let audio = new Audio();
    if (note in audioSources) {
      audio.src = audioSources[note];
      audio.play();
    }
  };

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
          //console.log(cell.textContent);
          playAudio(cell.textContent);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(message);

    setInputValue('');
    setSubmitted(true);

    const div = document.createElement("div");
    div.textContent = `${username} (you): ${message}`;
    div.style = 'padding-left: 2%';
    document.getElementById("chat-box").append(div);

    const chatBoxElement = chatBoxRef.current
    chatBoxElement.scrollTop = chatBoxElement.scrollHeight;

    socket.emit('send_message', {message, username, room});
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);

    if (submitted) {
      setSubmitted(false);
    }
    setInputValue(event.target.value);
  };

  const handleChatInputFocus = () => {
    chatInputFocus.current = true;
  };

  const handleChatInputBlur = () => {
    chatInputFocus.current = false;
  };

  return (
    <div className="App">
      <label htmlFor="usernameInput">Username:</label>
      <input id="bpmInput" placeholder='Enter username...' autoComplete='off' value={username} onFocus={handleChatInputFocus} onBlur={handleChatInputBlur} onChange={(event) => {
        setUsername(event.target.value);
      }} />
      <input 
        placeholder='Room number...'
        autoComplete='off'
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room </button>
      <br></br>
      <br></br>
      <label htmlFor="bpmInput" autoComplete='off'>BPM:</label>
      <input id="bpmInput" type="number" value={bpm} onChange={handleAnimInputChange} />
      <br></br>
      <br></br>
      <button onClick={resetGrid}> Reset </button>

      <div id="chat-box" ref={chatBoxRef}>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="message-input"></label>
          <input type="text" id="message-input" autoComplete='off' placeholder='Enter message...' value={submitted ? '' : inputValue} onChange={handleMessageChange} onFocus={handleChatInputFocus} onBlur={handleChatInputBlur}></input>
          <button type="submit" id="send-msg-button">Send</button>
        </form>
      </div>

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

import './App.css';
import Board from './Modules/Board.js';

function App() {
  // Temporary board variable.
  const boardState = [
    [4,8,16,32],
    [64,128,256,512],
    [1024,2048,4096,8192],
    [16384,32768,65536,131072]
  ];
  return (
    <div>
      <div className='fullscreen bgColor centerObject flexColumn'>
        <h1 className='title'>2048</h1>
        <Board boardState={boardState} />
      </div>
    </div>
  );
}

export default App;

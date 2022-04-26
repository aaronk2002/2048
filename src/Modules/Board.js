import './Board.css';
import Unit from './Unit.js';

const Board = (props) => {
    return (
        // The entire board.
        <div className='boardDim boardColor boardShape boardOther'>
            {props.boardState.map((row) => 
                // Each row.
                <div className='rowDim rowOther'>
                    {row.map((grid) =>
                        // Each unit grid.
                        <span className='columnDim columnOther'>
                            <Unit grid={grid} />
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

export default Board;
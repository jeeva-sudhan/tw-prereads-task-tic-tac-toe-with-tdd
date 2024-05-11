import {useState} from 'react';
import Square from '../components/Square';
import './Board.css';
import calculateWinner from '../utils/Game';

function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isMatchDraw, setIsMatchDraw] = useState(0);

    function handleClick(index) {

        if(squares[index] === "X" || squares[index] === "O" || calculateWinner(squares)) {
            return;
        }

        const updatedSquaresArr = squares.slice();
        updatedSquaresArr[index] = (xIsNext)?"X":"O";
        setXIsNext(!xIsNext);
        setIsMatchDraw(isMatchDraw+1);
        setSquares(updatedSquaresArr);
    }

    let status;
    const winner = calculateWinner(squares);
    if(isMatchDraw === 9) {
        status = `Match is Draw`;
    }
    else if(winner === "X" || winner === "O") {
        status = `Winner is: ${winner}`;
    }
    else {
        status = `Next Player is: ${(xIsNext)?"X":"O"}`;
    }

    return (
        <div className="tic-tac-toe">
            <div className="status-text" data-testid="status-text">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => {handleClick(0)}}/>
                <Square value={squares[1]} onSquareClick={() => {handleClick(1)}}/>
                <Square value={squares[2]} onSquareClick={() => {handleClick(2)}}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => {handleClick(3)}}/>
                <Square value={squares[4]} onSquareClick={() => {handleClick(4)}}/>
                <Square value={squares[5]} onSquareClick={() => {handleClick(5)}}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => {handleClick(6)}}/>
                <Square value={squares[7]} onSquareClick={() => {handleClick(7)}}/>
                <Square value={squares[8]} onSquareClick={() => {handleClick(8)}}/>
            </div>
        </div>
    );
}

export default Board;
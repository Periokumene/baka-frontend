import {useState} from 'react';
import './Game.css'

function Game(){
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [ bNextX, setbNextX ] = useState(true);
    const [ curMove, setCurMove ] = useState(0);



    function handleUpdatePlay(newSquares)
    {
        const newHistory = [...history.slice(0, curMove+1), newSquares];
        setHistory(newHistory);
        setCurMove(newHistory.length - 1);
        setbNextX(!bNextX);
    }

    function jumpTo(idx)
    {
        console.log(`JUMPTO....${idx}`)
        setCurMove(idx);
        setbNextX(idx % 2 === 0);
    }

    const jumpButtons = history.map((eachSquareGroup, i)=>{
        return <li key={i}>{
            <button onClick={()=>{jumpTo(i)}}>Jump {i}</button>
        }</li>
    })


    const curSquareValue = history[curMove];
    console.log(curMove);
    console.log(history);
    console.log(curSquareValue);
    console.log('--------------------')

    return <div className="game">
        <div className="game-board">
            <Board bNextX={bNextX} squareValues={curSquareValue} handleUpdatePlay={handleUpdatePlay}/>;
        </div>
        <div className="gameinfo">
            <ul>{jumpButtons}</ul>
        </div>
        </div>

}


function Board({bNextX, squareValues, handleUpdatePlay}) {
    function handleClick(i){
        if (tryCalcWinner(squareValues))
        {
            console.log('Game OVER');
            return;
        }
        if (squareValues[i]){
            console.log(`${i} is already set by ${squareValues[i]}`);
            return;
        }
        let newSquares = squareValues.slice();
        let next = bNextX ? 'X' : 'O';
        newSquares[i] = next;

        handleUpdatePlay(newSquares)

        console.log(squareValues);
        tryCalcWinner(squareValues);
    }

    if (!squareValues)
    {
        return <h1>ERROROR</h1>
    }
    let winner = tryCalcWinner(squareValues);
    let StatusWidget = winner ? <h3>winner - {winner}</h3> : <h3>????</h3>;

    return (
        <>
            {StatusWidget}
            <div className="board-row">
                <Square idx={0} states={squareValues} handleClick={handleClick}/>
                <Square idx={1} states={squareValues} handleClick={handleClick}/>
                <Square idx={2} states={squareValues} handleClick={handleClick}/>
            </div>
            <div className="board-row">
                <Square idx={3} states={squareValues} handleClick={handleClick}/>
                <Square idx={4} states={squareValues} handleClick={handleClick}/>
                <Square idx={5} states={squareValues} handleClick={handleClick}/>
            </div>
            <div className="board-row">
                <Square idx={6} states={squareValues} handleClick={handleClick}/>
                <Square idx={7} states={squareValues} handleClick={handleClick}/>
                <Square idx={8} states={squareValues} handleClick={handleClick}/>
            </div>
        </>
    );
}


function Square({idx, states, handleClick}){
    return <button
        className="square"
        onClick={e=>{handleClick(idx);}}
    >{states[idx]}</button>;
}


function tryCalcWinner(squareValues){
    const results = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < results.length; ++i){
        const [a, b, c] = results[i];
        const aValue = squareValues[a];
        const bValue = squareValues[b];
        const cValue = squareValues[c];
        if (aValue === bValue && aValue === cValue) {
            return aValue;
        }
    }
    return null;
}

export default Game;
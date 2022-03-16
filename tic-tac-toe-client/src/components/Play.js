import Square from "./Square";
import Board from "./Board";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getScore, move, reset} from "../store/play-slice";
import { useEffect } from "react";

const Play = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {status, board, winner, isError, isSuccess} = useSelector(state => state.play)

    // Fetch last playing game
    useEffect(() => {
        dispatch(move())
    }, [])

    useEffect(() => {
        if(winner){
            console.log("Winner found, call dispatch")
            dispatch(getScore());
        }
    }, [winner, dispatch])

    const handleMove = (idx) => {
        dispatch(move(idx));
    }

    const playAgain = (e) => {
        e.preventDefault();
        dispatch(reset());
    }

    return (
        <div className="d-flex h-100 w-100 align-items-center justify-content-center bg-dark">
            <div>
                {winner ? <h1 className="winner text-center">Winner is {winner}</h1> : null}
                {winner === " " ? <h1 className="text-light text-center">Tie Game</h1> : null}
                <Board>
                    {board.map((square, idx) =>
                        <Square
                            key={idx}
                            // x={square === "X" ? 1 : 0}
                            // o={square === "O" ? 1 : 0}
                            idx={idx}
                            onClick={() => handleMove(idx)}/>
                    )}
                </Board>
                {winner ? <button className="btn btn-block btn-light mt-3" onClick={playAgain}>Play Again</button>  : null}
            </div>
        </div>
    )
}

export default Play;
import { useEffect } from "react";
import {useSelector} from "react-redux";
import Board from "./Board";
import Square from "./Square";

const GameDetails = () => {

    const {status, gameDetailGrid, gameDetailWinner, gameDetailId, gameDetailStartDate} = useSelector(state => state.play)


	return (
		<div className="h-100 w-100 bg-dark">
        <div className="flex align-items-center justify-content-center p-3 bg-dark">
			<h1 className="text-light text-center">Game Id - <span className="text-info">{gameDetailId}</span></h1>
			<h1 className="text-light text-center">Game Start Date - <span className="text-success">{gameDetailStartDate}</span></h1>
			<h1 className="text-light text-center">Winner - <span className="text-danger">{gameDetailWinner}</span></h1>
		</div>	
		<div className="d-flex align-items-center justify-content-center">
			<Board>
				{gameDetailGrid.map((square, idx) =>
					<TempSquare
						key={idx}
						square={square}
						idx={idx}/>
				)}
			</Board>
		</div>
		</div>
	)
}

const TempSquare = (props) => {


    return (
        <div className="square" {...props}>
            {props.square}
        </div>
    );
}

export default GameDetails;
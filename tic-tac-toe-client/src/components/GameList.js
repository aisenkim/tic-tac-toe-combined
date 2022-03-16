import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {listGames} from "../store/play-slice";
import TableRow from "./TableRow";

const GameList = () => {

    const {gameList, status} = useSelector(state => state.play);

    const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listGames());	
	}, [])

	return (
		<div className="d-flex  w-90 h-90">
			<table className="table">
				<thead>
					<tr className="table-success">
					<th scope="col">#</th>
					<th scope="col">id</th>
					<th scope="col">star date</th>
					<th scope="col">details</th>
					</tr>
				</thead>
				<tbody>
					{gameList.map((game, idx) => 
						<TableRow key={idx} idx={idx} game={game}/>
					)}
				</tbody>
			</table>
		</div>
	);

}


export default GameList;
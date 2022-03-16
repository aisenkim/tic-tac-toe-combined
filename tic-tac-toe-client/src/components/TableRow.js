import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {gameDetails} from "../store/play-slice";
import { getExtraGameDetail } from "../store/play-slice";

const TableRow = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

	const getDetails = (gameId, startDate) => {
		dispatch(getExtraGameDetail({startDate, gameId}))
		dispatch(gameDetails(gameId));		
		navigate("/gamedetails")
	}

	return (
		<>
			<tr className={props.idx %2 === 0 ? "table-warning" : "table-light"}>
			<th scope="row">{props.idx}</th>
			<td>{props.game.id}</td>
			<td>{props.game.start_date}</td>
			<td><button className="btn btn-info" onClick={() => getDetails(props.game.id, props.game.start_date)} >Details</button></td>
			</tr>
		</>
	)
}


export default TableRow;
import {useSelector} from "react-redux";

const Square = (props) => {

    const {board} = useSelector(state => state.play)

    return (
        <div className="square" {...props}>
            {board[props.idx]}
            {/*{props.idx}*/}
        </div>
    );
}

export default Square;
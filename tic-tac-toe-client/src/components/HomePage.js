import Button from "react-bootstrap/Button"
import {useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";

const HomePage = () => {

    const navigate = useNavigate();

    const {username} = useSelector(state => state.auth);

    return (
        <div className="d-flex h-100 text-center text-white bg-dark">

            <div className="d-flex w-100 h-100 p-3 mx-auto flex-column text-center">

                <header className="mb-auto"/>

                <div className="d-flex px-3 mx-auto flex-column ">
                    <h1>Tic-Tac-Toe</h1>
                    <p className="lead">
                        How good are you at Tic-Tac-Toe? Can you beat the computer?
                    </p>
                    {username ? 
                        <p className="lead">
                            <Button onClick={() => navigate("/play")}>Let's Find Out</Button>
                        </p>
                        :
                        <p className="lead">
                            <Button onClick={() => navigate("/login")}>Let's Find Out</Button>
                        </p>
                    }
                </div>

                <footer className="mt-auto text-white-50">
                    <p>Hosted By <a
                        href="http://aisencode.com" className="text-white">aisencode.com</a></p>
                </footer>
            </div>
        </div>
    )
}

export default HomePage;
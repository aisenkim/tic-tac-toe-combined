import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
import {Link, useNavigate} from 'react-router-dom';
import {FaKey, FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {useDispatch, useSelector} from "react-redux";
import {logout, reset} from "../store/auth-slice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const CustomNavbar = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {username} = useSelector(state => state.auth);
    const {win, loss, tie} = useSelector(state => state.play);

    const onLogout = () => {
        console.log("Logout performing onLogout")
        dispatch(logout())
        dispatch(reset())
        navigate("/")
        toast.success("Hope to See you Soon")
    }

    // TODO - define getLoggedIn to check if user is logged in after the window was closed since it's a session
    // useEffect(() => {
    //     console.log(`win: ${win} loss: ${loss}`)
    // }, [win, loss, tie, dispatch])

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">Tic-Tac-Toe</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={"/play"}>Play</Nav.Link>
                        <Nav.Link as={Link} to={"/listgame"}>Game History</Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Nav className="me-auto">
                        {username ? <h5 className="text-warning pt-2 mt-1">win: {win} loss: {loss} tie: {tie} </h5> : null}
                    </Nav>
                    <Nav>
                        {username ? (
                            <button className="btn btn-dark text-info" onClick={onLogout}>
                                <FaSignOutAlt
                                    style={{paddingBottom: '2px'}}/> Logout</button>
                        ) : (<>
                            <Nav.Link as={Link} to="/login"><FaSignInAlt
                                style={{paddingBottom: '2px'}}/> Login</Nav.Link>

                            <Nav.Link as={Link} to={"/signup"}>
                                <FaUser style={{paddingBottom: '2px'}}/> Sign-Up
                            </Nav.Link>
                            <Nav.Link as={Link} to={"/verify"}>
                                <FaKey style={{paddingBottom: '2px'}}/> Verify
                            </Nav.Link>
                        </>)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default CustomNavbar;
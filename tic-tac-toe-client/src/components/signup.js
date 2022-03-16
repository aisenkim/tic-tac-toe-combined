import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {FaUser} from "react-icons/fa"
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Spinner from "./Spinner";
import {reset} from "../store/auth-slice";
import {register} from "../store/auth-slice";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {username, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: ""
    })

    const {userName, email, password} = formData;

    useEffect(() => {
        if (isError)
            toast.error(message)
        if (isSuccess) {
            navigate('/login')
        }

        dispatch(reset())
    }, [isError,isSuccess,message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            username: userName,
            email,
            password
        }
        dispatch(register(userData))
        // navigate("/")
    }

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <>
            <section className='heading d-flex justify-content-center mt-3'>
                <h1>
                    <FaUser/> Register
                </h1>
            </section>
            <section className='d-flex justify-content-center'>
                <h3>Please create an account</h3>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input className="form-control" id="userName" name="userName" value={userName}
                               placeholder="Enter your username" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" id="email" name="email" type="email" value={email}
                               placeholder="Enter your email" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" id="password" name="password" type="password" value={password}
                               placeholder="Enter your password" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block btn-dark" type="submit">Register</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Signup;
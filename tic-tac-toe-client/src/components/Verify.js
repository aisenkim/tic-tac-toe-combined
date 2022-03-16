import {FaKey} from "react-icons/fa";
import {useEffect, useState} from "react";
import {reset, verify} from "../store/auth-slice";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import Spinner from "./Spinner";

const Verify = () => {

    const [formData, setFormData] = useState({
        email: "",
        key: ""
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {isLoading, isError, isSuccess, message, status} = useSelector(
        (state) => state.auth
    )


    useEffect(() => {
        console.log(status)
        if (isError)
            toast.error(message)
        if (isSuccess) {
            navigate('/login')
        }

        dispatch(reset())
    }, [status, isError, isSuccess, message, navigate, dispatch])

    const {email, key} = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
            key
        }
        dispatch(verify(userData))
    }

    if (isLoading) {
        return <Spinner/>
    }
    return (
        <>
            <section className='heading d-flex justify-content-center mt-3'>
                <h1>
                    <FaKey/> Verify Email
                </h1>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input className="form-control" id="email" type="email" name="email" value={email}
                               placeholder="Enter your email" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" id="key" name="key"
                               value={key}
                               placeholder="Enter your key" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block btn-dark" type="submit">Verify</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Verify;
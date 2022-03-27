import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { reset } from "../store/auth-slice";
import { login } from "../store/auth-slice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { username, isLoading, isError, isSuccess, message, status } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess) {
      navigate("/");
      toast.success("Think You Can Beat Me?");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const { userName, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: userName,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading d-flex justify-content-center mt-3">
        <h1>
          <FaUser /> Login
        </h1>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              id="userName"
              name="userName"
              value={userName}
              placeholder="Enter your username"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              id="password"
              name="password"
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block btn-dark" type="submit">
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;

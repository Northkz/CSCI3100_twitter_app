import React, { useEffect, useState } from "react";
import useForm from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/asyncActions/UserAsync";
import { useHistory } from "react-router-dom";
import { RiTwitterFill, RiEye2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { BiError, BiShow } from "react-icons/bi";
import { WarningText } from "../iconStyle/Common";
const Login = () => {
  const user = useSelector((state) => state.userReducer);
  const { isAuthenticated } = user;
  const [values, userAction] = useForm();
  const [type, setType] = useState("password");
  const { email, password } = values;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    isAuthenticated && history.push("/");
  }, [history, isAuthenticated]);

  const loginMe = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  const changetype = () => {
    if(type==="password"){
      setType("text")
    }
    if(type==="text"){
      setType("password")
    }
  }

  return (
    <div className="mainForm">
      <div className="twitter-logo">
        <i style={{ fontSize: 40 }}>
          <RiTwitterFill color="#6E1E6F" />
        </i>
      </div>
     
      <h1 className="heading">Welcome to Twitter!</h1>
      <form onSubmit={loginMe}>
        <input
          value={email || ""}
          onChange={userAction}
          type="email"
          name="email"
          placeholder="Email"
          className="userInput"
        />
        <br />
        <span className="position-relative">
          <input
            value={password || ""}
            onChange={userAction}
            type={type}
            name="password"
            className="userInput"
            style={{ paddingRight: 60 }}
            placeholder="Password"
          />

          <BiShow
            style={{
              position: "absolute",
              top: -5,
              right: 20,
              fontSize: 25,
              cursor: "pointer",
            }}
            onClick={changetype}
            color="#13030a"
          />
        </span>

        <br />
        {user.error && (
          <WarningText>
            <BiError /> {user.error}
          </WarningText>
        )}
        <button
          type="submit"
          disabled={!email || !password}
          className="link-tweet login-btn"
        >
          {user.isLoading ? (
            <ClipLoader color="white" loading={true} size={24} />
          ) : (
            "Login"
          )}
        </button>
      </form>
      <p className="help-text">
        Want to create new account?
        <Link to="/register">
          <span className="link-go mx-3">Register</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;

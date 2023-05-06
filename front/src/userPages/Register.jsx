import React, { useEffect } from "react";
import useForm from "../hookReact/formHooks";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../ReactRedux/syncing/normalUser";
import { useHistory } from "react-router-dom";
import { RiTwitterFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { WarningText } from "../iconStyle/comStyle";
import AlertMessage from "../components/Details/alertMessage";
import { removeMesage } from "../ReactRedux/slices/userSlice";

const Register = () => {
  const [values, handleChange, disabled] = useForm();
  const { username, email, password, re_password } = values;
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.userReducer);
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  const registerMe = (e) => {
    e.preventDefault();
    dispatch(register(username, email, password, re_password));
  };
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated,history]);
  return (
    <div className="mainForm">
      <div style={{maxWidth:'480px'}}>
      <div className="twitter-logo">
      <i style={{ fontSize: 40 }}>
        <RiTwitterFill color="#6E1E6F" />
      </i>
      </div>
      <h2 className="heading">Register In Twitter</h2>
      {user.message && (
        <AlertMessage
          removeMesage={removeMesage}
          dispatch={dispatch}
          message={user.message}
        />
      )}
      <form onSubmit={registerMe} autoComplete="false">
        <input
          value={username || ""}
          onChange={handleChange}
          type="text"
          name="username"
          placeholder="Username"
          className="userRegister"
        />

        <br />
        <input
          value={email || ""}
          onChange={handleChange}
          type="email"
          name="email"
          className="userRegister"
          placeholder="Email"
        />
        <br />
        <input
          value={password || ""}
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
          className="userRegister"
        />
        <br />
        <input
          value={re_password || ""}
          onChange={handleChange}
          type="password"
          className="userRegister"
          name="re_password"
          placeholder="Retype password"
        />

        {user.error && <WarningText>{user.error}</WarningText>}
        <button
          type="submit"
          disabled={disabled}
          className="link-tweet login-btn"
        >
          {user.isLoading ? (
            <ClipLoader color="white" loading={true} size={26} />
          ) : (
            "Register"
          )}
        </button>
      </form>
      <p className="help-text">
        Already have account ?
        <Link to="/login">
          <span className="link-go mx-3">Login</span>
        </Link>
      </p>
      </div>
    </div>
  );
};

export default Register;

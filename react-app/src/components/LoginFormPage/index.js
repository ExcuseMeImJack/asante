import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getUserProfile } from "../../store/users";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErrors = false;
    setErrors({})
    if (!email) {
      setErrors(errors => ({...errors, email: "Email is required"}));
      hasErrors = true;
    }
    if (!password) {
      setErrors(errors => ({...errors, password: "Password is required"}))
      hasErrors = true;
    }
    if (hasErrors) return;
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors({credentials: "Your email or password is incorrect"});
      return;
    }
    dispatch(getUserProfile())
    history.push('/')
  };

  if (sessionUser) return <Redirect to="/" />;




  const handleDemoLogin = async (e) => {
    e.preventDefault()
    const demoEmail = "tester@aa.io"
    const demoPassword = "password"

    const data = await dispatch(login(demoEmail, demoPassword))
    if (data) {
      setErrors(data);
    }
    dispatch(getUserProfile())
    history.push('/')
  };

  return (
    <>
      <div className="form-container login-form">
        <h1 className="sign-up-h1">Log In</h1>
        <form onSubmit={handleSubmit} className="form">
            <div className="error-container">
              {errors.credentials && <p>{errors.credentials}</p>}
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              // required
              />
            <div className="error-container">
              {errors.email && <p>{errors.email}</p>}
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              // required
            />
            <div className="error-container">
              {errors.password && <p>{errors.password}</p>}
            </div>
          <div className="button-container">
            <button type="submit" className="form-button">Log In</button>
            <button onClick={handleDemoLogin} className="form-button demo-button">Demo User</button>
          </div>
        <div onClick={() => history.goBack()} className="back-button cursor-pointer"><i className="fa-sharp fa-solid fa-arrow-left"></i>Back</div>
        </form>
      </div>
    </>
  );
}

export default LoginFormPage;

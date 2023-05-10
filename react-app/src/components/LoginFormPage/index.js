import React, { useState, useRef } from "react";
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
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    dispatch(getUserProfile())
    history.push('/')
  };

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
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          <div className="button-container">
            <button type="submit" className="form-button">Log In</button>
            <button onClick={handleDemoLogin} className="form-button demo-button">Demo User</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormPage;

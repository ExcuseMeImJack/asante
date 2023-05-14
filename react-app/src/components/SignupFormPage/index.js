import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import { getUserProfile } from "../../store/users";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let hasErrors = false;
    if (!name) {
      setErrors(errors => ({...errors, name: "Name is required"}))
      hasErrors = true;
    }
    if (!email) {
      setErrors(errors => ({...errors, email: "Email is required"}));
      hasErrors = true;
    }
    if (validateEmail(email) === false) {
      setErrors(errors => ({...errors, email: "Please enter a valid email"}));
      hasErrors = true;
    }
    if (!username) {
      setErrors(errors => ({...errors, username: "Username is required"}));
      hasErrors = true;
    }
    if (!password) {
      setErrors(errors => ({...errors, password: "Password is required"}))
      hasErrors = true;
    }
    // if (errors.name || errors.email || errors.username || errors.password) return;
    if (hasErrors) return;
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password, name));
      if (data[0]) {
        const errorMessage = data[0].split(" : ")[1];
        if (errorMessage.startsWith("Username")) {
          setErrors(errors => ({...errors, username: errorMessage}));
          hasErrors = true;
        }
        if (errorMessage.startsWith("Email")) {
          setErrors(errors => ({...errors, email: errorMessage}));
          hasErrors = true;
        }
        return data;
      }
        dispatch(getUserProfile())
        history.push('/')
    } else {
        setErrors(errors => ({...errors, confirmPassword: 'Confirm Password must match Password'}));
    }
  };

  return (
    <>
      <div className="form-container">
        <h1 className="sign-up-h1">Sign Up</h1>
        <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              // required
              />
            <div className="error-container">
              {errors.name && <p>{errors.name}</p>}
            </div>
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              // required
              />
            <div className="error-container">
              {errors.email && <p>{errors.email}</p>}
            </div>
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              // required
              />
            <div className="error-container">
              {errors.username && <p>{errors.username}</p>}
            </div>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              // required
              />
            <div className="error-container">
              {errors.password && <p>{errors.password}</p>}
            </div>
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              // required
            />
            `<div className="error-container">
              {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            </div>
          <button className="form-button" type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default SignupFormPage;

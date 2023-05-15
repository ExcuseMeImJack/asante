import "./landing.css";
import React, { useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import { getUserProfile } from "../../store/users";
import { useDispatch } from "react-redux";

const LandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const [errors, setErrors] = useState([]);

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


  const handleGetStartedClick = () => {
    history.push("/signup");
  };


  return (
    <>
     <div className="navbar">
            <div className="navbar-left">
              <Link to="">Why Asante?</Link>
              <Link to="">Features</Link>
              <Link to="">Resources</Link>
              <Link to="">Enterprise</Link>
              <Link to="">Pricing</Link>
            </div>

            <div className="navbar-right">
              <Link to="">Contact</Link>
              <Link to="/login">
                Log In
              </Link>

              <button
                className="get-started-btn-1"
                onClick={handleGetStartedClick}
              >
                Get Started
              </button>

            </div>
          </div>

    <div className="page-container">

      <main>
        <div className="main-container">
          <div className="main-section">
            <div className="main-left">
              <h1>The best platform for cross-functional work</h1>
              <p>
                Want to drive efficiency across your organization? Asante is
                flexible and easy for all teams to use, so you can deliver
                quality work together, faster.
              </p>
              <button
                className="get-started-btn-2"
                onClick={handleGetStartedClick}
              >
                Get Started
              </button>
              <button className="demo-user-btn" onClick={handleDemoLogin}>See how it works</button>
            </div>
            <div className="main-right">
              <div className="buttons">
              <button className="button1">Marketing</button>
              <button className="button2">Product</button>
              <button className="button3">IT</button>
              <button className="button4">Operations</button>
              <button className="button5">Sales</button>
              </div>
              <div className="layouts-styling">
                <div>About Asante</div>
                <p>
                  Asante is a clone of the popular work management platform used to streamline your team's efficiency and collaboration. Asante was built using a combination of Flask, the dynamic user interface of React, and the state management capabilities of Redux.
                </p>
              </div>
              <div className="layouts-styling">
                <div>Boards</div>
                <p>
                  Make it easy for your team to focus on tasks currently at
                  hand. Define each stage of work to see what’s important and
                  where things are getting stuck.
                </p>
              </div>
              <div></div>
            </div>
          </div>
        </div>

        <div className="main2-section-container">
          <div className="main2-section-section">
            <div className="main2-section-left">
              <div className="main2-section-left-text">
                <p className="uppercase-text">Boost efficiency across teams</p>
                <h2>Manage complex work easily</h2>
                <p>
                  Connect what needs to get done, who's doing it, and by when.
                </p>
              </div>
            </div>

            <div className="main2-section-right">

                <img src="https://i.imgur.com/lojYc8n.png" alt="boards image" className="image-class"></img>
            </div>
          </div>
        </div>
      </main>
      </div>
      </>
  );
};

export default LandingPage;

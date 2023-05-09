import "./landing.css";
import React from "react";
import { useHistory } from "react-router-dom";
const LandingPage = () => {
  const history = useHistory();

  const handleGetStartedClick = () => {
    history.push("/signup");
  };

  const handleLogInClick = () => {
    history.push("/login");
  }

  console.log("testing hehe")
  return (
    <>
      <header>
        <div className="nav-container">
          <div className="navbar">
            <div className="navbar-left">
              <a href="">Why Asante?</a>
              <a href="">Features</a>
              <a href="">Resources</a>
              <a href="">Enterprise</a>
              <a href="">Pricing</a>
            </div>

            <div className="navbar-right">
              <a href="">Contact</a>
              <a href="" onClick={handleLogInClick}>Log In</a>
              <button
                className="get-started-btn"
                onClick={handleGetStartedClick}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

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
                className="main-section-btn-1"
                onClick={handleGetStartedClick}
              >
                Get Started
              </button>
              <button className="main-section-btn-2">See how it works</button>
            </div>
            <div className="main-right">
              <button className="button1">Marketing</button>
              <button className="button2">Product</button>
              <button className="button3">IT</button>
              <button className="button4">Operations</button>
              <button className="button5">Sales</button>
              <div></div>
            </div>
          </div>
        </div>

        <div className="main2-section-container">
          <div className="main2-section-section">
            <div className="main2-section-left">
              <p className="uppercase-text-bio">
                Drive efficiency across teams
              </p>
              <h4>Manage complex work easily</h4>
              <p>
                Connect what needs to get done, who's doing it, and by when.
              </p>
            </div>

            <div className="main2-section-right">
              <div className="layouts-styling">
                <div>List View</div>
                <p>
                  Organize and assign tasks. With lists, teams see immediately
                  what they need to do, which tasks are a priority, and when
                  work is due.
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
      </main>
    </>
  );
};

export default LandingPage;

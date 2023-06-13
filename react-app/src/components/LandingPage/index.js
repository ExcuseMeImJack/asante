import "./landing.css";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import { getUserProfile } from "../../store/users";
import { useDispatch } from "react-redux";
import icon_image from "../../assets/asante-icon.png";

const LandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const [errors, setErrors] = useState([]);
  const [isBoardTriggered, setIsBoardTriggered] = useState(true);
  const [isSectionTriggered, setIsSectionTriggered] = useState(false);
  const [isTaskTriggered, setIsTaskTriggered] = useState(false);
  const [isProfileTriggered, setIsProfileTriggered] = useState(false);

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const demoEmail = "tester@aa.io";
    const demoPassword = "password";

    const data = await dispatch(login(demoEmail, demoPassword));
    if (data) {
      setErrors(data);
    }
    dispatch(getUserProfile());
    history.push("/");
  };

  const handleGetStartedClick = () => {
    history.push("/signup");
  };

  const triggerBoards = () => {
    setIsSectionTriggered(false);
    setIsTaskTriggered(false);
    setIsProfileTriggered(false);
    setIsBoardTriggered(true);
  }

  const triggerSections = () => {
    setIsBoardTriggered(false);
    setIsTaskTriggered(false);
    setIsProfileTriggered(false);
    setIsSectionTriggered(true);
  }

  const triggerTasks = () => {
    setIsSectionTriggered(false);
    setIsBoardTriggered(false);
    setIsProfileTriggered(false);
    setIsTaskTriggered(true);
  }

  const triggerProfiles = () => {
    setIsSectionTriggered(false);
    setIsTaskTriggered(false);
    setIsBoardTriggered(false);
    setIsProfileTriggered(true);
  }

  return (
    <div className="landing-container">
      <div className="landing-page">
        <div className="navbar">
          <div className="navbar-left">
            <div className="icon-nav">
            <img id="site-icon" alt="" src={icon_image}></img>
					  <h2 id='site-logo-landing'>asante</h2>
            </div>
            <Link to="">About</Link>
            <Link to="">Features</Link>
            <Link to="">Resources</Link>
            <Link to="">Creators</Link>
          </div>

          <div className="navbar-right">
            <Link to="">Contact</Link>
            <Link to="/login">Log In</Link>

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
                  <div className="border-divider-cls"></div>
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
                  <button className="demo-user-btn" onClick={handleDemoLogin}>
                    See how it works
                  </button>
                </div>
                <div className="main-right">
                  <div className="buttons">
                    <button className="button1" onMouseEnter={triggerBoards}>Boards</button>
                    <button className="button2" onMouseEnter={triggerSections}>Sections</button>
                    <button className="button5" onMouseEnter={triggerTasks}>Tasks</button>
                    <button className="button4" onMouseEnter={triggerProfiles}>Profiles</button>
                  </div>
                  {isBoardTriggered &&
                    <div className="section-selection">
                      <div>Boards</div>
                      <p>
                      Asante's board feature is a visual project management tool that allows users to create custom boards with task cards. It enhances collaboration, tracks progress, and provides a clear overview of project status. Users can easily organize tasks, assign team members, and streamline workflows for efficient project management.
                      </p>
                    </div>}
                  {isSectionTriggered &&
                    <div className="section-selection">
                      <div>Sections</div>
                      <p>
                      Asante's sections feature allows users to organize tasks within a project by creating labeled sections. This feature promotes better organization and clarity, enabling teams to group related tasks together. Sections serve as visual markers, making it easier to navigate and manage projects efficiently.
                      </p>
                    </div>}
                  {isTaskTriggered &&
                    <div className="section-selection">
                      <div>Tasks</div>
                      <p>
                      Asante's tasks feature enables users to create and manage individual tasks within projects. Users can assign due dates, add descriptions, attach files, and assign tasks to specific team members. With task dependencies, subtasks, and priority settings, teams can track progress and collaborate effectively, ensuring project completion and success.
                      </p>
                    </div>}
                  {isProfileTriggered &&
                    <div className="section-selection">
                      <div>Profiles</div>
                      <p>
                      Asante's profiles feature provides users with individual profiles that showcase their roles, responsibilities, and contributions within a team. It includes information such as contact details, bio, assigned tasks, and project involvement. Profiles enhance collaboration by allowing team members to easily connect, understand each other's expertise, and efficiently collaborate on projects.
                      </p>
                    </div>}

                  <div className="layouts-styling">
                    <div>About Asante</div>
                    <p>
                      Asante is a clone of the popular work management platform
                      used to streamline your team's efficiency and
                      collaboration. Asante was built using a combination of
                      Flask, the dynamic user interface of React, and the state
                      management capabilities of Redux.
                    </p>
                  </div>
                  <div className="border-divider2-cls"></div>
                </div>
              </div>
            </div>

            <div className="main2-section-container">
              <div className="main2-section-section">

                <div className="main2-section-right">
                  <img
                    src="https://i.imgur.com/lojYc8n.png"
                    alt="board icon"
                    className="image-class"
                  ></img>
                </div>
                <div className="main2-section-left">
                  <div className="main2-section-left-text">
                    <p className="uppercase-text">
                      Boost efficiency across teams
                    </p>
                    <h2>Manage complex work easily</h2>
                    <p>
                      Connect what needs to get done, who's doing it, and by
                      when.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

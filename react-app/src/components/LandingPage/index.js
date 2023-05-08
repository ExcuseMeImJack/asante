import "./landing.css";

const LandingPage = () => {
  return (
    <>
      <header>
        <div className="nav-container">
          <div className="navbar">
            <div className="navbar-left">
              Why Asana? Features Resources Enterprise Pricing
            </div>

            <div className="navbar-right">
              Contact Sales Log In
              <button>Get Started</button>
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
                Want to drive efficiency across your organization? Asana is
                flexible and easy for all teams to use, so you can deliver
                quality work together, faster.
              </p>
              <button className="reg-button">Get Started</button>
              <button className="reg-button">See how it works</button>
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
      </main>

      {/* <footer> */}
        <div className="footer-container">
          <div className="footer-section">
            <div className="footer-left">
              <p className="uppercase-text-bio">
                Drive efficiency across teams
              </p>
              <h4>Manage complex work easily</h4>
              <p>
                Connect what needs to get done, who's doing it, and by when.
              </p>
            </div>

            <div className="footer-right">
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
      {/* </footer> */}
    </>
  );
};

export default LandingPage;

import "./landing.css"

const LandingPage = () => {

    return (

        <>
        <header>
            <div className="nav-container">
                <div className="navbar">
                    <div className="navbar-left">
                        Why Asana?
                        Features
                        Resources
                        Enterprise
                        Pricing
                    </div>

                    <div className="navbar-right">
                        Contact Sales
                        Log In
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
                        <p>Want to drive efficiency across your organization? Asana is flexible and easy for all teams to use, so you can deliver quality work together, faster.</p>
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

        <footer>
            <div className="end-container">
                <div className="footer-header">

                    <p className="drive-efficiency-text">Drive efficiency across teams</p>

                    <h4>Manage complex work easily</h4>
                    <p className="footer-text">Connect what needs to get done, who's doing it, and by when.</p>
                </div>

                <div className="layout-container">
                    <div className="layouts-styling">
                        <div>List view</div>
                        <p>Organize and assign tasks. With lists, teams see immediately what they need to do, which tasks are a priority, and when work is due.</p>
                    </div>

                    <div className="layouts-styling">
                        <div>Timeline</div>
                        <p>See how work maps out over time. Manage dependent, overlapping, and unscheduled tasks—and create plans your team can count on.</p>
                    </div>

                    <div className="layouts-styling">
                        <div>Boards</div>
                        <p>Make it easy for your team to focus on tasks currently at hand. Define each stage of work to see what’s important and where things are getting stuck.</p>
                    </div>
                </div>
            </div>
        </footer>
    </>
    )
}

export default LandingPage

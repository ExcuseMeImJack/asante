import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SingleBoard from "./components/Boards/SingleBoard";
import SingleTask from "./components/Tasks/SingleTask";
import SingleSection from "./components/Sections/SingleSection";
import CreateBoardForm from "./components/Boards/CreateBoardForm";
import UserProfile from "./components/Users/UserProfile";
import LandingPage from "./components/LandingPage";
import { getUserProfile } from "./store/users";
import Home from "./components/Home";
import Footer from "./components/Footer"
import UsersTasks from './components/Tasks/UsersTasks'
import MobileBanner from "./components/MobileBanner";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
      dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);
  
  return (
    <div className="app">
      <MobileBanner />
      {user ? (
        <>
          <Navigation isLoaded={isLoaded} />
          {isLoaded && (
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path='/tasks'>
                <UsersTasks/>
              </Route>
              <Route path="/profile">
                <UserProfile />
              </Route>
              <Route exact path="/boards/new">
                <CreateBoardForm />
              </Route>
              <Route path="/boards/:boardId">
                <SingleBoard />
              </Route>
              <Route path="/task/:taskId">
                <SingleTask />
              </Route>
              <Route path="/sections/:sectionId">
                <SingleSection />
              </Route>
              <Route>
                <h1>404 Page not Found</h1>
              </Route>
            </Switch>
          )}
        </>
      ) : (
        <>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/login">
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route>
              <h1>404 Page not Found</h1>
            </Route>
          </Switch>
        </>
      )}
    <Footer />
    </div>
  );
}

export default App;

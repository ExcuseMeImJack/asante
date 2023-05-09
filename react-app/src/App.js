import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SingleBoard from "./components/Boards/SingleBoard"
import SingleTask from "./components/Tasks/SingleTask"
import SingleSection from "./components/Sections/SingleSection";
import CreateBoardForm from "./components/Boards/CreateBoardForm"
import UsersTasks from "./components/Tasks/UsersTasks";
import UsersBoards from "./components/Boards/UsersBoards";
import UserProfile from "./components/Users/UserProfile";
import LandingPage from "./components/LandingPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>

      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <LandingPage />
          </Route>
          <Route path="/profile">
            <Navigation isLoaded={isLoaded} />
            <UserProfile />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/boards/new">
            <Navigation isLoaded={isLoaded} />
            <CreateBoardForm />
          </Route>
          <Route path="/boards/:boardId">
            <Navigation isLoaded={isLoaded} />
            <SingleBoard />
          </Route>
          <Route path="/task/:taskId">
            <Navigation isLoaded={isLoaded} />
            <SingleTask />
          </Route>
          <Route path="/sections/:sectionId">
            <Navigation isLoaded={isLoaded} />
            <SingleSection />
          </Route>
        </Switch>
        )}
    </>
  );
}

export default App;

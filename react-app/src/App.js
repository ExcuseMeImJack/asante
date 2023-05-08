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
import Sections from "./components/Sections/Sections"
import UsersTasks from "./components/Tasks/UsersTasks";
import UsersBoards from "./components/Boards/UsersBoards";
import UserProfile from "./components/Users/UserProfile";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <UsersTasks />
            <UsersBoards />
            <UserProfile />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/boards/:boardId">
            <SingleBoard />
            <Sections />
          </Route>
          <Route path="/task/:taskId">
            <SingleTask />
          </Route>
          <Route path="/sections/:sectionId">
            <SingleSection />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

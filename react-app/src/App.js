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
import UsersTasks from "./components/Tasks/UsersTasks";
import UsersBoards from "./components/Boards/UsersBoards";
import UserProfile from "./components/Users/UserProfile";
import LandingPage from "./components/LandingPage";
import { getUserProfile } from "./store/users";
import Home from "./components/Home";
import Footer from "./components/Footer"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.users.profile);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    dispatch(getUserProfile())
  }, [dispatch]);
  return (
    <>
      {user ? (
        <>
          <Navigation isLoaded={isLoaded} />
          {isLoaded && (
            <Switch>
              <Route exact path="/">
                <Home />
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
    </>
  );
}

export default App;

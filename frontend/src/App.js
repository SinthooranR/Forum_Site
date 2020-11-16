import { useState, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/General/Navigation/Navbar";

import HomePage from "./pages/MainPages/HomePage";
import LoginPage from "./pages/Credentials/Login";
import SignupPage from "./pages/Credentials/Signup";
import UserHomePage from "./pages/MainPages/UserHomePage";
import CreatePostPage from "./pages/Posts/CreatePost";
import CreateReplyPage from './pages/Posts/CreateReply';
import FullPostPage from './pages/Posts/ViewFullPost';
import Button from "./components/General/Button/Button";

// a global function to pass variables
import { MainContext } from "./main_context";

import classes from "./App.module.css";
import FullPost from "./pages/Posts/ViewFullPost";

function App() {
  const [loginState, setLoginState] = useState(false);
  const [chooseTheme, setChooseTheme] = useState(false);
  const [user_id, setUser_Id] = useState(false);
  const [post_id, setPost_Id] = useState(false);
  let theme = undefined;

  const loginChange = useCallback((uid) => {
    setLoginState(true);
    setUser_Id(uid);
  }, []);

  const logoutChange = useCallback(() => {
    setLoginState(false);
    setUser_Id(null);
  }, []);

  const grabPostID = useCallback((pid) => {
    setPost_Id(pid);
  }, []);

  const themeSwitchHandler = useCallback(() => {
    setChooseTheme(chooseTheme => !chooseTheme);
  }, []);

  if (chooseTheme === false) {
    theme = classes.LightBG;
  } else {
    theme = classes.DarkBG;
  }

  let routes;

  if (!loginState) {
    routes = (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={UserHomePage} />
        <Route path="/createPost" component={CreatePostPage} />
        <Route path="/createReply" component={CreateReplyPage} />
        <Route path="/viewPost" component={FullPostPage} />
      </Switch>
    );
  }

  return (
    <MainContext.Provider
      value={{
        loggedIn: loginState,
        login: loginChange,
        logout: logoutChange,
        themeSwitch: chooseTheme,
        setTheme: themeSwitchHandler,
        userId: user_id,
        postId: post_id,
        usePost: grabPostID
      }}
    >
      <div className={theme}>
        <Router>
          <Navbar />
          {routes}
        </Router>
      </div>
    </MainContext.Provider>
  );
}

export default App;

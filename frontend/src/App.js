import { useState, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/General/Navigation/Navbar";

import HomePage from "./pages/MainPages/HomePage";
import LoginPage from "./pages/Credentials/Login";
import SignupPage from "./pages/Credentials/Signup";
import UserHomePage from "./pages/MainPages/UserHomePage";
import CreatePostPage from "./pages/Posts/CreatePost";
import Button from "./components/General/Button/Button";

// a global function to pass variables
import { MainContext } from "./main_context";

import classes from "./App.module.css";

function App() {
  const [loginState, setLoginState] = useState(false);
  const [chooseTheme, setChooseTheme] = useState(false);
  let theme = undefined;

  const loginChange = useCallback(() => {
    setLoginState(true);
  }, []);

  const logoutChange = useCallback(() => {
    setLoginState(false);
  }, []);

  const themeSwitchHandler = useCallback(() => {
    setChooseTheme(chooseTheme => !chooseTheme);
  }, []);

  if (chooseTheme === false) {
    theme = classes.LightBG;
  } else {
    theme = classes.DarkBG;
  }

  // switch (chooseTheme) {
  //   case false:
  //     theme = ".LightTheme";
  //     break;
  //   case true:
  //     theme = ".DarkTheme";
  //     break;
  //   default:
  // }

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
        <Route exact path="/createPost" component={CreatePostPage} />
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

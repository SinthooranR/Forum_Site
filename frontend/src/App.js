import { useState, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/General/Navigation/Navbar";

import HomePage from "./pages/MainPages/HomePage";
import LoginPage from "./pages/Credentials/Login";
import SignupPage from "./pages/Credentials/Signup";
import UserHomePage from "./pages/MainPages/UserHomePage";
import CreatePostPage from './pages/Posts/CreatePost';

// a global function to pass variables
import { MainContext } from "./main_context";

import "./App.css";

function App() {
  const [loginState, setLoginState] = useState(false);

  const loginChange = useCallback(() => {
    setLoginState(true);
  }, []);

  const logoutChange = useCallback(() => {
    setLoginState(false);
  }, []);

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
        logout: logoutChange
      }}
    >
      <div className="App">
        <Router>
          <Navbar />
          {routes}
        </Router>
      </div>
    </MainContext.Provider>
  );
}

export default App;

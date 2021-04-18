import { FrontPage } from "containers/FrontPage";
import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route, //Router는 특정 page 로 direct해주는 느낌
  Switch, //여러 Router가 있을떄 switch를 이용해서 render the first one that matches url
  Link, //hyper link 개념으로 뭐 클릭하면 글로 re route시키게
  Redirect, //지정장소로 가세요
} from "react-router-dom";
import { LoginPage } from "containers/loginpage";
import { RegistrationPage } from "containers/registrationpage";
import { HomePage } from "containers/HomePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={FrontPage}></Route>
        {/* <Route
          exact
          path="/login"
          component={() => {
            window.location.href = "http://localhost:8080/login";
            return null;
          }}
        ></Route> */}
        {/* <Route exact path="/registration" component={RegistrationPage}></Route> */}
        <Route exact path="/home" component={HomePage}></Route>
        <Route>404 not found page</Route>
      </Switch>
    </Router>
  );
}

export default App;

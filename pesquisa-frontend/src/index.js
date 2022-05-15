import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "./layouts/Admin.js";
import Auth from "./layouts/Auth.js";

// views without layouts

import Landing from "./views/Landing.js";
import Profile from "./views/Profile.js";
import Index from "./views/Index.js";

import useToken from './useToken';

function AppRouter(){
  const { token, setToken } = useToken();

  // set routes without authentication
  if(!token) {
    return (
      <BrowserRouter>
        <Route path="/auth" render={ (props) => <Auth setToken={setToken} /> } />
        {/* add redirect for first page */}
        <Redirect from="*" to="/auth" />
      </BrowserRouter>
    )
  }

  // set routes with authentication
  return (
    <BrowserRouter>
      <Switch>
        {/* add routes with layouts */}
        <Route path="/admin" component={Admin} />
        {/* add routes without layouts */}
        <Route path="/landing" exact component={Landing} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/index" exact component={Index} />
        {/* add redirect for first page */}
        <Redirect from="*" to="/index" />
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <AppRouter/>,
  document.getElementById("root")
);

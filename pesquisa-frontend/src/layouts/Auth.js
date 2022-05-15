import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views

import Login from "../views/auth/Login";
import Register from "../views/auth/Register.js";

import PropTypes from 'prop-types';

export default function Auth({ setToken }) {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png").default + ")",
            }}
          ></div>
          <Switch>
            <Route path="/auth/login" exact render={ (props) => <Login setToken={setToken} /> }  />
            <Route path="/auth/register" exact component={Register} />
            <Redirect from="/" to="/auth/login" />
          </Switch>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}

Auth.propTypes = {
  setToken: PropTypes.func.isRequired
}

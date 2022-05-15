import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';

const { REACT_APP_BACKEND_URL } = process.env;

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        email: "",
        password: ""
      },
      isSubmitting: false,
      isError: false
    };
  }

  submitForm = async e => {
    e.preventDefault();
    console.log(this.state);
    this.setState({ isSubmitting: true });

    const res = await fetch( `${REACT_APP_BACKEND_URL}/login`, {
      method: "POST",
      body: JSON.stringify(this.state.values),
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.setState({ isSubmitting: false });
    const data = await res.json();
    if(!data.hasOwnProperty("error")) {
      this.setState({ message: data.success })
      this.props.setToken(data.token)
    }
    else this.setState({ message: data.message, isError: true });

    setTimeout(
      () =>
        this.setState({
          isError: false,
          message: "",
          values: { email: "", password: "" }
        }),
      1600
    );
  };

  handleInputChange = e =>
    this.setState({
      values: { ...this.state.values, [e.target.name]: e.target.value }
    });

  render() {
    return (
      <>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="flex-auto px-4 lg:px-10 py-10">
                  <div className="text-blueGray-400 text-center mb-3 font-bold">
                    <small>Bem vindo de volta! Faça login para continuar.</small>
                  </div>
                  <form onSubmit={this.submitForm}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={this.state.values.email}
                        onChange={this.handleInputChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                    </div>
  
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Senha
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={this.state.values.password}
                        onChange={this.handleInputChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Senha"
                      />
                    </div>
  
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Entrar
                      </button>
                    </div>
                  </form>
                  <div className={`message ${this.state.isError && "error"}`}>
                    {this.state.isSubmitting ? "Aguarde..." : this.state.message}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap mt-6 relative">
                <div className="w-1/2">
                  <a
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    className="text-blueGray-200"
                  >
                    <small>Esqueceu sua senha?</small>
                  </a>
                </div>
                <div className="w-1/2 text-right">
                  <Link to="/auth/register" className="text-blueGray-200">
                    <small>Crie uma conta</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default function Login({ setToken }) {
  return (
    <LogInForm setToken={setToken} />
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
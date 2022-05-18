import React, { Component, useRef } from "react";
import Select, { InputActionMeta } from 'react-select';
import useToken from '../../useToken';

const { REACT_APP_BACKEND_URL } = process.env;
// components

class CardSettingsForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      values: {
        prefix: "",
        sufix: "",
        file: ""
      },
      isSubmitting: false,
      isError: false
    };
  }

  sufixOptions = [
    { value: '.com', label: '.com' },
    { value: '.com.br', label: '.com.br' },
    { value: '.net', label: '.net' },
    { value: '.net.br', label: '.net.br' }
  ]

  protocolOptions = [
    { value: 'http://', label: 'http://' },
    { value: 'https://', label: 'https://' },
    { value: 'http://www.', label: 'http://www.' },
    { value: 'https://www.', label: 'https://www.' }
  ]

  submitForm = async e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });

    var myHeaders = new Headers();
    myHeaders.append("x-access-token", this.props.token);

    var formdata = new FormData();
    formdata.append("file", this.state.values.file);
    formdata.append("prefix", JSON.stringify(this.state.values.prefix));
    formdata.append("sufix", JSON.stringify(this.state.values.sufix));

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${REACT_APP_BACKEND_URL}/make_request`, requestOptions);

    setTimeout(
      () => {
        this.setState({ isSubmitting: false });
        this.setState({
          isError: false,
          message: "",
          values: {
            prefix: "",
            sufix: "",
            file: ""
          }
        })
        document.querySelector("[type=file]").value = ""; // gambiarra
      },
      2600
    );
  };

  handlePrefixChange = (selectedOption) => {
    this.setState({
      values: { ...this.state.values, prefix: selectedOption }
    }, () =>
      console.log(`Prefix selected:`, this.state.values.prefix)
    );
  }

  handleSufixChange = (selectedOption) => {
    this.setState({
      values: { ...this.state.values, sufix: selectedOption }
    }, () =>
      console.log(`Sufix selected:`, this.state.values.sufix)
    );
  }

  handleFileChange = e =>{
    console.log(e.target);
    console.log(e.target.value);
    this.setState({
      values: { ...this.state.values, file: e.target.files[0] }
    });
  }


  render(){
    return(
      <div className="flex-auto px-4 lg:px-10 py-10">
        <form onSubmit={this.submitForm}>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Prefixos
                </label>
                <Select
                  name="prefix"
                  value={this.state.values.prefix}
                  closeMenuOnSelect={false}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 required"
                  isMulti
                  onChange={this.handlePrefixChange}
                  options={this.protocolOptions}
                  required
                />
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Sufixos
                </label>
                <Select
                  name="sufix"
                  value={this.state.values.sufix}
                  closeMenuOnSelect={false}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150"
                  isMulti
                  onChange={this.handleSufixChange}
                  options={this.sufixOptions}
                />
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Lista de domínios (.xlsx sem cabeçalho)
                </label>
                <input
                  type="file"
                  name="file"
                  filename={this.state.values.file}
                  onChange={this.handleFileChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              type="submit"
            >
              Entrar
            </button>
          </div>
          <div className={`message ${this.state.isError && "error"}`}>
            {this.state.isSubmitting ? "A ação está sendo executada em background." : this.state.message}
          </div>
        </form>
      </div>
    )
  }
}

export default function CardSettings() {
  const { token } = useToken();
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Pesquisa de domínios</h6>
            <button
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Tutorial
            </button>
          </div>
        </div>
        <CardSettingsForm token={token} />
      </div>
    </>
  );
}

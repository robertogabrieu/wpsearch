import React, { Component } from "react";
import PropTypes from "prop-types";
import useToken from '../../useToken';
import { CSVLink } from "react-csv";

const { REACT_APP_BACKEND_URL } = process.env;

class ListRequests extends Component{
  constructor(props){
    super();

    this.state = {
      users: [],
      allUsers: [],
      isLoading: false
    }
  }

  componentDidMount(){
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", this.props.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    this.setState({isLoading: true})
    fetch(`${REACT_APP_BACKEND_URL}/list_request`, requestOptions)
      .then(response => response.text())
      .then(result => {
        this.setState({ users: JSON.parse(result) });
        this.setState({ allUsers: JSON.parse(result) });
        console.log(result);
      })
      .then(() => {
        this.setState({isLoading: false})
      })
      .catch(error => console.log('error', error));
  }

  searchUsers = e => {
    let users = this.state.allUsers;
    let searchValue = e.target.value;
    let found = users.filter( o => {
      return (
        (o.prefix+o.domain+o.sufix).toLowerCase().includes(searchValue.toLowerCase()) ||
        o.wp_text.toLowerCase().includes(searchValue.toLowerCase())
      )
    } );
    this.setState({ users: found });
  }

  mapUsers(){
    let users = this.state.users;
    let rows = []
    console.log(users)

    users.map((user) => (
      rows.push(this.renderTableLine(user))
    ))
    return rows;
  }

  renderTableLine(user){
    return(
      <tr key={user._id}>
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
          <span
            className={
              "ml-3 font-bold " +
              +(this.props.color === "light" ? "text-blueGray-600" : "text-white")
            }
          >
            {user.prefix}
          </span>
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {user.domain}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {user.sufix}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {user.status}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {user.wp_text}
        </td>
      </tr>
    )
  }

  render(){
    return(
      <>
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 flex items-center justify-between">
              <h3
                className={
                  "font-semibold text-lg flex-none " +
                  (this.props.color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Requests
              </h3>
              <div>
                <CSVLink
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-3 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                {...{
                  data: this.state.allUsers,
                  headers: [
                    { label: "Prefixo", key: "prefix" },
                    { label: "Domínio", key: "domain" },
                    { label: "Sufixo", key: "sufix" },
                    { label: "Status", key: "status" },
                    { label: "É wordpress?", key: "wp_text" }
                  ],
                  filename: 'Export.csv'
                }}>Export to CSV</CSVLink>
                <input
                  type="text"
                  name="search"
                  onChange={this.searchUsers}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-auto ease-linear transition-all duration-150"
                  placeholder="Pesquise aqui..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (this.props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Prefixo
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (this.props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Domínio
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (this.props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Sufixo
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (this.props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (this.props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Wordpress
                </th>
              </tr>
            </thead>
            <tbody>
              {
                this.mapUsers()
              }
            </tbody>
          </table>
          { this.state.isLoading && 
            <div style={{textAlign: "center", padding: "20px"}}>Aguarde... Estou buscando os dados que você pediu! :)</div> 
          }
        </div>
      </>
    )
  }
}

export default function CardTable({ color }) {
  const { token } = useToken();
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <ListRequests token={token} color={color} />
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

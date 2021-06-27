import React from "react";
import App from "../App";
import ReactDOM from "react-dom";

const Login = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    sessionStorage.setItem("authentify", true);
    window.location.reload();
    ReactDOM.render(<App />, document.getElementById("app"));
  };

  return (
    <button className="btn btn-primary" onClick={handleLogin}>
      Login
    </button>
  );
};

export default Login;

import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { toast } from "react-toastify";
import { login } from "../../api/userApi";
import PropTypes from "prop-types";

const ManageLoginPage = ({ history }) => {
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  }

  function formIsValid() {
    const _errors = {};
    if (!username) _errors.username = "Username is required";
    if (!password) _errors.password = "Password is required";
    setErrors(_errors);
    // form is valid if the erros object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setIsLogin(true);
    login(username, password)
      .then((response) => {
        debugger;
        //store authentication tokens in sessionStorage
        sessionStorage.setItem("token", response.accessToken);
        toast.success("Log in success.");
        history.push("/");
      })
      .catch((error) => {
        setIsLogin(false);
        setErrors({ onSubmit: error.message });
      });
  }

  return (
    <LoginForm
      errors={errors}
      username={username}
      password={password}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isLogin={isLogin}
    />
  );
};

ManageLoginPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ManageLoginPage;

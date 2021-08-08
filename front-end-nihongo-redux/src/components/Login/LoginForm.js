import React from "react";
import CustomInput from "../common/CustomInput";
import CustomInputPassword from "../common/CustomInputPassword";
import PropTypes from "prop-types";
import "./LoginForm.css";

const LoginForm = ({
  errors,
  username,
  password,
  isLogin,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="loginForm">
      <h2>Login Form</h2>

      <CustomInput
        id="username"
        label="Username"
        onChange={onChange}
        name="username"
        value={username}
        error={errors.username}
      />

      <CustomInputPassword
        id="password"
        label="Password"
        onChange={onChange}
        name="password"
        value={password}
        error={errors.password}
      />
      <button type="submit" disabled={isLogin} className="validFormButton">
        {isLogin ? "Log in progress..." : "Log in"}
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  errors: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
};

export default LoginForm;

import React from "react";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import { isConnected } from "../../utils/userUtils";

const Gestion = () => {
  return <>{!isConnected() ? <Login /> : <Logout />}</>;
};

export default Gestion;

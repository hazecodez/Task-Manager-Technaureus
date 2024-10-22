import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";


const Public= ({ children }) => {
  const logged = localStorage.getItem("token");
  if (!logged) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
};

export default Public;

Public.propTypes = {
    children: PropTypes.node.isRequired
}
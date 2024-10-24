import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const Protect = ({ children }) => {
  const logged = localStorage.getItem("token");
  if (logged) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Protect;

Protect.propTypes = {
  children: PropTypes.node.isRequired,
};

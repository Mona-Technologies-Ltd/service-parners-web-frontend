import React from "react";

const ProtectedRoute = ({ children }) => {
  // Always return children to allow access
  return children;
};

export default ProtectedRoute;

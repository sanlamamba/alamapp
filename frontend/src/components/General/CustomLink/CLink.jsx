import React from "react";
import { Link } from "react-router-dom";

export default function CLink({ path, label, customClass = " " }) {
  return (
    <Link to={path}>
      <span className={customClass}>{label}</span>
    </Link>
  );
}

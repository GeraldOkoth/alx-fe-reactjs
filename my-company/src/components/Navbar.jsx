import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{backgroundColor: '#f3f3f3', display: 'flex', justifyContent: 'space-around'}}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/services">Services</Link>
      <Link to="/contact">Contact</Link>
      {/* <Link to="/not-found">Not Found</Link> */}
    </div>
  );
}

export default Navbar;

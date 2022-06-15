import React from "react";
import { Nav, NavLink, NavMenu } from "./StyleElements";

function NavBar() {
  return (
    <div className="navbar">
      <Nav>
        <NavMenu>
          <NavLink to="/">
            Home
          </NavLink>
          <NavLink to="/residents">
            Residents
          </NavLink>
          <NavLink to="/resident_intake">Resident Intake</NavLink>
        </NavMenu>
      </Nav>
    </div>
  );
}

export default NavBar;
import React from "react";
import {NavLink} from "react-router-dom";

const NavItem = (props) => {

const dropdown = <div>HI</div>
const navLink = <NavLink to={props.to} exact={props.exact}>{props.routeName}</NavLink>

  return(
      <div>
      {props.isNav ? navLink : dropdown}
      </div>
  );

}
export default NavItem;

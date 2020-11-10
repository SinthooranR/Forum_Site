import React from "react";
import {NavLink} from "react-router-dom";
import classes from './NavItem.module.css'

const NavItem = (props) => {


  return(
      <div className={classes.NavItem}>
      <NavLink to={props.to} exact={props.exact} activeStyle={{color: "black"}} style={props.style}>{props.routeName}</NavLink>
      </div>
  );

}
export default NavItem;

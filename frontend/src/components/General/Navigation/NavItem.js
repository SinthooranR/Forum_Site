import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {MainContext} from "../../../main_context";
import classes from './NavItem.module.css'

const NavItem = (props) => {

  const linkContext = useContext(MainContext);
  let linkTheme;
  let activeStyleTheme;

  if(linkContext.themeSwitch === false){
    linkTheme = classes.LightLink
    activeStyleTheme = "black"
  }
  else{
    linkTheme = classes.DarkLink
    activeStyleTheme = "white"
  }

  return(
      <div className={[classes.NavItem, linkTheme].join(" ")}>
      <NavLink to={props.to} exact={props.exact} activeStyle={{borderTop: `solid 1px ${activeStyleTheme}`}}>{props.routeName}</NavLink>
      </div>
  );

}
export default NavItem;

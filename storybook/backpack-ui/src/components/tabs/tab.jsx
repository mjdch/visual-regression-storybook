import React from "react";
import PropTypes from "prop-types";
import radium from "radium";
import { NavigationTab } from "../navigation";

const Tab = (props) => (
  <NavigationTab {...props}>
    {props.label}
  </NavigationTab>
);

Tab.propTypes = {
  label: PropTypes.string.isRequired,
};

export default radium(Tab);

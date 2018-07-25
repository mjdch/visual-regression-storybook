import React from "react";
import PropTypes from "prop-types";
import radium from "radium";
import colors from "../../styles/colors";
import { textBodyArticleSmall } from "../../utils/typography";
import propTypes from "../../utils/propTypes";

const styles = Object.assign({}, {
  color: colors.textPrimary,
  marginBottom: 0,
  marginTop: 0,
}, textBodyArticleSmall());

const TextBodyArticleSmall = (props) => (
  <p {...props} style={[styles, props.style]}>
    {props.children}
  </p>
);

TextBodyArticleSmall.propTypes = {
  children: PropTypes.node.isRequired,
  style: propTypes.style,
};

export default radium(TextBodyArticleSmall);

import React from "react";
import PropTypes from "prop-types";
import radium from "radium";

import colors from "../../styles/colors";
import Bullet from "../bullet";


const styles = {
  color: colors.accentGray,
  fontSize: "11px",
  letterSpacing: "0.4px",
  textTransform: "uppercase",
};

const BulletDescription = ({ description, style }) => (
  <div className="BulletDescription" style={[styles, style]}>
    {description.map((item, index) => {
      if (index !== 0) {
        return <span key={index}><Bullet space="both" />{item}</span>;
      }

      return <span key={index}>{item}</span>;
    })}
  </div>
);

BulletDescription.propTypes = {
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ]),
  ),
};

export default radium(BulletDescription);

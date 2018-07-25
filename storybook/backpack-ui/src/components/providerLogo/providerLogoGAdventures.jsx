import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { LogoGAdventuresColor } from "../icon";

function ProviderLogoGAdventures({ className, style }) {
  return (
    <LogoGAdventuresColor
      className={cn(className)}
      style={style}
      label="GAdventures"
    />
  );
}

ProviderLogoGAdventures.propTypes = {
  className: PropTypes.string,
  style: PropTypes.objectOf(
    PropTypes.string,
    PropTypes.number,
  ),
};

ProviderLogoGAdventures.defaultProps = {
  className: "",
  style: {},
};

export default ProviderLogoGAdventures;

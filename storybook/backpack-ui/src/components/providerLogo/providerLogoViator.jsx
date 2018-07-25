import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { LogoViatorColor } from "../icon";

function ProviderLogoViator({ className, style }) {
  return (
    <LogoViatorColor
      className={cn(className)}
      style={style}
      label="Viator"
    />
  );
}

ProviderLogoViator.propTypes = {
  className: PropTypes.string,
  style: PropTypes.objectOf(
    PropTypes.string,
    PropTypes.number,
  ),
};

ProviderLogoViator.defaultProps = {
  className: "",
  style: {},
};

export default ProviderLogoViator;

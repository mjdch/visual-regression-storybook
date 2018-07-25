import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { LogoBookingDotcomColor } from "../icon";

function ProviderLogoBookingDotcom({ className, style }) {
  return (
    <LogoBookingDotcomColor
      className={cn(className)}
      style={style}
      label="booking.com"
    />
  );
}

ProviderLogoBookingDotcom.propTypes = {
  className: PropTypes.string,
  style: PropTypes.objectOf(
    PropTypes.string,
    PropTypes.number,
  ),
};

ProviderLogoBookingDotcom.defaultProps = {
  className: "",
  style: {},
};

export default ProviderLogoBookingDotcom;

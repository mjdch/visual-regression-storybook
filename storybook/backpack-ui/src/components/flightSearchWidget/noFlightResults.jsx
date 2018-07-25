import React from "react";
import radium from "radium";
import PropTypes from "prop-types";
import Button from "../button";
import mq from "../../styles/mq";

const styles = {
  container: {
    [`@media (max-width: ${mq.max[768]})`]: {
      textAlign: "center",
    },
  },
  message: {
    marginRight: "16px",
    [`@media (max-width: ${mq.max[768]})`]: {
      display: "block",
    },
  },
};

const NoFlightResults = ({ children, destinationName, link, buttonText }) => (
  <div style={styles.container}>
    <span style={styles.message}>
      {destinationName ? `We couldn't find any matching flights to ${destinationName}` : children}
    </span>
    {link && <Button
      rounded
      target="_blank"
      rel="noopener noreferrer"
      href={link}
    >
      {buttonText}
    </Button>}
  </div>
);

NoFlightResults.propTypes = {
  children: PropTypes.string,
  buttonText: PropTypes.string,
  link: PropTypes.string,
  destinationName: PropTypes.string,
};

NoFlightResults.defaultProps = {
  children: "We couldn't find any matching flights",
  buttonText: "Search for Flights",
};

export default radium(NoFlightResults);
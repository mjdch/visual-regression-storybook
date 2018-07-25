import React, { Component } from "react";
import PropTypes from "prop-types";
import radium from "radium";
import kebabCase from "lodash/kebabCase";

import colors from "../../styles/colors";
import timing from "../../styles/timing";
import zIndex from "../../styles/zIndex";
import font from "../../utils/font";
import { rgba } from "../../utils/color";
import propTypes from "../../utils/propTypes";
import Icon from "../icon";

const _ = { kebabCase };

const styles = {
  container: {
    display: "inline-block",
    fontFamily: font("benton"),
    verticalAlign: "top",
  },

  label: {
    color: colors.textPrimary,
    cursor: "pointer",
    display: "block",
    fontSize: "13px",
    lineHeight: 1,
    position: "relative",
  },

  text: {
    display: "block",
    lineHeight: 1,
  },

  checkmark: {
    borderColor: rgba(colors.textPrimary, 0.5),
    borderStyle: "solid",
    borderWidth: "1px",
    color: colors.bgPrimary,
    display: "block",
    left: 0,
    position: "absolute",
    textAlign: "center",
    top: 0,
    transition: `background-color ${timing.fast},
      border-color ${timing.fast}`,
    userSelect: "none",
    zIndex: zIndex.default,

    ":focus": {
      borderColor: colors.textPrimary,
      outline: 0,
    },
  },

  checkmarkNoBorder: {
    borderColor: "transparent",
  },

  checkmarkChecked: {
    backgroundColor: colors.linkPrimary,
    borderColor: colors.linkPrimary,
  },

  input: {
    backgroundColor: colors.bgPrimary,
    border: 0,
    left: 0,
    margin: 0,
    opacity: 0,
    position: "absolute",
    top: 0,
    WebkitAppearance: "none",
  },

  icon: {
    color: colors.textOverlay,
    display: "block",
    filter: `drop-shadow(${rgba(colors.bgOverlay, 0.2)} 0 1px 1px)`,
    left: "-1px",
    position: "absolute",
    top: "-1px",
  },
};


class CheckboxComponent extends Component {
  render() {
    const {
      checked,
      onClick,
      id,
      value,
      size,
      name,
      label,
      required,
      rounded,
      type,
      removeBorder,
      innerRef,
      style,
    } = this.props;

    const textPadding = {
      16: {
        paddingBottom: "1px",
        paddingLeft: "28px",
        paddingTop: "2px",
      },
      24: {
        paddingBottom: "5px",
        paddingLeft: "36px",
        paddingTop: "6px",
      },
      32: {
        paddingBottom: "9px",
        paddingLeft: "44px",
        paddingTop: "10px",
      },
    };

    return (
      <span
        className="Checkbox"
        id={_.kebabCase(id)}
        ref={_.kebabCase(id)}
        style={[
          styles.container,
          style,
        ]}
      >
        <label
          htmlFor={`${_.kebabCase(id)}-input`}
          style={[
            styles.label,
            { height: `${size}px` },
            label ? { width: "auto" } : { width: `${size}px` },
          ]}
        >
          <span
            ref={innerRef}
            tabIndex="0"
            style={[
              styles.checkmark,
              {
                fontSize: `${size}px`,
                height: "1em",
                width: "1em",
              },
              rounded && { borderRadius: "100%" },
              removeBorder && styles.checkmarkNoBorder,
              checked && styles.checkmarkChecked,
            ]}
          >
            <Icon.Checkbox
              style={Object.assign({}, styles.icon, checked ? { opacity: 1 } : { opacity: 0 })}
            />
          </span>

          {label && <span style={[styles.text, textPadding[size]]}>{label}</span>}

          <input
            id={`${_.kebabCase(id)}-input`}
            type={type}
            style={[
              styles.input,
              {
                height: `${size}px`,
                width: `${size}px`,
              },
            ]}
            value={value}
            name={_.kebabCase(name)}
            onClick={onClick}
            required={required && !checked}
          />
        </label>
      </span>
    );
  }
}

CheckboxComponent.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf([16, 24, 32]),
  required: PropTypes.bool,
  rounded: PropTypes.bool,
  type: PropTypes.oneOf(["checkbox", "radio"]),
  removeBorder: PropTypes.bool,
  innerRef: PropTypes.func,
  style: propTypes.style,
};

CheckboxComponent.defaultProps = {
  checked: false,
  onClick: null,
  size: 16,
  required: false,
  type: "checkbox",
  rounded: false,
  removeBorder: false,
  innerRef: null,
};

export default radium(CheckboxComponent);

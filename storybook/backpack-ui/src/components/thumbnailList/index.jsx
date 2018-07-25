import React from "react";
import PropTypes from "prop-types";
import radium from "radium";
import {
  fontSizeHeading6,
  lineHeightHeading6,
  fontWeightRegular,
} from "../../styles/typography";
import colors from "../../styles/colors";
import media from "../../styles/mq";
import Heading from "../../components/heading";
import propTypes from "../../utils/propTypes";

const styles = {
  heading: {
    default: {
      display: "inline-block",
      fontSize: `${fontSizeHeading6}px`,
      fontWeight: fontWeightRegular,
      lineHeight: lineHeightHeading6,

      [`@media (min-width: ${media.min["480"]})`]: {
        marginBottom: "8px",
      },
    },

    light: {
      color: colors.textPrimary,
    },

    dark: {
      color: colors.textOverlay,
    },
  },

  child: {
    default: {
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      paddingBottom: "16px",
      paddingTop: "16px",
    },

    light: {
      borderBottomColor: colors.borderPrimary,
    },

    dark: {
      borderBottomColor: "#474747",
    },
  },
};

const ThumbnailList = ({
  heading,
  children,
  theme,
  style,
}) => (
  <div
    className="ThumbnailList"
    style={style}
  >
    {heading &&
      <header>
        <Heading
          level={2}
          override={{
            ...styles.heading.default,
            ...styles.heading[theme],
          }}
        >
          {heading}
        </Heading>
      </header>
    }

    {React.Children.map(children, (child, index) => (
      <div
        style={[
          styles.child.default,
          styles.child[theme],
          index === children.length - 1 ? { borderBottomWidth: "0px" } : {},
        ]}
      >
        {child}
      </div>
    ))}
  </div>
);

ThumbnailList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  heading: PropTypes.string,
  theme: PropTypes.oneOf(["light", "dark"]),
  style: propTypes.style,
};

ThumbnailList.defaultProps = {
  heading: "",
  theme: "light",
  style: null,
};

export default radium(ThumbnailList);

import React from "react";
import PropTypes from "prop-types";
import radium from "radium";

import colors from "../../styles/colors";
import timing from "../../styles/timing";
import Link from "../link";
import CoverPhoto from "../coverPhoto";
import propTypes from "../../utils/propTypes";

const styles = {
  container: {
    overflow: "hidden",
    position: "relative",
  },

  anchor: {
    display: "block",
  },

  coverPhoto: {
    transition: `transform ${timing.slow} ease-in-out`,
  },
};

const imageSizes = {
  video: {
    width: 410,
    height: 232,
  },
  poster: {
    width: 300,
    height: 378,
  },
};

const CardImage = ({
  href,
  onClick,
  src,
  aspectRatio,
  children,
  opacity,
  style,
}) => (
  <div
    className="Card-image"
    style={[
      styles.container,
      opacity && { backgroundColor: colors.bgOverlay },
      style,
    ]}
  >
    <Link
      to={href}
      onClick={onClick}
      tabIndex={-1}
      style={styles.anchor}
    >
      {src &&
        <CoverPhoto
          src={src}
          width={imageSizes[aspectRatio].width}
          height={imageSizes[aspectRatio].height}
          style={[
            styles.coverPhoto,
            { opacity },
          ]}
        />
      }

      {children}
    </Link>
  </div>
);

CardImage.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  src: PropTypes.string.isRequired,
  aspectRatio: PropTypes.oneOf([
    "video",
    "poster",
  ]).isRequired,
  children: PropTypes.node,
  opacity: PropTypes.number,
  style: propTypes.style,
};

CardImage.defaultProps = {
  aspectRatio: "video",
};

export default radium(CardImage);

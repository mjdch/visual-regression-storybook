import React from "react";
import PropTypes from "prop-types";
import radium from "radium";

import colors from "../../styles/colors";
import timing from "../../styles/timing";
import { span, percentage } from "../../utils/grid";

const styles = {
  container: {
    base: {
      fontSize: "10px",
      opacity: 1,
      transition: `opacity ${timing.default}`,
    },

    sidebar: {
      marginTop: `${35 / 10}em`,
    },
  },

  image: {
    base: {
      display: "block",
    },

    sidebar: {
      height: "auto",
      maxHeight: `${90 / 10}em`,
      maxWidth: `${278 / 10}em`,
      width: percentage("278px", `${span(3, "static")}`),
    },
  },

  attribution: {
    base: {
      color: colors.textSecondary,
      display: "inline-block",
      fontSize: `${9 / 10}em`,
      letterSpacing: ".1px",
      marginTop: `${4 / 10}em`,
    },

    link: {
      color: "currentColor",
    },
  },
};

/**
 * Generate a static map
 */
function StaticMap({ token, location, size, sidebar, hideAttribution, name, url, zoom }) {
  const mapBaseUrl = "http://api.tiles.mapbox.com/v4/lonelyplanet.b963d424";
  const customMarkerUrl = "https://assets.staticlp.com/assets/mapPin-primary-small.png";
  const customMarker = `url-${encodeURIComponent(customMarkerUrl)}(${location})`;
  const mapImageUrl = `${mapBaseUrl}/${customMarker}/${location},${zoom}/${size}.png?access_token=${token}`;

  return (
    <div
      className="StaticMap"
      style={[
        styles.container.base,
        sidebar && styles.container.sidebar,
      ]}
    >
      {url &&
        <a
          href={url}
          style={[
            styles.image.base,
            sidebar && styles.image.sidebar,
          ]}
        >
          <img
            className="StaticMap-image"
            src={mapImageUrl}
            alt=""
            data-pin-nopin
          />
        </a>
      }

      {!url &&
        <img
          className="StaticMap-image"
          style={[
            styles.image.base,
            sidebar && styles.image.sidebar,
          ]}
          src={mapImageUrl}
          alt={name && `Location of ${name} on map`}
          data-pin-nopin
        />
      }

      {!hideAttribution &&
        <small
          className="StaticMap-attribution"
          style={styles.attribution.base}
        >
          &copy; <a style={styles.attribution.link} href="https://www.mapbox.com/map-feedback/">Mapbox</a>
          &copy; <a style={styles.attribution.link} href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>
        </small>
      }
    </div>
  );
}

StaticMap.propTypes = {
  /**
   * Mapbox API token
   */
  token: PropTypes.string.isRequired,

  /**
   * Location string as lontxlat
   */
  location: PropTypes.string.isRequired,

  /**
   * Size for the static image in width x height
   * Defaults to 640x480
   */
  size: PropTypes.string,

  /**
   * If the static map is located within the sidebar (POI)
   */
  sidebar: PropTypes.bool,

  /**
   * Hide the map's attribution and copyright notice
   */
  hideAttribution: PropTypes.bool,

  /**
   * Name of location; this can be POI or place
   */
  name: PropTypes.string,

  /**
   * URL string to wrap an anchor link around the map image
   */
  url: PropTypes.string,

  /**
   * Zoom Level for Map
   */
  zoom: PropTypes.string,
};

const token = "pk.eyJ1IjoibG9uZWx5cGxhbmV0IiwiYSI6Imh1ODUtdUEifQ.OLLon0V6rcoTyayXzzUzsg";

StaticMap.defaultProps = {
  token,
  location: "",
  size: "640x480",
  sidebar: false,
  hideAttribution: false,
  name: "",
  url: "",
  zoom: "10",
};

StaticMap.styles = styles;

export default radium(StaticMap);

import React from "react";
import PropTypes from "prop-types";
import { Style } from "radium";
import SocialShareContainer from "../socialShareContainer";
import ShareMenu from "../shareMenu";
import IconButton from "../iconButton";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  buttonContainer: {
    marginTop: "4px",
  },

  buttonBackground: {
    borderRadius: "15% !important",
  },
};

const Menu = ({
  previewLink,
  downloadLink,
  shareText,
  shareUrl,
  hideShareButton,
}) => (
  <div style={styles.container}>
    <Style
      scopeSelector=".IconButton-background"
      rules={styles.buttonBackground}
    />
    { !hideShareButton &&
      <div style={styles.buttonContainer}>
        <SocialShareContainer
          text={shareText}
          url={shareUrl}
          menuPosition="left"
          hide={["facebookMessenger", "reddit"]}
        >

          {ShareMenu}

        </SocialShareContainer>
      </div>}
    <div style={styles.buttonContainer}>
      <IconButton
        shadow
        iconName="Search"
        label="Preview"
        style={[styles.button, styles.playButton]}
        size={32}
        href={previewLink}
      />
    </div>
    <div style={styles.buttonContainer}>
      <IconButton
        shadow
        iconName="Download"
        label="Download"
        style={[styles.button, styles.playButton]}
        size={32}
        href={downloadLink}
      />
    </div>
  </div>
);

Menu.propTypes = {
  previewLink: PropTypes.string.isRequired,
  downloadLink: PropTypes.string.isRequired,
  shareText: PropTypes.string,
  shareUrl: PropTypes.string,
  hideShareButton: PropTypes.bool,
};

Menu.defaultProps = {
  hideShareButton: false,
};

export default Menu;

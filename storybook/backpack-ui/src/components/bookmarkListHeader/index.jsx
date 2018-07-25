import React from "react";
import PropTypes from "prop-types";
import radium from "radium";
import {
  fontSizeHeading4,
  fontSizeBodyArticle,
  fontSizeBodyArticleSmall,
  fontSizeBodySmall,
  fontSizeUppercase,
  fontWeightMedium,
  lineHeightHeading4,
} from "../../styles/typography";
import mq from "../../styles/mq";
import AvatarMarker from "../avatarMarker";
import { TextAccent, TextHeading } from "../text";
import colors from "../../styles/colors";
import { rgba } from "../../utils/color";

const styles = {
  header: {
    display: "flex",
    flexWrap: "wrap",

    [`@media (max-width: ${mq.max[768]})`]: {
      flexDirection: "column",
    },
  },

  avatarMarker: {
    container: {
      fontSize: `${fontSizeUppercase}px`,
      fontWeight: fontWeightMedium,
      marginBottom: "16px",
      order: 1,
      textTransform: "uppercase",

      [`@media (min-width: ${mq.min[768]})`]: {
        fontSize: `${fontSizeBodySmall}px`,
        marginBottom: 0,
        order: 3,
      },
    },

    username: {
      alignSelf: "center",
      color: rgba(colors.textPrimary, 0.5),
      marginLeft: "8px",
      maxWidth: "none",
      paddingTop: "3px",
    },
  },

  name: {
    order: 2,

    [`@media (max-width: ${mq.max[768]})`]: {
      marginBottom: "6px",
      fontSize: `${fontSizeHeading4}px`,
      lineHeight: lineHeightHeading4,
    },

    [`@media (min-width: ${mq.min[768]})`]: {
      width: "100%",
    },
  },

  meta: {
    fontSize: `${fontSizeBodyArticleSmall}px`,
    letterSpacing: ".4px",
    order: 2,

    [`@media (min-width: ${mq.min[768]})`]: {
      fontSize: `${fontSizeBodyArticle}px`,
      letterSpacing: ".5px",
      marginRight: "24px",
    },
  },
};

const BookmarkListHeader = ({
  profileHref,
  avatarSrc,
  username,
  name,
  entriesCount,
  visibility,
  style,
}) => (
  <header
    className="BookmarkListHeader"
    style={[styles.header, style]}
  >
    <AvatarMarker
      href={profileHref}
      src={avatarSrc}
      username={username}
      style={styles.avatarMarker.container}
      usernameStyle={styles.avatarMarker.username}
    />

    <TextHeading
      size={3}
      level={2}
      weight="medium"
      style={styles.name}
    >
      {name}
    </TextHeading>

    <TextAccent style={styles.meta}>
      {entriesCount} place{entriesCount !== 1 && "s"} · {visibility}
    </TextAccent>
  </header>
);

BookmarkListHeader.propTypes = {
  profileHref: PropTypes.string.isRequired,
  avatarSrc: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  entriesCount: PropTypes.number.isRequired,
  visibility: PropTypes.oneOf(["Private", "Public"]).isRequired,
  style: PropTypes.objectOf(PropTypes.object),
};

export default radium(BookmarkListHeader);

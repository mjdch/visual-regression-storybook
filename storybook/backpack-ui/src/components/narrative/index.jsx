import React from "react";
import PropTypes from "prop-types";
import { Style } from "radium";

import colors from "../../styles/colors";
import mq from "../../styles/mq";
import { rgb } from "../../utils/color";
import { gutter, span, add, percentage } from "../../utils/grid";
import ArticleAuthor from "../articleAuthor";
import ContentBlock from "../contentBlock";
import Icon from "../icon";

const mediaQuery = `${667 * 0.0625}em`;

const maxWidth = add([span(7, "static"), gutter("static")], "static");

const scopedStyles = {
  ".Icon": {
    fontSize: "3rem",
  },

  mediaQueries: {
    [`(min-width: ${mediaQuery})`]: {
      ".Icon": {
        fontSize: "4rem",
      },
    },

    [`(max-width: ${mq.max[768]})`]: {
      ".Narrative-content": {
        borderTop: `1px solid ${colors.borderPrimary}`,
        marginTop: "2rem",
        paddingTop: "2.5rem",
      },

      ".Narrative-aside": {
        textAlign: "center",
      },

      ".Narrative-profile": {
        borderBottom: `1px solid ${colors.borderPrimary}`,
        paddingBottom: gutter("static"),
      },
    },

    [`(min-width: ${mq.min[768]})`]: {
      ".Narrative-content": {
        borderLeft: `2px solid rgba(${rgb(colors.linkPrimary)}, .4)`,
        float: "left",
        paddingLeft: gutter("static"),
        width: percentage(add([span(6, "static"), gutter("static")], "static"), maxWidth),
      },

      ".Narrative-aside": {
        float: "left",
        width: percentage(span(1, "static"), maxWidth),
      },

      ".Narrative-profile": {
        borderTop: `1px solid ${colors.borderPrimary}`,
        clear: "left",
        marginTop: "4.2rem",
        position: "relative",
        width: "100%",
      },

      ".Narrative-profile::before": {
        backgroundColor: colors.bgPrimary,
        content: "''",
        display: "block",
        height: "calc(100% + 2.2rem)",
        left: "-3.2rem",
        position: "absolute",
        top: "-2.2rem",
        width: ".2rem",
      },
    },
  },
};

/**
 * Intro narrative for POI
 */
function Narrative({ heading, htmlContent, author }) {
  return (
    <div className="Narrative">
      <Style
        scopeSelector=".Narrative"
        rules={scopedStyles}
      />

      <aside className="Narrative-aside">
        <Icon.DiamondLogo fill={colors.linkPrimary} />
      </aside>

      <div className="Narrative-content">
        <ContentBlock
          heading={heading}
          htmlContent={htmlContent}
        />
        {author &&
          <div className="Narrative-profile">
            <ArticleAuthor
              name={author.name}
              title={author.title}
              avatarSrc={author.avatar}
              href={author.url}
              orientation="horizontal"
            />
          </div>
        }
      </div>
    </div>
  );
}

Narrative.propTypes = {
  /**
   * Title of the narrative
   */
  heading: PropTypes.string.isRequired,

  /**
   * HTML formatted content
   */
  htmlContent: PropTypes.string.isRequired,

  /**
   * Author object
   */
  author: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    avatar: PropTypes.string,
    url: PropTypes.string,
  }),
};

Narrative.defaultProps = {
  heading: "",
  htmlContent: "",
  author: null,
};

Narrative.styles = scopedStyles;

export default Narrative;

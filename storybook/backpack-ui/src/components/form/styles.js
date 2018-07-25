import colors from "../../styles/colors";
import mq from "../../styles/mq";
import timing from "../../styles/timing";
import { fontWeightLight } from "../../styles/typography";
import { lighten, darken, rgb } from "../../utils/color";
import { outline } from "../../utils/mixins";

const icons = {
  triangle: {
    base: encodeURIComponent(`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="${colors.textPrimary}"><path d="M32 6.857h-32l16 18.286z"></path></svg>`),
    light: encodeURIComponent(`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="${colors.bgPrimary}"><path d="M32 6.857h-32l16 18.286z"></path></svg>`),
  },
};

const styles = {
  base: {
    appearance: "none",
    WebkitAppearance: "none",
    fontWeight: fontWeightLight,
    borderRadius: 0,
    borderStyle: "solid",
    borderWidth: ".1rem",
    height: "auto",
    outline: 0,
    transition: `border-color ${timing.fast}, color ${timing.fast}`,
    width: "100%",
  },

  size: {
    tiny: {
      fontSize: "11px",
      paddingTop: `${7 / 11}em`,
      paddingLeft: `${7 / 11}em`,
      paddingRight: `${7 / 11}em`,
      paddingBottom: `${3 / 11}em`,
    },
    small: {
      fontSize: "11px",
      paddingTop: "1em",
      paddingLeft: "1em",
      paddingRight: "1em",
      paddingBottom: `${7 / 11}em`,
    },
    medium: {
      fontSize: "13px",
      paddingTop: `${15 / 13}em`,
      paddingLeft: `${15 / 13}em`,
      paddingRight: `${15 / 13}em`,
      paddingBottom: `${11 / 13}em`,
    },
    large: {
      fontSize: "15px",
      paddingTop: `${19 / 15}em`,
      paddingLeft: `${19 / 15}em`,
      paddingRight: `${19 / 15}em`,
      paddingBottom: "1em",
    },
    huge: {
      fontSize: "16px",
      paddingTop: `${23 / 16}em`,
      paddingLeft: `${20 / 16}em`,
      paddingRight: `${20 / 16}em`,
      paddingBottom: `${19 / 16}em`,
    },
  },

  theme: {
    base: {
      backgroundColor: colors.bgPrimary,
      borderColor: darken(colors.bgPrimary, 17),
      color: colors.textPrimary,

      ":focus": {
        borderColor: darken(colors.borderPrimary, 20),
      },
    },
    light: {
      backgroundColor: "transparent",
      borderColor: `rgba(${rgb(colors.bgPrimary)}, .44)`,
      color: colors.bgPrimary,

      ":focus": {
        borderColor: `rgba(${rgb(colors.bgPrimary)}, .66)`,
      },
    },
    dark: {
      backgroundColor: colors.bgPrimary,
      borderColor: darken(colors.bgPrimary, 17),
      color: `rgba(${rgb(colors.textPrimary)}, .72)`,

      ":focus": {
        borderColor: darken(colors.borderPrimary, 20),
      },
    },
    inputGroup: {
      backgroundColor: colors.bgPrimary,
      borderColor: "transparent",
      borderRadius: 0,
      borderWidth: 0,
      color: colors.textPrimary,

      ":focus": {
        borderColor: colors.bgPrimary,
      },
    },
    float: {
      fontSize: "16px",
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      backgroundColor: "transparent",
      boxShadow: "none",
      paddingTop: "16px",
      paddingBottom: "16px",
      paddingLeft: 0,
      borderBottom: 0,
      ":focus": outline(),
    },
  },

  element: {
    input: {
      base: {},
      size: {
        tiny: {},
        small: {},
        medium: {},
        large: {},
        huge: {},
      },
      theme: {
        base: {},
        light: {},
        dark: {},
        inputGroup: {
          paddingTop: "4rem",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          paddingBottom: "1.3rem",
          [`@media (min-width: ${mq.min[768]})`]: {
            paddingTop: "3.5rem",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            paddingBottom: "1rem",
          },
        },
      },
    },
    dateInput: {
      base: {
        cursor: "text",
        userSelect: "none",

        ":focus": {
          borderColor: "currentColor",
          color: colors.linkPrimary,
        },
      },
      theme: {
        base: {
          ":focus": {
            borderColor: darken(colors.bgPrimary, 17),
          },
        },
        light: {
          ":focus": {
            borderColor: `rgba(${rgb(colors.bgPrimary)}, .44)`,
          },
        },
        dark: {
          ":focus": {
            borderColor: darken(colors.bgPrimary, 17),
          },
        },
        inputGroup: {
          ":focus": {
            borderColor: "transparent",
          },
        },
      },
    },
    select: {
      base: {
        backgroundRepeat: "no-repeat",
        cursor: "pointer",
      },
      size: {
        tiny: {
          backgroundPosition: "calc(100% - .7rem) center",
          backgroundSize: ".6rem",
        },
        small: {
          backgroundPosition: "calc(100% - 1.1rem) center",
          backgroundSize: ".8rem",
        },
        medium: {
          backgroundPosition: "calc(100% - 1.5rem) center",
          backgroundSize: ".8rem",
        },
        large: {
          backgroundPosition: "calc(100% - 1.9rem) center",
          backgroundSize: "1rem",
        },
        huge: {
          backgroundPosition: "calc(100% - 2.3rem) center",
          backgroundSize: "1.2rem",
        },
      },
      theme: {
        base: {
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,${icons.triangle.base}")`,
        },
        light: {
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,${icons.triangle.light}")`,
        },
        dark: {
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,${icons.triangle.base}")`,
        },
        inputGroup: {
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,${icons.triangle.base}")`,
          backgroundPosition: "calc(100% - 2rem) 4.5rem",
          paddingTop: "4rem",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          paddingBottom: "1.3rem",

          [`@media (min-width: ${mq.min[768]})`]: {
            backgroundPosition: "calc(100% - 2rem) 3.5rem",
            paddingTop: "3.5rem",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
            paddingBottom: "1rem",
          },
        },
      },
    },
    textarea: {
      base: {
        resize: "none",
        verticalAlign: "bottom",
      },
      size: {
        tiny: {},
        small: {},
        medium: {},
        large: {},
        huge: {},
      },
      theme: {
        base: {},
        light: {},
        dark: {},
        inputGroup: {},
      },
    },
    numberInput: {
      container: {
        base: {
          position: "relative",
        },
      },

      button: {
        base: {
          backgroundColor: colors.bgPrimary,
          borderLeft: ".1rem solid",
          borderLeftColor: darken(colors.bgPrimary, 17),
          color: colors.linkPrimary,
          display: "block",
          height: "calc(100% - .2rem)",
          position: "absolute",
          top: ".1rem",
          transition: `color ${timing.default}`,

          ":hover": {
            color: lighten(colors.linkPrimary, 7),
          },
          ":focus": {
            color: lighten(colors.linkPrimary, 7),
          },
          ":active": {
            color: lighten(colors.linkPrimary, 7),
          },
        },

        size: {
          tiny: {
            fontSize: "1.1rem",
            width: "2.5rem",
          },
          small: {
            fontSize: "1.3rem",
            width: "3.3rem",
          },
          medium: {
            fontSize: "1.5rem",
            width: "4.4rem",
          },
          large: {
            fontSize: "2.2rem",
            width: "5.4rem",
          },
          huge: {
            fontSize: "2.2rem",
            width: "6.2rem",
          },
        },

        plus: {
          size: {
            tiny: {
              right: "2.6rem",
            },
            small: {
              right: "3.4rem",
            },
            medium: {
              right: "4.5rem",
            },
            large: {
              right: "5.5rem",
            },
            huge: {
              right: "6.3rem",
            },
          },
        },

        minus: {
          right: ".1rem",
        },
      },
    },
  },

  state: {
    alert: {},
    error: {},
    info: {},
    success: {},
  },

  fill: {
    display: "block",
    width: "100%",
  },

  noBorder: {
    borderWidth: 0,
  },
};

export default styles;

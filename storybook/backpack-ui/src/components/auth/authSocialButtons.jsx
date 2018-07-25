import React from "react";
import PropTypes from "prop-types";
import radium from "radium";
import cn from "classnames";
import SocialLoginButton from "../socialLoginButton";
import propTypes from "../../utils/propTypes";

const styles = {
  spacing: {
    marginBottom: "16px",
  },
};

const AuthSocialButtons = ({ actions, style, className }) => (
  <div
    className={cn("AuthSocialButtons", className)}
    style={[styles.spacing, style]}
  >
    {actions.facebook && <SocialLoginButton
      style={styles.spacing}
      iconName="FacebookBlockColor"
      onClick={actions.facebook}
    >
      Continue with Facebook
    </SocialLoginButton>}

    {actions.twitter && <SocialLoginButton
      style={styles.spacing}
      iconName="TwitterColor"
      onClick={actions.twitter}
    >
      Continue with Twitter
    </SocialLoginButton>}


    {actions.google && <SocialLoginButton
      iconName="GoogleColor"
      onClick={actions.google}
    >
      Continue with Google
    </SocialLoginButton>}
  </div>
);

AuthSocialButtons.propTypes = {
  actions: PropTypes.shape({
    facebook: PropTypes.func,
    twitter: PropTypes.func,
    google: PropTypes.func,
  }).isRequired,
  style: propTypes.style,
  className: propTypes.string,
};

export default radium(AuthSocialButtons);

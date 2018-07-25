import React, { Component } from "react";
import PropTypes from "prop-types";
import radium, { Style } from "radium";
import Slider from "react-slick";

import colors from "../../styles/colors";
import mq from "../../styles/mq";
import zIndex from "../../styles/zIndex";
import { rgb } from "../../utils/color";

export const rules = {
  ".slick-dots": {
    marginRight: "auto",
    marginLeft: "auto",
    height: "34px",
    position: "absolute",
    textAlign: "center",
    right: 0,
    left: 0,
    bottom: "32px",
  },
  ".slick-dots li": {
    width: "12px",
  },
  ".slick-dots li:first-of-type": {
    marginLeft: 0,
  },
  ".slick-track": {
    position: "relative",
  },
  ".slick-slide": {
    zIndex: zIndex.default,
    position: "relative !important",
    width: "100%",
  },
  ".slick-slide.slick-active": {
    zIndex: zIndex.middle,
    position: "relative !important",
  },
  ".slick-slide img": {
    maxWidth: "100px",
  },
  ".slick-dots button:before": {
    opacity: 1,
    fontSize: "10px",
    color: `rgba(${rgb(colors.bgPrimary)}, 0.37)`,
  },
  ".slick-dots .slick-active button:before": {
    opacity: 1,
    color: `rgba(${rgb(colors.bgPrimary)}, 1)`,
  },
  ".slick-prev": {
    left: "52px",
    zIndex: zIndex.middle + 1,
  },
  ".slick-next": {
    right: "52px",
    zIndex: zIndex.middle + 1,
  },
  ".slick-arrow:before": {
    content: "",
    display: "none",
  },
  ".slick-slider": { display: "none" },
  ".slick-slider.slick-initialized,.slick-slide:first-child": { display: "block" },
  ".slick-cloned:first-of-type": {
    display: "none !important",
  },
};

const styles = {
  slideContainer: {
    overflowY: "hidden",
    minHeight: "370px",
    [`@media (min-width: ${mq.min[720]})`]: {
      minHeight: "650px",
    },
  },
  slide: {
    width: "100%",
    position: "absolute",
    minHeight: "370px",
    [`@media (min-width: ${mq.min[720]})`]: {
      minHeight: "650px",
    },
  },
  // REM units being used to match what is currently in rizz-next
  isUnderGlobalHeader: {
    marginTop: "-5rem",
    [`@media (min-width: ${mq.min[720]})`]: {
      marginTop: "-13rem",
    },
  },
};


class MastheadSlider extends Component {
  constructor(props) {
    super(props);

    this.renderSlide = this.renderSlide.bind(this);
  }

  renderSlide(slide, index) {
    return (
      <div key={index} style={[styles.slide, { height: this.props.height }]}>{slide}</div>
    );
  }

  render() {
    const { slides, settings, customSettings, isUnderGlobalHeader } = this.props;

    return (
      <div
        className="MastheadSlider"
        style={[
          styles.slideContainer,
          isUnderGlobalHeader && styles.isUnderGlobalHeader,
          {
            height: this.props.height,
          },
        ]}
      >
        <Style
          scopeSelector=".MastheadSlider"
          rules={
            rules
          }
        />
        <Slider
          {...settings}
          {...customSettings}
        >
          {slides.map(this.renderSlide)}
        </Slider>

      </div>
    );
  }
}

MastheadSlider.propTypes = {
  isUnderGlobalHeader: PropTypes.bool,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  slides: PropTypes.arrayOf(PropTypes.node),
  settings: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,
  ])),
  customSettings: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ])),
};

MastheadSlider.defaultProps = {
  // React Slick settings
  height: "100vh",
  settings: {
    dots: true,
    dotsClass: "slick-dots container",
    touchThreshold: 10,
    pauseOnHover: false,
    autoplaySpeed: 7000,
    infinite: true,
    speed: 250,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    cssEase: "linear",
    arrows: true,
    swipe: true,
    responsive: [{
      breakpoint: 720,
      settings: {
        arrows: false,
        centerMode: false,
      },
    }],
  },
};

export default radium(MastheadSlider);

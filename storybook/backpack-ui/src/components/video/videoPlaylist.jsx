import React, { Component } from "react";
import PropTypes from "prop-types";
import radium, { Style } from "radium";
import ThumbnailListItem from "../thumbnailListItem";
import VideoPopout from "./videoPopout";
import { VideoEmbed, VideoFeatured } from "./";
import colors from "../../styles/colors";
import media from "../../styles/mq";
import {
  fontWeightLight,
  fontSizeHeading7,
  lineHeightHeading7,
} from "../../styles/typography";
import timing from "../../styles/timing";
import zIndex from "../../styles/zIndex";
import duration from "../../utils/time";
import propTypes from "../../utils/propTypes";

const lightBackgroundColor = colors.bgPrimary;
const lightBorderColor = colors.borderPrimary;
const darkBackgroundColor = "#1f1f1f";
const darkBorderColor = "#2b2b2b";

const styles = {
  container: {
    display: "flex",
  },

  playlistVideoContainer: {
    display: "flex",
    position: "relative",
    width: "100%",
  },

  playlistVideo: {
    flexGrow: 1,
    overflow: "hidden",
    position: "relative",
  },

  featuredVideoContainer: {
    border: 0,
    cursor: "pointer",
    height: "100%",
    left: 0,
    outline: 0,
    position: "absolute",
    textAlign: "left",
    top: 0,
    transition: `opacity ${timing.default} ease`,
    width: "100%",
    zIndex: zIndex.default,
  },

  playlistContainer: {
    flexShrink: 0,
    height: "auto",
    position: "relative",
    right: 0,
    top: 0,
    width: "370px",

    [`@media (max-width: ${media.max["960"]})`]: {
      display: "none",
    },
  },

  playlistInner: {
    default: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      left: 0,
      position: "absolute",
      top: 0,
      width: "100%",
    },
    light: {
      backgroundColor: lightBackgroundColor,
    },
    dark: {
      backgroundColor: darkBackgroundColor,
    },
  },

  playlistHeader: {
    default: {
      borderStyle: "solid",
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: "1px",
      borderLeftWidth: 0,
      fontSize: `${fontSizeHeading7}px`,
      fontWeight: fontWeightLight,
      letterSpacing: "1.5px",
      lineHeight: lineHeightHeading7,
      padding: "8px 16px",
      textAlign: "center",
    },
    light: {
      color: colors.textPrimary,
      backgroundColor: lightBackgroundColor,
      borderColor: lightBorderColor,
    },
    dark: {
      color: colors.textOverlay,
      backgroundColor: darkBackgroundColor,
      borderColor: darkBorderColor,
    },
  },

  playlistItems: {
    overflowY: "auto",
  },

  thumbnailListItemContainer: {
    paddingLeft: "8px",
    paddingRight: "8px",
  },

  thumbnailListItem: {
    padding: "8px",
    cursor: "pointer",
  },
};

class VideoPlaylist extends Component {
  constructor(props) {
    super(props);

    const { video, videos } = props;
    this.initialVideo = video || (videos && videos.length ? videos[0] : null);

    this.state = {
      video: this.initialVideo,
      autoplay: props.autoplay,
      childStyles: {},
    };

    this.featuredVideoContainer = null;
    this.childContainer = null;
    this.childRefs = {};
  }

  componentDidMount() {
    this.updateChildStyles();

    if (this.childContainer) {
      this.childContainer.addEventListener("scroll", this.onScroll);
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.onWindowResize);
    }

    if (this.state.video && this.props.onLoadVideo) {
      this.props.onLoadVideo(this.state.video, this.state.autoplay);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { video, videos } = nextProps;
    this.setState({
      video: !video && videos && videos.length ? videos[0] : video,
      autoplay: nextProps.autoplay,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.hideList && !this.props.hideList) {
      this.updateChildStyles();
      this.childContainer.addEventListener("scroll", this.onScroll);
    }

    if (
      this.props.onLoadVideo &&
      (
        (!prevState.video && this.state.video) ||
        (
          prevState.video &&
          this.state.video &&
          prevState.video.id !== this.state.video.id
        )
      )
    ) {
      this.props.onLoadVideo(this.state.video, this.state.autoplay);
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onWindowResize);
    }
  }

  onWindowResize = () => {
    this.updateChildStyles();
  }

  onScroll = () => {
    this.updateChildStyles();
  }

  onEnded = () => {
    const { videoEmbed, videos } = this.props;

    if (videoEmbed && videoEmbed.onEnded) {
      videoEmbed.onEnded();
    }

    if (this.isOnLastVideo()) {
      this.showFeaturedVideo();
      if (videos && videos.length) {
        this.loadVideo({
          video: videos[0],
          autoplay: false,
        });
      }
    } else {
      this.loadVideo({
        video: this.getNextVideo(),
        autoplay: true,
      });
    }
  }

  onPlaySuccess = () => {
    this.hideFeaturedVideo();
  }

  onClickFeaturedVideo = () => {
    this.hideFeaturedVideo();
    this.loadVideo({
      video: this.state.video,
      autoplay: true,
    });
  }

  onClickThumbnailVideo = (video) => {
    this.hideFeaturedVideo();
    this.loadVideo({
      video,
      autoplay: true,
    });
  }

  getNextVideo() {
    const { videos } = this.props;
    const { video } = this.state;

    const videoIndex = videos.findIndex(v => video && v.id === video.id);

    let nextVideo = videos && videos.length ? videos[0] : null;
    if (videos && videoIndex + 1 < videos.length) {
      nextVideo = videos[videoIndex + 1];
    }

    return nextVideo;
  }

  isOnLastVideo() {
    const { videos } = this.props;
    const { video } = this.state;
    return video && videos && videos.length && video.id === videos[videos.length - 1].id;
  }

  updateChildStyles() {
    if (!this.childContainer) {
      return;
    }

    const playlistTop = this.childContainer.getBoundingClientRect().top;
    const playlistHeight = this.childContainer.clientHeight;
    const childStyles = {};

    Object.keys(this.childRefs).forEach((key) => {
      const ref = this.childRefs[key];
      const refTop = ref ? ref.getBoundingClientRect().top : 0;
      const refHeight = ref ? ref.clientHeight : 0;

      if (!Object.keys(childStyles).includes(key)) {
        childStyles[key] = {};
      }

      if (!playlistHeight) {
        childStyles[key].opacity = 0;
      } else {
        childStyles[key].opacity = ((playlistTop + playlistHeight) - refTop);
        childStyles[key].opacity /= refHeight;
      }
    });

    this.setState({
      childStyles,
    });
  }

  hideFeaturedVideo() {
    if (!this.featuredVideoContainer) {
      return;
    }

    this.featuredVideoContainer.style.opacity = 0;

    setTimeout(() => {
      this.featuredVideoContainer.style.display = "none";
    }, 400);
  }

  showFeaturedVideo() {
    if (!this.featuredVideoContainer) {
      return;
    }

    this.featuredVideoContainer.style.display = "block";

    setTimeout(() => {
      this.featuredVideoContainer.style.opacity = 1;
    }, 100);
  }

  loadVideo = ({ video, autoplay }) => {
    this.setState({
      video,
      autoplay,
    });
  }

  render() {
    const {
      heading,
      theme,
      videos,
      visibleVideos,
      videoPopout,
      videoEmbed,
      hideList,
      showFeaturedVideoCover,
      mobile,
      style,
    } = this.props;

    const { autoplay, childStyles } = this.state;
    const video = this.state.video || this.initialVideo;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        className="VideoPlaylist"
        style={[
          styles.container,
          style,
        ]}
      >
        {video && videos && videos.length > 0 &&
          <div style={styles.playlistVideoContainer}>
            <div style={styles.playlistVideo}>

              {showFeaturedVideoCover &&
                <div
                  role="button"
                  ref={(ref) => { this.featuredVideoContainer = ref; }}
                  style={styles.featuredVideoContainer}
                  onClick={this.onClickFeaturedVideo}
                >
                  {this.initialVideo &&
                    <VideoFeatured
                      title={this.initialVideo.name}
                      description={this.initialVideo.description}
                      duration={this.initialVideo.duration}
                      image={this.initialVideo.image}
                      mobile={mobile}
                    />
                  }
                </div>
              }

              <VideoPopout
                mobile={mobile}
                {...videoPopout}
                videoEmbed={{
                  videoId: video.id,
                  ...videoEmbed,
                  autoplay,
                  onEnded: this.onEnded,
                  mobile,
                  onPlaySuccess: this.onPlaySuccess,
                  vjsLP: {
                    showDescription: hideList,
                    showRelatedLocations: hideList,
                    showRelatedVideos: hideList,
                    ...(videoEmbed.vjsLP || {}),
                  },
                }}
              />
            </div>

            {!hideList && (
              <div style={styles.playlistContainer}>
                <Style
                  scopeSelector=".VideoPlaylist"
                  rules={{
                    ".ListItem-thumbnail .Heading": {
                      fontWeight: "400 !important",
                    },
                    "::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgb(180, 190, 196)",
                    },
                    "::-webkit-scrollbar": {
                      width: "4px",
                    },
                  }}
                />

                <div
                  style={[
                    styles.playlistInner.default,
                    styles.playlistInner[theme],
                  ]}
                >
                  {heading &&
                    <div
                      style={[
                        styles.playlistHeader.default,
                        styles.playlistHeader[theme],
                      ]}
                    >
                      {heading}
                    </div>
                  }

                  <div
                    ref={(childContainer) => { this.childContainer = childContainer; }}
                    style={styles.playlistItems}
                  >
                    {videos.slice(0, visibleVideos || videos.length).map((v) => (
                      <div
                        key={v.id}
                        style={[
                          styles.thumbnailListItemContainer,
                          heading && { paddingTop: "8px" },
                        ]}
                        ref={(ref) => { this.childRefs[v.id] = ref; }}
                      >
                        <ThumbnailListItem
                          title={v.name}
                          onClick={() => this.onClickThumbnailVideo(v)}
                          imagePath={v.thumbnailImage}
                          subtitle={[duration(v.duration)]}
                          theme={v.id === video.id ? "active" : theme}
                          imageIcon={(v.id === video.id && "Play") || null}
                          imageIconLabel="Play"
                          lineClamp={false}
                          style={[
                            styles.thumbnailListItem,
                            childStyles[v.id],
                          ]}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        }
      </div>
    );
  }
}

const videoShape = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string, // recommended dimensions: 915x515
  thumbnailImage: PropTypes.string, // recommended dimensions: 160x90
  duration: PropTypes.number,
};

VideoPlaylist.propTypes = {
  heading: PropTypes.string,
  theme: PropTypes.oneOf(["light", "dark"]),
  video: PropTypes.shape(videoShape),
  videos: PropTypes.arrayOf(PropTypes.shape(videoShape)),
  visibleVideos: PropTypes.number,
  videoPopout: PropTypes.shape({
    ...VideoPopout.propTypes,
    showCloseButton: PropTypes.bool,
  }).isRequired,
  videoEmbed: PropTypes.shape({
    ...VideoEmbed.propTypes,
    videoId: PropTypes.string,
  }).isRequired,
  showFeaturedVideoCover: PropTypes.bool.isRequired,
  hideList: PropTypes.bool.isRequired,
  autoplay: PropTypes.bool,
  onLoadVideo: PropTypes.func,
  mobile: PropTypes.bool,
  style: propTypes.style,
};

VideoPlaylist.defaultProps = {
  theme: "light",
  showFeaturedVideoCover: false,
  mobile: false,
  hideList: false,
  videoPopout: {},
  videoEmbed: {},
};

export default radium(VideoPlaylist);

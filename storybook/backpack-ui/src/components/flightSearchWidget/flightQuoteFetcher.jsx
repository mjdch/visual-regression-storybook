import React from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const DEFAULT_ORIGIN_LONDON = {
  city: "London",
  country: "UK",
  latLon: [51.5074, 0.1278],
  currency: "USD",
};

class FlightQuoteFetcher extends React.Component {
  static propTypes = {
    destination: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    }),
    fallBackOrigin: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string,
      latLon: PropTypes.arrayOf(PropTypes.number),
    }),
    render: PropTypes.function,
  };

  static defaultProps = {
    fallBackOrigin: DEFAULT_ORIGIN_LONDON,
  }

  static async userInfo(fallBackOrigin = {}) {
    try {
      let { city, latLon, country, currency } = fallBackOrigin;
      // First requeset intentionally empty and only used
      // to retrieve the headers needed for the second request
      const response = await fetch("https://www.lonelyplanet.com//flights/api/quote", {
        method: "GET",
      });
      if (response.headers.has("X-GeoIP-City")) {
        city = response.headers.get("X-GeoIP-City");
      }

      if (response.headers.has("X-GeoIP-Latitude") && response.headers.has("X-GeoIP-Longitude")) {
        latLon = [response.headers.get("X-GeoIP-Latitude"), response.headers.get("X-GeoIP-Longitude")];
      }

      if (response.headers.has("X-GeoIP-CountryCode")) {
        country = response.headers.get("X-GeoIP-CountryCode");
      }
      if (Cookies.get("lpCurrency")) {
        currency = Cookies.get("lpCurrency");
      }

      return {
        city,
        country,
        currency,
        latLon,
      };
    } catch (e) {
      return fallBackOrigin;
    }
  }

  state = {
    quote: null,
    currency: "USD",
    foundResults: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.fetchFlightQuote();
  }

  async fetchFlightQuote() {
    const { fallBackOrigin, destination } = this.props;
    const { country, currency, latLon } = await FlightQuoteFetcher.userInfo(fallBackOrigin);
    const [lat, long] = latLon;

    try {
      const quoteResponse = await fetch(`https://www.lonelyplanet.com/flights/api/quote?country=${country}&currency=${currency}&locale=en-US&` +
        `destinationAtlasId=${destination.id}&from=anytime&to=anytime&originLat=${lat}&originLon=${long}`
      );
      const quotes = await quoteResponse.json();
      this.setState({
        quote: quotes[0],
        foundResults: quotes && quotes.length && quotes[0].outboundLeg,
        loading: false,
        currency,
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: true,
      });
    }
  }

  render() {
    const { destination } = this.props;
    const { loading, currency, quote, foundResults, error } = this.state;

    return (
      this.props.render({ loading, currency, destination, foundResults, quote, error })
    );
  }
}

export default FlightQuoteFetcher;

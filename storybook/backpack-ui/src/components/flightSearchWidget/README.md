# Flight Serch Widget

Components to fetch flight data, display flight data, and no results



## `FlightQuoteFetcher`
A Render Function component used to fetch skyscanner quote data based on users location and a specific destination

### Props
```javascript
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
```

### Usage

```javascript

const fakePlace = {
  id: "1234",
  name: "CoolVille"
};

<FlightQuoteFetcher
  destination={fakePlace}
  render={({ loading, currency, destination, foundResults, quote }) => (
    <div>
      // Show quote data here
    </div>
  )}
/>

```

The render function exposes these values:
  - `loading` = boolean telling whether the component is fetching data
  - `currency` = string -> users local currency

  - `destination` = object -> passthrough of the destination that was passed in as a prop to the parent component
  - `foundResults` = boolean -> tells whethere any results where found or not
  - `quote` = object -> the actual quote information that was returned from skyscanner



## `FlightSearchWidget`
UI to display quote data and referral link


### Props

```
depart: PropTypes.shape({
    airportCode: PropTypes.string,
    city: PropTypes.string,
  }).isRequired,
  arrive: PropTypes.shape({
    airportCode: PropTypes.string,
    city: PropTypes.string,
  }).isRequired,
  price: PropTypes.shape({
    amount: PropTypes.number,
    currency: propTypes.currency,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
```


### Usage

Can be used along side the `FlightQuoteFetcher`


```javascript

const fakePlace = {
  id: "1234",
  name: "CoolVille"
};

<FlightQuoteFetcher
  destination={fakePlace}
  render={({ loading, currency, destination, foundResults, quote }) => (
     <FlightSearchWidget
        depart={{
          airportCode: quote.outboundLeg.destination.airportCode,
          city: quote.outboundLeg.destination.city,
        }}
        arrive={{
          airportCode: quote.outboundLeg.origin.airportCode,
          city: quote.outboundLeg.origin.city,
        }}
        price={{
          amount: quote.minPrice,
          currency,
        }}
        onClick={() => window.open(quote.referral)}
      />
  )}
/>

```


## `NoFlightResults`
UI to display if no results are found. This UI doesn't have to be used but is a shared component we can use anywhere we need it

### Props

  - destinationName: If this field exists then the message `No flights in ${destinationName}` will be displayed,
  - children: The message to be shown if no destinationName,
  - buttonText: Text on button,
  - link: link for button,


### Usage

```javascript

const fakePlace = {
  id: "1234",
  name: "CoolVille"
};

<FlightQuoteFetcher
  destination={fakePlace}
  render={({ loading, currency, destination, foundResults, quote }) => (
    <div>
     {!loading && !foundResults &&
      <NoFlightResults
        link={quote.referral}
        destinationName={destination && destination.name}
      />
    }
    </div>
  )}
/>

```


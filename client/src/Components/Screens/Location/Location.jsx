import React, { useEffect } from "react";
// import GoogleMapReact from "google-map-react";
import { Loader } from '@googlemaps/js-api-loader';

import "./Location.css";
import Footer from './../Home/Sections/Footer';


// const AnyReactComponent = ({ text }) => <div>{text}</div>;
// 
const SimpleMap = () => {
  const loader = new Loader({
    apiKey: "AIzaSyBu5U1hgrbOpUrh-2rJinRhg1JloW5XlHI",
    version: "weekly",
    libraries: ["places"]
  });

  const mapOptions = {
    center: {
      lng: 47.282849688291904,
      lat: 10.957912516317723
    },
    zoom: 15
  };

  useEffect(() => {
    loader
      .load()
      .then((google) => {
        new google.maps.Map(document.getElementById("map"), mapOptions);
      })
      .catch(e => {
        // do something
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  //   const defaultProps = {
  //     center: {
  //       lat: 59.95,
  //       lng: 30.33,
  //     },
  //     zoom: 11,
  //   };

  // const findLocation = (position) => {
  //   console.log(position.coords);
  // };

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(findLocation);
  // });

  return (
    // Important! Always set the container height explicitly
    <>
      <div className="main__location-screen">
        <div className="main__location-section" id='map'>
          {/* <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyBu5U1hgrbOpUrh-2rJinRhg1JloW5XlHI" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}>
            <AnyReactComponent
              lat={32.163333900000005}
              lng={74.19248639999999}
              text="Locate"
            />
          </GoogleMapReact> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SimpleMap;

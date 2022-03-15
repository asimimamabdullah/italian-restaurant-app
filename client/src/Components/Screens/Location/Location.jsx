import React from "react";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./Location.css";
import Footer from "./../Home/Sections/Footer";
import { googleMap } from "../../utils/googleKeys";

const AnyReactComponent = () => (
  <LocationOnIcon className="main__location-screen-marker" />
);
const SimpleMap = () => {
  const defaultProps = {
    center: {
      lat: 44.76751595433727,
      lng: 10.91079460780503,
    },
    zoom: 15,
  };

  //   const findLocation = (position) => {
  //     console.log(position.coords);
  //   };
  //
  //   useEffect(() => {
  //     navigator.geolocation.getCurrentPosition(findLocation);
  //   });

  return (
    <>
      <div className="main__location-screen">
        <div className="main__location-section" id="map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: googleMap,
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}>
            <AnyReactComponent
              lat={44.76751595433727}
              lng={10.91079460780503}
              text="0"
            />
          </GoogleMapReact>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SimpleMap;

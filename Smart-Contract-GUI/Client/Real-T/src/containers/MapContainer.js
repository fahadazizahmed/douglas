
import React from "react";
import { GoogleMap, StreetViewPanorama } from "@react-google-maps/api";

function MapContainer(props) {
  const containerStyle = {
    height: "800px",
    width: "100%"
  };
  console.log(" props.latitude", props.latitude)

  const center = {
    lat:parseFloat(props.latitude),// 31.4645686,
    lng:parseFloat(props.longitude)// 74.2719769
  };
  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      <StreetViewPanorama
        id="street-view"
        mapContainerStyle={containerStyle}
        position={center}
        visible={true}
      />
     
    </GoogleMap>
  );
}

export default MapContainer;


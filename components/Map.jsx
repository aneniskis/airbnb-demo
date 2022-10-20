import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import getCenter from "geolib/es/getCenter";

const Map = ({ searchResult }) => {
  const [selectedLocation, setSelectedLocation] = useState({});
  // console.log(selectedLocation);
  ////// istraukem is arrays su objektais , objekta su reikalmom
  const coordinates = searchResult.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));
  //////////// gaunam bendra centra
  const center = getCenter(coordinates);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });
  //   console.log(coordinates);
  // console.log(center);
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/aleksasneniskis/cl9frdx9f001v16jpaqumb58q"
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      // onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onWheel={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResult.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result)}
              className="curson-pointer text-2xl animate-bounce"
              aria-label="push pin"
            >
              📌
            </p>
          </Marker>
          {/* popupas jei clikinam marker */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={false}
              longitude={result.long}
              latitude={result.lat}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;

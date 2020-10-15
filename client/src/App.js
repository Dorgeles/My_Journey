import React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const App = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 5.316667,
    longitude: -4.033333,
    zoom: 11
  });

  return (
    <ReactMapGL
      mapboxApiAccessToken={"pk.eyJ1IjoiZGdjZG9yZ2VsZXMiLCJhIjoiY2tlZGR1OHMyMHJzYjJ5bWloZnVueWlxYyJ9.4V4kumQObz8lwZim11OM8A"}
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    />
  );
}

export default App;

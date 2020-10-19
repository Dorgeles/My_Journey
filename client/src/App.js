import React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import {listLogEntry} from './API'; 
import LogEntryForm from './logEntryForm';


const App = () => {
  const [logEntries, setLogEntries] = useState([]); 
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 5.316667,
    longitude: -4.033333,
    zoom: 11
  });
  const showAddMarkerPopup = (event)=>{
    const [longitude, latitude] = event.lngLat; 
    setAddEntryLocation({
      longitude, 
      latitude
    })
  }; 

  const getEntries = async() =>{
    const logEntries = await listLogEntry();
    setLogEntries(logEntries);
  }
  useEffect(()=>{
    getEntries();
  }, []);

  return (
    
    <ReactMapGL
      mapboxApiAccessToken={"pk.eyJ1IjoiZGdjZG9yZ2VsZXMiLCJhIjoiY2tlZGR1OHMyMHJzYjJ5bWloZnVueWlxYyJ9.4V4kumQObz8lwZim11OM8A"}
      mapStyle="mapbox://styles/dgcdorgeles/ckeebb3ld0qrr19qs9dcda63s"
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
    {logEntries.map(entry => (
        <React.Fragment key = {entry._id}>
          <Marker 
            latitude={entry.latitude}
            longitude={entry.longitude}
          >
          <div
            onClick={()=> setShowPopup({
              //...showPopup,
              [entry._id]: true 
            })}
          >
            <svg className="marker"
            style = {{
              width: `calc(0.3vmin * ${viewport.zoom})`, 
              height: `calc(0.3vmin * ${viewport.zoom})`
            }}
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z">
            </path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
            
          </Marker>
          {
            showPopup[entry._id] ? (
              <Popup
                className="popup"
                latitude={entry.latitude}
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setShowPopup({})}
                anchor="top">
                <div>
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>Visitez le: {new Date(entry.visitDate).toLocaleDateString()}</small>
                {entry.image ? <img src={entry.image} alt={entry.title}/> : null }
                </div>
            </Popup>
            ) : null 
          }      
        </React.Fragment>
    ))
    }
    {
      addEntryLocation ? (
        <>
        <Marker 
          latitude={addEntryLocation.latitude}
          longitude={addEntryLocation.longitude}
        >
        <div>
          <svg className="marker"
          style = {{
            width: `calc(0.3vmin * ${viewport.zoom})`, 
            height: `calc(0.3vmin * ${viewport.zoom})`
          }}
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z">
          </path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
          
        </Marker>
          <Popup
              className="popup"
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setAddEntryLocation(null)}
              anchor="top">
              <div>
              <LogEntryForm onClode={()=>{
                setAddEntryLocation(null);
                getEntries()
              }} location={addEntryLocation}/>
              </div>
          </Popup>
        </>
      ) : null 
    }
    </ReactMapGL>
  );
}

export default App;

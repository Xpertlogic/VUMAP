// src/components/LeafletMap.js
import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polygon, Popup, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import leafletPip from 'leaflet-pip'; // Import leaflet-pip library
import L from 'leaflet'; // Import Leaflet
import MapEvents from './mapEvents'; // Import MapEvents component

const LeafletMap = () => {
    const mapRef = useRef();
    const [markers, setMarkers] = useState([]);
    const [polygon, setPolygon] = useState([]);
    const [featureGroup, setFeatureGroup] = useState(null); // Add featureGroup state
  
    const handleMapClick = (e) => {
      const { lat, lng } = e.latlng;
      setMarkers([...markers, { lat, lng }]);
    };
  
    const handlePolygonDrawn = (e) => {
      setPolygon(e.layer.getLatLngs()[0]);
    };
  
    const exportMarkersWithinPolygon = () => {
      // Filter markers within the polygon
      const markersWithinPolygon = markers.filter(marker =>
        leafletPip.pointInLayer([marker.lng, marker.lat], L.polygon(polygon))
      );
      console.log(markersWithinPolygon);
    };
  
    return (
      <div>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
          whenCreated={mapInstance => mapRef.current = mapInstance}
          onClick={handleMapClick}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <FeatureGroup ref={setFeatureGroup}> {/* Add FeatureGroup */}
            <EditControl
              position='topright'
              onCreated={handlePolygonDrawn}
              draw={{
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: false
              }}
              featureGroup={featureGroup}
            />
          </FeatureGroup>
          {markers.map((marker, index) => (
            <Marker key={index} position={[marker.lat, marker.lng]}>
              <Popup>Marker {index + 1}</Popup>
            </Marker>
          ))}
          {polygon.length > 0 && <Polygon positions={polygon} />}
          <MapEvents handlePolygonDrawn={handlePolygonDrawn} />
        </MapContainer>
        <button onClick={exportMarkersWithinPolygon}>Export Markers within Polygon</button>
      </div>
    );
  };
  
  
  export default LeafletMap;
  
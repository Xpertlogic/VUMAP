import { useMapEvents } from 'react-leaflet';

const MapEvents = ({handlePolygonDrawn}) => {
  useMapEvents({
    'pm:create': (e) => {
      // This event is triggered when a polygon is drawn
      handlePolygonDrawn(e);
    }
  });

  return null;
};

export default MapEvents;
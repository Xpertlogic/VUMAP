import { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";

function OpenMap() {
  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        // new TileLayer({
        //   source: new XYZ({
        //     url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        //     attributions:
        //       '© <a href="https://www.google.com/maps">Google Maps</a> contributors',
        //   }),
        // }),
      ],
      view: new View({
        center: fromLonLat([78.9629, 20.5937]),
        zoom: 4.5,
      }),
    });
  }, []);

  return <div id="map" style={{ width: "100%", height: "85vh" }}></div>;
}

export default OpenMap;

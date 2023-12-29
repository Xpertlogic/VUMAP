import BaseMap from "./components/BaseMap";
import React, { useState } from "react";
import { Select, Space } from "antd";
import States from "./data/states.json";
import Cities from "./data/BBSR.json";
import "./style/style.css";
import Header from "./components/Header";
import CheckBox from "./components/CheckBox";

function App() {
  const [stateName, setStateName] = useState([]);
  const [cityName, setCityName] = useState([]);
  const [centerPosition, setCenetrPosition] = useState([20.5937, 78.9629]);
  const [category, setCategory] = useState([]);

  //-------------- Enable and Disable State---------------
  const [isCityDisabled, setIsCityDisabled] = useState(true);
  const [isCategoryDisabled, setIsCategoryDisabled] = useState(true);

  /* ---- States ---- */

  const getStates = States.features
    .map((item) => item.properties.STATE)
    .filter((x) => x !== null);

  const changeState = (value) => {
    const getState = States?.features.find(
      (item) => item.properties.STATE === value
    );
    setStateName(getState);
    setCenetrPosition([getState?.properties.y, getState?.properties?.x]);
    //------------------------
    setIsCityDisabled(false);
    setIsCategoryDisabled(true);
    //------------------------
  };

  /* ---- Cities ---- */
  const getCities = Cities.features
    .map((item) => item.properties.CITY_NAME)
    .filter((x) => x !== null);

  const changeCity = (value) => {
    const getCity = Cities?.features.find(
      (item) => item.properties.CITY_NAME === value
    );
    setCityName(getCity);
    setCenetrPosition([getCity?.properties.y, getCity?.properties?.x]);
    //--------------------------
    setIsCategoryDisabled(false);
    //--------------------------
  };

  /* ---- Category ---- */

  const changeCategory = (value) => {
    setCategory(value);
  };

  const categories = ["Buildings", "Roads", "POI"];
  return (
    <>
      <Header />
      <div className="appContainer">
        <div className="leftBarContainer">
          <Space wrap className="m-2 grid">
            {/* --- State --- */}
            <label htmlFor="">State :</label>
            <Select
              className="w-[150px]"
              onChange={(value) => changeState(value)}
            >
              {getStates && getStates !== undefined
                ? getStates.map((stateItem, index) => {
                    return (
                      <option value={stateItem} key={index}>
                        {stateItem}
                      </option>
                    );
                  })
                : "No State"}
            </Select>
            {/* --- City --- */}
            <label htmlFor="">City :</label>
            <Select
              className="w-[150px]"
              onChange={(value) => changeCity(value)}
              disabled={isCityDisabled}
            >
              {getCities && getCities !== undefined
                ? getCities.map((cityItem, index) => {
                    return (
                      <option value={cityItem} key={index}>
                        {cityItem}
                      </option>
                    );
                  })
                : "No City"}
            </Select>
            {/* --- Category --- */}
            <label htmlFor="">Category :</label>
            <Select
              className="w-[150px]"
              onChange={(value) => changeCategory(value)}
              disabled={isCategoryDisabled}
            >
              {categories && categories !== undefined
                ? categories.map((item, index) => {
                    return (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    );
                  })
                : "No Category"}
            </Select>
            {/* --- Locality --- */}
            {/* <label htmlFor="">Locality :</label>
            <Select
              className="w-[150px]"
              onChange={(value) => changeCategory(value)}
              disabled={isCategoryDisabled}
            ></Select> */}
            {/* --- SubLocality --- */}
            {/* <label htmlFor="">SubLocality :</label>
            <Select
              className="w-[150px]"
              onChange={(value) => changeCategory(value)}
              disabled={isCategoryDisabled}
            ></Select> */}
          </Space>
          {/* check box components  */}
          <CheckBox />
        </div>
        <div className="mapContainer">
          <BaseMap
            data={centerPosition}
            state={stateName}
            city={cityName}
            categoryName={category}
          />
        </div>
      </div>
    </>
  );
}

export default App;

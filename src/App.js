import BaseMap from "./components/BaseMap";
import React, { useState } from "react";
import { Select, Space } from "antd";
// import categories from "./data/category.json";
import States from "./data/states.json";

function App() {
  const [stateName, setStateName] = useState([]);
  const [cityName, setCityName] = useState([]);
  const [centerPosition, setCenetrPosition] = useState([20.5937, 78.9629]);
  const getStates = States.features.map(item => item.properties.STATE).filter(x => x !== null);
  const [category, setCategory] = useState([]);
  const changeState = (value) => {
    const getState = States?.features.find(item => item.properties.STATE === value);
    setStateName(getState);
    setCenetrPosition([getState?.properties.y, getState?.properties?.x]);
  };

  // const getCities = cities.filter((item) => item.state === stateName);
  // console.log(getCities);

  // const changeCity = (value) => {
  //   setCityName(value);
  //   // console.log(value);
  //   const getCooridinate = cities.find((item) => item.name === value);
  //   // console.log(getCooridinate);
  //   setCenetrPosition([getCooridinate?.lat, getCooridinate?.lon]);
  // };

  const changeCategory = (value) => {
    // console.log(getCategories);
    setCategory(value);
  };

  
  const categories = ["Buildings", "Roads", "POI"];
  return (
    <div>
      <div className="bg-yellow-300">
        <Space wrap className="m-2">
          <label htmlFor="">State :</label>
          <Select
            className="w-[200px]"
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
          {/* <label htmlFor="">City :</label>
          <Select className="w-[200px]" onChange={(value) => changeCity(value)}>
            {getCities && getCities !== undefined
              ? getCities.map((stateItem, index) => {
                  return (
                    <option value={stateItem.name} key={index}>
                      {stateItem.name}
                    </option>
                  );
                })
              : "No State"}
          </Select> */}
          <label htmlFor="">Category :</label>
          <Select
            className="w-[200px]"
            onChange={(value) => changeCategory(value)}
          >
            {categories && categories !== undefined
              ? categories.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })
              : "No State"}
          </Select>
        </Space>
      </div>
      <BaseMap data={centerPosition} state={stateName} categoryName={category} />
    </div>
  );
}

export default App;

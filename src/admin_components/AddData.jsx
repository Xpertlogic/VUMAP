import { Button, Input, Select } from "antd";
import { useState } from "react";

/* ------- Dynamic reuseable selection option ------- */
const DynamicSelect = ({ options }) => {
  return (
    <Select className="item-select" size="large">
      {options.map((option) => (
        <Select.Option key={option} value={option}>
          {option}
        </Select.Option>
      ))}
    </Select>
  );
};

const AddData = () => {
  /* --- For Country ----- */
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState([]);

  const handleCountryInputChange = (e) => {
    setCountryName(e.target.value);
  };
  const handelAddedCountry = () => {
    if (countryName.trim() !== "") {
      setCountries([...countries, countryName]);
      setCountryName("");
    }
  };

  /* --- For State ----- */
  const [stateName, setStateName] = useState("");
  const [states, setStates] = useState([]);

  const handleStateInputChange = (e) => {
    setStateName(e.target.value);
  };
  const handelAddedState = () => {
    if (stateName.trim() !== "") {
      setStates([...states, stateName]);
      setStateName("");
    }
  };

  /* --- For District ----- */
  const [districtName, setDistrictName] = useState("");
  const [districts, setDistricts] = useState([]);

  const handleDistrictInputChange = (e) => {
    setDistrictName(e.target.value);
  };
  const handelAddedDistrict = () => {
    if (districtName.trim() !== "") {
      setDistricts([...districts, districtName]);
      setDistrictName("");
    }
  };

  /* --- For City ----- */
  const [cityName, setCityName] = useState("");
  const [citys, setCitys] = useState([]);

  const handleCityInputChange = (e) => {
    setCityName(e.target.value);
  };
  const handelAddedCity = () => {
    if (cityName.trim() !== "") {
      setCitys([...citys, cityName]);
      setCityName("");
    }
  };

  return (
    <section className="add-data-section">
      {/* ----- Add Counntry ----- */}
      <div className="add-data-item">
        <Input
          className="item-input"
          size="large"
          placeholder="Add The Country Name"
          value={countryName}
          onChange={handleCountryInputChange}
        />
        <Button
          type="primary"
          className="button-item"
          size="large"
          onClick={handelAddedCountry}
        >
          Add Country
        </Button>
      </div>

      {/* ----- Add State ----- */}
      <div className="add-data-item">
        <DynamicSelect options={countries} />
        <Input
          className="item-input"
          size="large"
          placeholder="Add The State Name"
          value={stateName}
          onChange={handleStateInputChange}
        />

        <Button
          type="primary"
          className="button-item"
          size="large"
          onClick={handelAddedState}
        >
          Add State
        </Button>
      </div>

      {/* ----- Add District ----- */}
      <div className="add-data-item">
        <DynamicSelect options={countries} />
        <DynamicSelect options={states} />
        <Input
          className="item-input"
          size="large"
          placeholder="Add The District Name"
          value={districtName}
          onChange={handleDistrictInputChange}
        />

        <Button
          type="primary"
          className="button-item"
          size="large"
          onClick={handelAddedDistrict}
        >
          Add District
        </Button>
      </div>

      {/* ----- Add City ----- */}
      <div className="add-data-item">
        <DynamicSelect options={countries} />
        <DynamicSelect options={states} />
        <DynamicSelect options={districts} />
        <Input
          className="item-input"
          size="large"
          placeholder="Add The City Name"
          value={cityName}
          onChange={handleCityInputChange}
        />

        <Button
          type="primary"
          className="button-item"
          size="large"
          onClick={handelAddedCity}
        >
          Add City
        </Button>
      </div>
    </section>
  );
};

export default AddData;

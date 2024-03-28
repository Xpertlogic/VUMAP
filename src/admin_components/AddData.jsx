import { Button, Input, Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

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
  useEffect(() => {
    const getCountry = async () => {
      try {
        // Make a POST request to verify OTP
        const headers = {
          Token: localStorage.getItem("admintoken"),
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          "https://gismapslayers.com/api/v1/admin/country",
          { headers: headers }
        );
        if (response.status === 200) {
          const uniqueCountryNames = Array.from(
            new Set(response.data.map((item) => item.countryname.toLowerCase()))
          ).filter((countryName) => countryName.trim() !== "");
          setCountries(uniqueCountryNames);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getCountry();
  }, [countryName]);
  const handelAddedCountry = async () => {
    if (countryName.trim() !== "" && !countries.includes(countryName)) {
      try {
        // Make a POST request to verify OTP
        const headers = {
          Token: localStorage.getItem("admintoken"),
          "Content-Type": "application/json",
        };
        const response = await axios.post(
          "https://gismapslayers.com/api/v1/admin/country",
          {
            countryname: countryName,
            geoJSONData: "",
          },
          { headers: headers }
        );
        if (response.status === 200) {
          setCountryName("");
          setCountries(countries.concat(countryName));
        }
      } catch (error) {
        console.error("Error In To Add Country:", error);
      }
    }
  };

  /* --- For State ----- */
  const [stateName, setStateName] = useState("");
  const [selectCountryState, setSelectCountryState] = useState("");
  const [states, setStates] = useState([]);
  const changeCountry = (e) => {
    setSelectCountryState(e);
  };
  const handleStateInputChange = (e) => {
    setStateName(e.target.value);
  };

  const handelAddedState = async () => {
    if (stateName.trim() !== "" && !states.includes(stateName)) {
      try {
        // Make a POST request to verify OTP
        const headers = {
          Token: localStorage.getItem("admintoken"),
          "Content-Type": "application/json",
        };
        const response = await axios.post(
          "https://gismapslayers.com/api/v1/admin/state",
          {
            countryname: selectCountryState,
            statename: stateName,
            geoJSONData: "",
          },
          { headers: headers }
        );
        if (response.status === 200) {
          setStates([...states, stateName]);
          setStateName("");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  /* --- For District ----- */
  const [districtName, setDistrictName] = useState("");
  const [distCountry, setDistCountry] = useState("");
  const [distState, setDistState] = useState("");
  const [districts, setDistricts] = useState([]);
  useEffect(() => {
    const getState = async () => {
      try {
        // Make a POST request to verify OTP
        const headers = {
          Token: localStorage.getItem("admintoken"),
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          "https://gismapslayers.com/api/v1/admin/state",
          { headers: headers }
        );
        if (response.status === 200) {
          const statesWithMatchingCountry = response.data
            .filter((item) => item.country[0].countryname === distCountry) // Filter states based on country match
            .map((item) => item.statename.toLowerCase()); // Get state names and convert to lowercase

          const uniqueStateNames = Array.from(
            new Set(statesWithMatchingCountry)
          ).filter((statename) => statename.trim() !== ""); // Get unique state names, excluding empty names

          setStates(uniqueStateNames);
          setDistState("");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getState();
  }, [distCountry]);
  const changeDistCountry = (e) => {
    setDistCountry(e);
  };
  const changeDistState = (e) => {
    setDistState(e);
  };
  const handleDistrictInputChange = (e) => {
    setDistrictName(e.target.value);
  };

  const handelAddedDistrict = async () => {
    if (districtName.trim() !== "" && !districts.includes(districtName)) {
      try {
        // Make a POST request to verify OTP
        const headers = {
          Token: localStorage.getItem("admintoken"),
          "Content-Type": "application/json",
        };
        const response = await axios.post(
          "https://gismapslayers.com/api/v1/admin/district",
          {
            countryname: distCountry,
            statename: distState,
            districtname: districtName,
            geoJSONData: "",
          },
          { headers: headers }
        );
        if (response.status === 200) {
          setDistricts([...districts, districtName]);
          setDistrictName("");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  /* --- For City ----- */
  const [cityName, setCityName] = useState("");
  const [cityCountry, setCityCountry] = useState("");
  const [cityState, setCityState] = useState("");
  const [cityDistrict, setCityDistrict] = useState("");
  const [citys, setCitys] = useState([]);
  useEffect(() => {
    const getState = async () => {
      try {
        // Make a POST request to verify OTP
        const headers = {
          Token: localStorage.getItem("admintoken"),
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          "https://gismapslayers.com/api/v1/admin/districts",
          { headers: headers }
        );
        if (response.status === 200) {
          // const statesWithMatchingCountry = response.data
          // .filter(item => item.country[0].countryname === distCountry) // Filter states based on country match
          // .map(item => item.statename.toLowerCase()); // Get state names and convert to lowercase

          // const uniqueStateNames = Array.from(new Set(statesWithMatchingCountry))
          //     .filter(statename => statename.trim() !== ''); // Get unique state names, excluding empty names

          // setStates(uniqueStateNames);
          // setDistState("")
          console.log(response);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getState();
  }, [distCountry]);
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
          required
          onChange={handleCountryInputChange}
        />
        <Button
          type="primary"
          className="button-item"
          size="large"
          onClick={() => handelAddedCountry()}
        >
          Add Country
        </Button>
      </div>

      {/* ----- Add State ----- */}
      <div className="add-data-item">
        <Select
          className="item-select"
          size="large"
          onChange={(event) => changeCountry(event)}
        >
          {countries.map((option) => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
        <Input
          className="item-input"
          size="large"
          placeholder="Add The State Name"
          value={stateName}
          required
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
        <Select
          className="item-select"
          size="large"
          onChange={(event) => changeDistCountry(event)}
        >
          {countries.map((option) => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
        <Select
          className="item-select"
          size="large"
          value={distState}
          onChange={(event) => changeDistState(event)}
        >
          {states.map((option) => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
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

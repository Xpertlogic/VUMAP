import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
const crypto = require("crypto-js");

const CountryComponent = ({ token }) => {
  const [countryData, setCountryData] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const fetchData = useCallback(async () => {
    const apiEndpoint = 'http://localhost:8080/api/v1/admin/country';

    try {
      const response = await axios.get(apiEndpoint, {
        headers: {
          token: token,
        },
      });

      const decodedCountryData = response.data.map(country => {
        const decodedGeoJSON = crypto.AES.decrypt(country.geoJSONData, 'VUMAP@1234').toString(crypto.enc.Utf8);
        const parsedGeoJSON = JSON.parse(decodedGeoJSON);
        
        return {
          ...country,
          geoJSONData: parsedGeoJSON,
        };
      });

      setCountryData(decodedCountryData);
      console.log(decodedCountryData);
    } catch (error) {
      console.error('Error fetching and decoding country data:', error);
    }
  }, [token, refreshTrigger]); // Include dependencies inside useCallback

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    setRefreshTrigger(prevState => !prevState);
  };

  return (
    <div>
      <div style={{ position:'relative', left:'90%', top: '10px' }}>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
      <h1>Country Data</h1>
      <ul style={{ wordWrap: 'break-word' }}>
        {countryData.map(country => (
          <li key={country._id}>
            {country.countryname} - {JSON.stringify(country.geoJSONData)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryComponent;


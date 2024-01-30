import React, { useState } from 'react';
import { Upload, Input, message, Button } from 'antd';
import { AiOutlineUpload } from 'react-icons/ai';
import axios from 'axios';
import '../style/AddCountryData.css'; // Import the CSS file

const AddCountryData = ({ token }) => {
  const [fileList, setFileList] = useState([]);
  const [countryName, setCountryName] = useState('');
//================================
  const customFileValidation = (file) => {
    const isGeoJSON = file.name.toLowerCase().endsWith('.geojson') || file.name.toLowerCase().endsWith('.json');
    if (!isGeoJSON) {
      message.error('You can only upload GEOJSON or JSON files!');
    }
    return isGeoJSON;
  };

  const beforeUpload = (file, fileList) => {
    if (fileList.length > 1) {
      message.error('You can only upload one GEOJSON or JSON file!');
      return false;
    }
    return customFileValidation(file);
  };
//====================================
  const onChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file upload successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }

    // Update the fileList state
    setFileList([info.file]);
  };

  const handleCountryNameChange = (e) => {
    setCountryName(e.target.value);
  };
  
const handleSubmit = () => {

  if (!countryName || fileList.length === 0) {
      message.error('Please enter a country name and upload a file');
      return;
  }

  const formData = new FormData();
  formData.append('countryname', countryName); // Use the countryName state
  formData.append('countryData', fileList[0].originFileObj);

  ////// Send a POST request using Axios
  axios.post('http://localhost:8080/api/v1/admin/country', formData, {
    headers: {
      token:token,
    },
  })
  
  .then(response => {
    // Handle success
    console.log(response.data);
    message.success('API request successful');
    // Reset the form after successful submission
    setFileList([]);
    setCountryName(''); // Reset the countryName state
  })
  .catch(error => {
    // Handle error
    console.error('Error uploading file and making API request', error);
    message.error('Error uploading file and making API request');
  });
};

  return (
    <div className="geo-uploader-container">
      <h2 className="form-heading">Add Country Data</h2>
      <Input
        type="text"
        placeholder="Enter Country Name"
        value={countryName}
        onChange={handleCountryNameChange}
        className="geo-input" // You can still use the existing geo-input class for styling
      />
      <Upload
        fileList={fileList}
        beforeUpload={beforeUpload}
        customRequest={({ onSuccess }) => setTimeout(() => onSuccess('ok'), 0)}
        onChange={onChange}
        showUploadList={false}
        accept=".geojson, .json"  // Update the accept attribute to accept both file types
        className="geo-upload"
      >
        <Button icon={<AiOutlineUpload />} className="geo-upload-button">
          Upload GEOJSON or JSON
        </Button>
      </Upload>
      <Button type="primary" onClick={handleSubmit} className="geo-submit-button">
        Submit
      </Button>
    </div>
  );
};

export default AddCountryData;

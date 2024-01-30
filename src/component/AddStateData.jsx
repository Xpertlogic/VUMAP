import React, { useState } from 'react';
import { Upload, message, Button, Select } from 'antd';
import { AiOutlineUpload } from 'react-icons/ai';
import axios from 'axios';
import '../style/AddStateData.css'; // Import the CSS file

const { Option } = Select;

const AddStateData = ({ token }) => {
  const [fileList, setFileList] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

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

  const onChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }

    // Update the fileList state
    setFileList([info.file]);
  };

  const handleStateChange = (value) => {
    setSelectedState(value);
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  const handleSubmit = () => {
    if (!selectedCountry || !selectedState || fileList.length === 0) {
      message.error('Please select a country, state, and upload a file');
      return;
    }

    // Prepare the data to be sent
    const formData = new FormData();
    formData.append('countryname', selectedCountry);
    formData.append('statename', selectedState);
    formData.append('stateData', fileList[0].originFileObj);

    // Send a POST request using Axios
    
    axios.post('http://localhost:8080/api/v1/admin/state', formData, {
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
         setSelectedCountry(null);
         setSelectedState(null);
       })
       .catch(error => {
         // Handle error
         console.error('Error uploading file and making API request', error);
         message.error('Error uploading file and making API request');
       });
   };

  return (
    <div className="geo-uploader-container">
      <h2 className="form-heading">Add State Data</h2>
      <Select
        placeholder="Select Country"
        value={selectedCountry}
        onChange={handleCountryChange}
        className="geo-select"
      >
        <Option value="India">India</Option>
        <Option value="USA">USA</Option>
        <Option value="UK">UK</Option>
        
      </Select>
      <Select
        placeholder="Select State"
        value={selectedState}
        onChange={handleStateChange}
        className="geo-select"
      >
        <Option value="Andhra Pradesh">Andhra Pradesh</Option>
        <Option value="Arunachal Pradesh">Arunachal Pradesh</Option>
        <Option value="Chhattisgarh">Chhattisgarh</Option>
        
      </Select>
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

export default AddStateData;

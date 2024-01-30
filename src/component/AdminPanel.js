
import { notification,Button } from 'antd';
import axios from 'axios';
import AddStateData from "./AddStateData";
import AddCountryData from "./AddCountryData";
//import CountryComponent from "./CountryComponent";
import '../style/AdminPanel.css';


const AdminPanel = ({ onLogout, username, token, password }) => {
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signout', {
        username,
        password,
      });

      if (response.data && response.data.message) {
        
        notification.success({
          //message: response.data.message
          message: 'Logout Successful',
          description: 'You have successfully logged out.',
        });
      } else {
        console.error('Invalid response from the server during logout.');
      }

      onLogout();
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  return (
    
      <div className="admin-panel">
        <div className="admin-panel-header">
          <h1 className='admin-panel-heade-heading'>Welcome, {username}</h1>
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <div className='try'>
          <AddCountryData  token={token} /> 
          <AddStateData  token={token} />
        </div>
        <div className="admin-panel-footer">
          <p>&copy; 2024 VUMAP | All rights reserved.</p>
        </div>
      </div>
      );

};

export default AdminPanel;




/*

<p className="token_p" >{token}</p>
<CountryComponent token={token} /> 

*/
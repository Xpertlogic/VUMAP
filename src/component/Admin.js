import React, { useState } from 'react';
import Login from './Login';
import AdminPanel from './AdminPanel';


const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (user, authToken,enteredPassword) => {
    setUsername(user);
    setToken(authToken);
    setPassword(enteredPassword);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUsername('');
    setToken('');
    setPassword('');
    setLoggedIn(false);
  };

  return (
    <div>
      {loggedIn ? (
        <AdminPanel onLogout={handleLogout} username={username} token={token} password={password} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Admin;























/*


// src/App.js
import React, { useState } from 'react';
import Login from './Login';
import AdminPanel from './AdminPanel';

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (user) => {
    setUsername(user);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUsername('');
    setLoggedIn(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      {loggedIn ? (
        <AdminPanel onLogout={handleLogout} username={username} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Admin;


*/
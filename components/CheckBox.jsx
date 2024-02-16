import React, { useEffect, useState } from "react";

const userData = [{ name: "CATEGORY" }, { name: "ATM" }, { name: "BANK" }];

function CheckBox() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(userData);
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  return (
    <div className="bg-red-200">
      <form action="" className="ml-3">
        <h1 className="text-[2rem]">Data</h1>
        <div>
          <input
            type="checkbox"
            name="allSelect"
            checked={!users.some((user) => user?.isChecked !== true)}
            onChange={handleChange}
          />
          <label>POI</label>
        </div>
        {users.map((user, index) => (
          <div key={index} className="ml-2">
            <input
              type="checkbox"
              name={user.name}
              checked={user?.isChecked || false}
              onChange={handleChange}
            />
            <label>{user.name}</label>
          </div>
        ))}
      </form>
    </div>
  );
}

export default CheckBox;

import React, { useContext, useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import { LoginContext } from "../context/LoginContext";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Data",
    dataIndex: "data",
    key: "date",
  },
];

function TableData({ dataMarker, modalOpen, modalClose, downloadModal }) {
  const [btnVisiable, setBtnVisiable] = useState(false);
  const { userData } = useContext(LoginContext);

  /* ----- Category Download Data According to The Plan ----- */

  useEffect(() => {
    if (userData && userData.tier) {
      const exceedsLimit = dataMarker.some((item) => {
        const { Category, count } = item.properties;
        return handelCategoryDownload(Category, count);
      });
      console.log(exceedsLimit);
      setBtnVisiable(exceedsLimit);
    }
  }, [dataMarker, userData]);

  //   console.log(btnVisiable);

  const handelCategoryDownload = (name, count) => {
    if (userData.tier === "tier1") {
      switch (name) {
        case "Airports":
          return count > 75 ? `${count} You can't download` : count;
        case "Rail":
          return "Contact Us";
        case "Railway Stations":
          return count > 100 ? `${count} You can't download` : count;
        case "Roads":
          return "Contact Us";
        case "Buildings":
          return "Contact Us";
        case "House Number":
          return "For Premium Plus Member Only";
        case "Automotive Dealer":
          return count > 20
            ? `${count} You can't download  (limit - 20)`
            : count;
        case "Building POI":
          return count > 30 ? `${count} You can't download` : count;
        case "Business Park":
          return count > 10 ? `${count} You can't download` : count;
        case "Companies":
          return count > 25 ? `${count} You can't download` : count;
        case "Education":
          return count > 10 ? `${count} You can't download` : count;
        case "Entertainment":
          return count > 10 ? `${count} You can't download` : count;
        case "Finance":
          return count > 10 ? `${count} You can't download` : count;
        case "Golf Course":
          return count > 10 ? `${count} You can't download` : count;
        case "Government Office":
          return count > 10 ? `${count} You can't download` : count;
        case "Health Care":
          return count > 10 ? `${count} You can't download` : count;
        case "Accommodation":
          return count > 10 ? `${count} You can't download` : count;
        case "Hotel/Restaurants":
          return count > 10 ? `${count} You can't download` : count;
        case "Park and Recreation Area":
          return count > 10 ? `${count} You can't download` : count;
        case "Place of Worship":
          return count > 10 ? `${count} You can't download` : count;
        case "Public Amenity":
          return count > 10 ? `${count} You can't download` : count;
        case "Repair Facility":
          return count > 10 ? `${count} You can't download` : count;
        case "Services":
          return count > 10 ? `${count} You can't download` : count;
        case "Shopping Centre":
          return count > 10 ? `${count} You can't download` : count;
        case "Sports Centre":
          return count > 10 ? `${count} You can't download` : count;
        case "Utility":
          return count > 10 ? `${count} You can't download` : count;
        case "Zoo":
          return count > 10 ? `${count} You can't download` : count;
        case "Shop":
          return count > 500 ? `${count} You can't download` : count;
        default:
          return false;
      }
    } else if (userData.tier === "tier2") {
      switch (name) {
        case "Airports":
          return count > 150 ? `${count} You can't download` : count;
        case "Rail":
          return "Contact Us";
        case "Railway Stations":
          return count > 200 ? `${count} You can't download` : count;
        case "Roads":
          return "Contact Us";
        case "Buildings":
          return "Contact Us";
        case "House Number":
          return count > 50 ? `${count} You can't download` : count;
        case "Automotive Dealer":
          return count > 50 ? `${count} You can't download` : count;
        case "Building POI":
          return count > 50 ? `${count} You can't download` : count;
        case "Business Park":
          return count > 50 ? `${count} You can't download` : count;
        case "Companies":
          return count > 50 ? `${count} You can't download` : count;
        case "Education":
          return count > 50 ? `${count} You can't download` : count;
        case "Entertainment":
          return count > 50 ? `${count} You can't download` : count;
        case "Finance":
          return count > 50 ? `${count} You can't download` : count;
        case "Golf Course":
          return count > 50 ? `${count} You can't download` : count;
        case "Government Office":
          return count > 50 ? `${count} You can't download` : count;
        case "Health Care":
          return count > 50 ? `${count} You can't download` : count;
        case "Accommodation":
          return count > 50 ? `${count} You can't download` : count;
        case "Hotel/Restaurants":
          return count > 50 ? `${count} You can't download` : count;
        case "Park and Recreation Area":
          return count > 50 ? `${count} You can't download` : count;
        case "Place of Worship":
          return count > 50 ? `${count} You can't download` : count;
        case "Public Amenity":
          return count > 50 ? `${count} You can't download` : count;
        case "Repair Facility":
          return count > 50 ? `${count} You can't download` : count;
        case "Services":
          return count > 50 ? `${count} You can't download` : count;
        case "Shopping Centre":
          return count > 50 ? `${count} You can't download` : count;
        case "Sports Centre":
          return count > 50 ? `${count} You can't download` : count;
        case "Utility":
          return count > 50 ? `${count} You can't download` : count;
        case "Zoo":
          return count > 50 ? `${count} You can't download` : count;
        case "Shop":
          return count > 1500 ? `${count} You can't download` : count;
        default:
          return false;
      }
    }
  };
  console.log();

  const categoryCounts = dataMarker.reduce((acc, item) => {
    const category = item.properties?.Category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const formattedData = Object.entries(categoryCounts).map(
    ([name, count], index) => ({
      key: index.toString(),
      name: name,
      data: handelCategoryDownload(name, count),
    })
  );

  return (
    <div>
      {/* Category Modal  */}
      <Modal
        open={modalOpen}
        onCancel={modalClose}
        style={{ margin: 10, padding: 0 }}
        centered
        width={"50%"}
        footer={[
          <Button key="back" onClick={modalClose}>
            Cancel
          </Button>,
          <Button
            className="bg-green-600"
            key="submit"
            type="primary"
            onClick={downloadModal}
          >
            Confirm
          </Button>,
        ]}
      >
        <Table
          columns={columns}
          dataSource={formattedData}
          pagination={false}
        />
      </Modal>
    </div>
  );
}

export default TableData;

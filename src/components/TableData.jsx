import React, { useContext, useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import { LoginContext } from "../context/LoginContext";
import axios from "axios";

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

function TableData({
  dataMarker,
  modalOpen,
  modalClose,
  downloadModal,
  limitData,
}) {
  const [btnVisiable, setBtnVisiable] = useState(true);
  const { userData, storedToken } = useContext(LoginContext);

  /* ----- Category Download Data According to The Plan ----- */

  useEffect(() => {
    if (userData && userData.tier) {
      const exceedsLimit = dataMarker.some((item) => {
        const { Category, count } = item.properties;
        return handelCategoryDownload(Category, count) > count; // Check if count exceeds limit
      });
      setBtnVisiable(!exceedsLimit); // Set button visibility based on whether any count exceeds limit
    }
  }, [dataMarker, userData]);

  const handelCategoryDownload = (name, count) => {
    if (userData.tier === "tier1") {
      switch (name) {
        case "Airports":
          return count > limitData.airports
            ? `${count} You can't download (limit - 20)`
            : count;
        case "Rail":
          return "Contact Us";
        case "Railway Stations":
          return count > limitData.railwayStations
            ? `${count} You can't download (limit - 20)`
            : count;
        case "Roads":
          return "Contact Us";
        case "Buildings":
          return "Contact Us";
        case "House Number":
          return "For Premium Plus Member Only";
        case "Automotive Dealer":
          return count > limitData.automotiveDealer
            ? `${count} You can't download (limit - 20)`
            : count;
        case "Building POI":
          return count > limitData.buildingPOI
            ? `${count} You can't download (limit - 30)`
            : count;
        case "Business Park":
          return count > limitData.businessPark
            ? `${count} You can't download (limit - 10)`
            : count;
        case "Companies":
          return count > limitData.companies
            ? `${count} You can't download (limit - 25)`
            : count;
        case "Education":
          return count > limitData.education
            ? `${count} You can't download (limit - 10)`
            : count;
        case "Entertainment":
          return count > limitData.entertainment
            ? `${count} You can't download (limit - 10)`
            : count;
        case "Finance":
          return count > limitData.finance
            ? `${count} You can't download (limit - 10)`
            : count;
        case "Golf Course":
          return count > limitData.golfCourse
            ? `${count} You can't download (limit - 10)`
            : count;
        case "Government Office":
          return count > limitData.governmentOffice
            ? `${count} You can't download (limit - 10)`
            : count;
        case "Health Care":
          return count > limitData.healthCare
            ? `${count} You can't download (limit - 10)`
            : count;
        case "Accommodation":
          return count > limitData.accommodation
            ? `${count} You can't download (limit - 10)`
            : count;
        case "Hotel/Restaurants":
          return count > limitData.hotelRestaurants
            ? `${count} You can't download (limit - 10)`
            : count;
        case "Park and Recreation Area":
          return count > limitData.parkAndRecreationArea
            ? `${count} You can't download (limit - 10)`
            : count;
        case "Place of Worship":
          return count > limitData.placeOfWorship
            ? `${count} You can't download (limit - 10)`
            : count;
        case "Public Amenity":
          return count > limitData.publicAmenity
            ? `${count} You can't download (limit - 10)`
            : count;
        case "Repair Facility":
          return count > limitData.repairFacility
            ? `${count} You can't download (limit - 10)`
            : count;
        case "Services":
          return count > limitData.services
            ? `${count} You can't download (limit - 10)`
            : count;
        case "Shopping Centre":
          return count > limitData.shoppingCentre
            ? `${count} You can't download (limit - 10)`
            : count;
        case "Sports Centre":
          return count > limitData.sportsCentre
            ? `${count} You can't download (limit - 10)`
            : count;
        case "Utility":
          return count > limitData.utility
            ? `${count} You can't download (limit - 10)`
            : count;
        case "Zoo":
          return count > limitData.zoo
            ? `${count} You can't download (limit - 10)`
            : count;
        case "Shop":
          return count > limitData.shop
            ? `${count} You can't download (limit - 500)`
            : count;
        default:
          return false;
      }
    } else if (userData.tier === "tier2") {
      switch (name) {
        case "Airports":
          return count > limitData.airports
            ? `${count} You can't download (limit - )`
            : count;
        case "Rail":
          return "Contact Us";
        case "Railway Stations":
          return count > limitData.railwayStations
            ? `${count} You can't download (limit - )`
            : count;
        case "Roads":
          return "Contact Us";
        case "Buildings":
          return "Contact Us";
        case "House Number":
          return count > limitData.houseNo
            ? `${count} You can't download (limit - )`
            : count;
        case "Automotive Dealer":
          return count > limitData.automotiveDealer
            ? `${count} You can't download (limit - )`
            : count;
        case "Building POI":
          return count > limitData.buildingPOI
            ? `${count} You can't download (limit - )`
            : count;
        case "Business Park":
          return count > limitData.businessPark
            ? `${count} You can't download (limit - )`
            : count;
        case "Companies":
          return count > limitData.companies
            ? `${count} You can't download (limit - )`
            : count;
        case "Education":
          return count > limitData.education
            ? `${count} You can't download (limit - )`
            : count;
        case "Entertainment":
          return count > limitData.entertainment
            ? `${count} You can't download (limit - )`
            : count;
        case "Finance":
          return count > limitData.finance
            ? `${count} You can't download (limit - )`
            : count;
        case "Golf Course":
          return count > limitData.golfCourse
            ? `${count} You can't download (limit - )`
            : count;
        case "Government Office":
          return count > limitData.governmentOffice
            ? `${count} You can't download (limit - )`
            : count;
        case "Health Care":
          return count > limitData.healthCare
            ? `${count} You can't download (limit - )`
            : count;
        case "Accommodation":
          return count > limitData.accommodation
            ? `${count} You can't download (limit - )`
            : count;
        case "Hotel/Restaurants":
          return count > limitData.hotelRestaurants
            ? `${count} You can't download (limit - )`
            : count;
        case "Park and Recreation Area":
          return count > limitData.parkAndRecreationArea
            ? `${count} You can't download (limit - )`
            : count;
        case "Place of Worship":
          return count > limitData.placeOfWorship
            ? `${count} You can't download (limit - )`
            : count;
        case "Public Amenity":
          return count > limitData.publicAmenity
            ? `${count} You can't download (limit - )`
            : count;
        case "Repair Facility":
          return count > limitData.repairFacility
            ? `${count} You can't download (limit - )`
            : count;
        case "Services":
          return count > limitData.services
            ? `${count} You can't download (limit - )`
            : count;
        case "Shopping Centre":
          return count > limitData.shoppingCentre
            ? `${count} You can't download (limit - )`
            : count;
        case "Sports Centre":
          return count > limitData.sportsCentre
            ? `${count} You can't download (limit - )`
            : count;
        case "Utility":
          return count > limitData.utility
            ? `${count} You can't download (limit - )`
            : count;
        case "Zoo":
          return count > limitData.zoo
            ? `${count} You can't download (limit - )`
            : count;
        case "Shop":
          return count > limitData.shop
            ? `${count} You can't download (limit - )`
            : count;
        default:
          return false;
      }
    }
  };

  /* ------ Update Data Limit ------ */
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

  const containsText = formattedData.some(
    (item) =>
      typeof item.data === "string" && item.data.includes("You can't download")
  );

  const convertedData = {};

  for (const key in categoryCounts) {
    const lowerCaseKey = key
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("");
    convertedData[
      lowerCaseKey.charAt(0).toLowerCase() + lowerCaseKey.slice(1)
    ] = categoryCounts[key];
  }

  const updateLimitData = async () => {
    try {
      const headers = {
        Token: storedToken,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        "http://54.252.180.142:8080/api/user/updatelimit",
        convertedData,
        {
          headers: headers,
        }
      );
      if (response.status === 200) {
        downloadModal();
        modalClose();
      }
      //here when response.status === 200 then download the marker in geojson formatted file if not showing error (confirm button) after confirm the tabel modal pop up will close and data of tabel will null
    } catch (error) {
      console.error("Error updating limit data:", error);
    }
  };

  return (
    <div>
      {/* Category Modal  */}
      <Modal
        open={modalOpen}
        onCancel={modalClose}
        style={{ margin: 10, padding: 0 }}
        centered
        width={"50%"}
        footer={
          <>
            <Button key="back" onClick={modalClose}>
              Cancel
            </Button>

            <Button
              className="bg-green-600"
              key="submit"
              type="primary"
              disabled={containsText}
              onClick={updateLimitData}
            >
              Confirm
            </Button>
          </>
        }
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

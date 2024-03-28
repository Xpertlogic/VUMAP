import React, { useContext, useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import { LoginContext } from "../context/LoginContext";
import axios from "axios";
import { Link } from "react-router-dom";

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
          return count > limitData.airports ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Rail":
          return "Contact Us";
        case "Railway Stations":
          return count > limitData.railwayStations ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Roads":
          return "Contact Us";
        case "Buildings":
          return "Contact Us";
        case "House Number":
          return "For Premium Plus Member Only";
        case "Automotive Dealer":
          return count > limitData.automotiveDealer ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Building POI":
          return count > limitData.buildingPOI ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Business Park":
          return count > limitData.businessPark ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Companies":
          return count > limitData.companies ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Education":
          return count > limitData.education ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Entertainment":
          return count > limitData.entertainment ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Finance":
          return count > limitData.finance ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Golf Course":
          return count > limitData.golfCourse ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Government Office":
          return count > limitData.governmentOffice ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Health Care":
          return count > limitData.healthCare ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Accommodation":
          return count > limitData.accommodation ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Hotel/Restaurants":
          return count > limitData.hotelRestaurants ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Park and Recreation Area":
          return count > limitData.parkAndRecreationArea ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Place of Worship":
          return count > limitData.placeOfWorship ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Public Amenity":
          return count > limitData.publicAmenity ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Repair Facility":
          return count > limitData.repairFacility ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Services":
          return count > limitData.services ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Shopping Centre":
          return count > limitData.shoppingCentre ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Sports Centre":
          return count > limitData.sportsCentre ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Utility":
          return count > limitData.utility ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Zoo":
          return count > limitData.zoo ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Shop":
          return count > limitData.shop ? (
            <span className="span-text">
              {count} - Your limit (Limit-50) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        default:
          return false;
      }
    } else if (userData.tier === "tier2") {
      switch (name) {
        case "Airports":
          return count > limitData.airports ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Rail":
          return "Contact Us";
        case "Railway Stations":
          return count > limitData.railwayStations ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Roads":
          return "Contact Us";
        case "Buildings":
          return "Contact Us";
        case "House Number":
          return count > limitData.houseNo ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Automotive Dealer":
          return count > limitData.automotiveDealer ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Building POI":
          return count > limitData.buildingPOI ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Business Park":
          return count > limitData.businessPark ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Companies":
          return count > limitData.companies ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Education":
          return count > limitData.education ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Entertainment":
          return count > limitData.entertainment ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Finance":
          return count > limitData.finance ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Golf Course":
          return count > limitData.golfCourse ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Government Office":
          return count > limitData.governmentOffice ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Health Care":
          return count > limitData.healthCare ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Accommodation":
          return count > limitData.accommodation ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Hotel/Restaurants":
          return count > limitData.hotelRestaurants ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Park and Recreation Area":
          return count > limitData.parkAndRecreationArea ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Place of Worship":
          return count > limitData.placeOfWorship ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Public Amenity":
          return count > limitData.publicAmenity ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Repair Facility":
          return count > limitData.repairFacility ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Services":
          return count > limitData.services ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Shopping Centre":
          return count > limitData.shoppingCentre ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Sports Centre":
          return count > limitData.sportsCentre ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Utility":
          return count > limitData.utility ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Zoo":
          return count > limitData.zoo ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
        case "Shop":
          return count > limitData.shop ? (
            <span className="span-text">
              {count} - Your limit (Limit-150) exceeded. For more data{" "}
              <Link to="/contact" className="text-blue-300">
                Contact Us
              </Link>
              .
            </span>
          ) : (
            count
          );
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
      typeof item.data === "object" && // Check if data is JSX element
      React.Children.toArray(item.data.props.children).some(
        (child) =>
          typeof child === "string" && // Check if child is a string
          child.includes(
            "exceeded"
          )
      )
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
        "https://gismapslayers.com/api/user/updatelimit",
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

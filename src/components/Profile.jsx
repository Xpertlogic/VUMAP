import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Space, Button, Avatar } from "antd";
import { LoginContext } from "../context/LoginContext";
import { useContext, useState, useEffect } from "react";

const Profile = () => {
  const { userData, logout } = useContext(LoginContext);

  //-> Username
  const Name = userData.username;

  //->Plan
  const [planInfo, setPlanInfo] = useState({});

  useEffect(() => {
    if (userData.tier === "tier1") {
      setPlanInfo({ type: "Basic", colorClass: "basic-plan" });
    } else if (userData.tier === "tier2") {
      setPlanInfo({ type: "Business", colorClass: "business-plan" });
    } else if (userData.tier === "free") {
      setPlanInfo({ type: "Free", colorClass: "free-plan" });
    }
  }, [userData]);

  /* ---------- Download Boundary -------- */
  const handleDownloadBoundary = () => {
    const dropboxLink =
      "https://www.dropbox.com/scl/fi/nw4rpd8r2g798i1dtd61a/vumtech_19th.zip?rlkey=drnpsicogdbkhtujr19thavs6&dl=0";
    window.location.href = dropboxLink;
  };

  /* ---------- Sample Data -------- */

  /* ---------- Logout -------- */
  const handleLogout = () => {
    logout();
  };

  const items = [
    {
      label: (
        <div className="profile-box">
          <h3 className="profile-name">{Name}</h3>
          <p className={planInfo.colorClass}>{planInfo.type} Plan</p>
        </div>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <p className="profile-link" onClick={handleDownloadBoundary}>
          Download Boundary
        </p>
      ),
      key: "2",
    },
    {
      label: (
        <p className="profile-link" onClick={handleDownloadBoundary}>
          Sample Data
        </p>
      ),
      key: "3",
    },

    {
      label: (
        <div className="profile-btn">
          <Button
            className="button-item"
            type="primary"
            size="large"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ),
      key: "4",
    },
  ];

  return (
    <div>
      <Dropdown
        overlayClassName="menu"
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <div onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar
              className="profile-icon-box"
              icon={<UserOutlined className="profile-icon" />}
            />
          </Space>
        </div>
      </Dropdown>
    </div>
  );
};

export default Profile;

import { WhatsAppOutlined } from "@ant-design/icons";
import { useContext, useEffect } from "react";
import { LoginContext } from "../context/LoginContext";

const Help = () => {
  const { loggedIn } = useContext(LoginContext);

  useEffect(() => {
    if (loggedIn) {
      const interval = setInterval(() => {
        const helpSection = document.querySelector(".help-section");
        helpSection.classList.add("jump");
        setTimeout(() => {
          helpSection.classList.remove("jump");
        }, 1000);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [loggedIn]);
  return (
    <section>
      <a
        href="https://wa.me/7749872073"
        className="help-section"
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppOutlined className="whatsapp-icon" />
      </a>
    </section>
  );
};

export default Help;

import { useState } from "react";
import { Button, Modal } from "antd";
import Signup from "./Signup";
import Signin from "./Signin";

function Buttons() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const showSignInModal = () => {
    setIsSignInModalOpen(true);
  };

  const hideSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  const showSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const hideSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  return (
    <>
      <div>
        <Button type="primary" onClick={showSignInModal}>
          Sign In
        </Button>
        <Button type="primary" onClick={showSignUpModal}>
          Sign Up
        </Button>
      </div>
      {/* Sign In Modal  */}
      <Modal
        title="Sign In"
        open={isSignInModalOpen}
        onOk={hideSignInModal}
        onCancel={hideSignInModal}
        footer={null}
      >
        <Signin />
      </Modal>

      {/* Sign Up Modal  */}
      <Modal
        title="Sign Up"
        open={isSignUpModalOpen}
        onOk={hideSignUpModal}
        onCancel={hideSignUpModal}
        footer={null}
      >
        <Signup />
      </Modal>
    </>
  );
}

export default Buttons;

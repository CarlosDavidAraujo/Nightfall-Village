import { useState } from "react";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import MenuModal from "../Modals/MenuModal";
import Button from "../../Styles/elements/Button";
import AwesomeIcon from "../../Styles/elements/FontAwesomeIcon";

export default function HomeButton() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setIsModalVisible(true)} style={{ with: 50, height: 40 }}>
        <AwesomeIcon icon={faHome}/>
      </Button>
      <MenuModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
}

import { useState } from "react";
import DefaultButton from "./DefaultButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { dark } from "../../Themes/Dark";
import MenuModal from "../Modals/MenuModal";

export default function HomeButton() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <DefaultButton
        title={<FontAwesomeIcon icon={faHome} color={dark.color} />}
        onPress={() => setIsModalVisible(true)}
        style={{ with: 50, height: 40 }}
      />
      <MenuModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
}

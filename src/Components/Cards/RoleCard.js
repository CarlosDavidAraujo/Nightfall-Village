import { useState } from "react";
import { ThemeProvider } from "styled-components/native";
import { theme, invertTheme } from "../../Styles/Theme";
import RoleInfoModal from "../Modals/RoleInfoModal";
import minusIcon from "../../../assets/images/minus.png";
import plusIcon from "../../../assets/images/plus.png";
import Card from "../../Styles/blocks/Card";
import Button from "../../Styles/elements/Button";

export default function RoleCard({
  count,
  onDecrease,
  onIncrease,
  onPress,
  selected,
  role,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Card
      onPress={onPress}
      disabled={role.getName() === "Zumbi"}
      style={{ height: "auto" }}
    >
      <Card.Header modifiers={['end', 'grow']}>
        <ThemeProvider theme={invertTheme(theme)}>
          <Button onPress={() => setIsModalVisible(true)} modifiers='round'>
            <Button.Text>i</Button.Text>
          </Button>
        </ThemeProvider>
      </Card.Header>

      <Card.Body>
        <Card.Image source={role.getRoleImg()} />
        <Card.Text
          modifiers='small'
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ maxWidth: 50 * 2 }}
        >
          {role.getName()}
        </Card.Text>
      </Card.Body>

      {selected && (
        <Card.Footer modifiers={['spaceBetween', 'grow']}>
          <Button onPress={onDecrease} style={{ borderWidth: 0 }}>
            <Button.Image source={minusIcon} />
          </Button>
          <Card.Text>{count}</Card.Text>
          <Button onPress={onIncrease} style={{ borderWidth: 0 }}>
            <Button.Image source={plusIcon} />
          </Button>
        </Card.Footer>
      )}

      <RoleInfoModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        role={role}
      />
    </Card>
  );
}

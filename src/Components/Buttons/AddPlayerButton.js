import { useState } from "react";
import styled from "styled-components/native";
import Card from "../../Styles/blocks/Card";

const AddIcon = styled.Text`
  font-family: "NewRocker_400Regular";
  font-size: 100px;
  line-height: 100px;
  text-align: center;
  width: 80px;
  color: ${(props) => props.theme.color};
`;

export default function AddPlayer({ onPress }) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Card
      style={{ opacity: isPressed ? 0.6 : 0.8 }}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <AddIcon>+</AddIcon>
      <Card.Text>Adicionar jogador</Card.Text>
    </Card>
  );
}

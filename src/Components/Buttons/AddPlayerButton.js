import { useState } from "react";
import { ThemeProvider } from "styled-components";
import styled from "styled-components/native";
import { DefaultText, ButtonContainer, CardContainer } from "../../Styles";
import { dark, invertTheme } from "../../Themes/Dark";

const AddIcon = styled.Text`
  font-family: 'NewRocker_400Regular';
  font-size: 100px;
  line-height: 100px;
  text-align: center;
  width: 80px;
`;

export default function AddPlayer({ onPress }) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <ThemeProvider theme={invertTheme(dark)}>
      <CardContainer 
      style={{opacity: isPressed? 0.6 : 0.8}} 
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      >
          <AddIcon>+</AddIcon>
          <DefaultText>Adicionar jogador</DefaultText>
      </CardContainer>
    </ThemeProvider>
  )
}
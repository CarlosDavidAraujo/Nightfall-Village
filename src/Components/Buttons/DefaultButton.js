import styled, { ThemeProvider } from "styled-components/native";
import { dark, invertTheme } from "../../Themes/Dark";

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${props => props.theme.bg};
  border-radius: 0;
  border: 2px solid ${props => props.theme.color};
  padding: 5px 10px;
  align-items: center;
`;

const Title = styled.Text`
  color: ${props => props.theme.color};
  font-size: 18px;
`;

export default function DefaultButton({
  onPress,
  title,
  style,
  disabled,
  inverted
}) {

  const theme = inverted? invertTheme(dark) : dark

  return (
    <ThemeProvider theme={theme}>
      <ButtonContainer
        onPress={onPress}
        style={style}
        disabled={disabled}
      >
        <Title style={{ fontFamily: 'NewRocker_400Regular' }}>{title}</Title>
      </ButtonContainer>
    </ThemeProvider>
  )
};

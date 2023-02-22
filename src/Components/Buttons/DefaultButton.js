import  { ThemeProvider } from "styled-components/native";
import { dark, invertTheme } from "../../Themes/Dark";
import { DefaultText, ButtonContainer } from "../../Styles";
import { Image } from "react-native";

export default function DefaultButton({
  onPress,
  title,
  style,
  disabled,
  inverted,
  icon
}) {

  const theme = inverted? invertTheme(dark) : dark

  return (
    <ThemeProvider theme={theme}>
      <ButtonContainer
        onPress={onPress}
        style={style}
        disabled={disabled}
      >    
        <DefaultText >{title}</DefaultText>
        <Image source={icon} style={{position: 'absolute', top: -20}}/>
      </ButtonContainer>
    </ThemeProvider>
  )
};

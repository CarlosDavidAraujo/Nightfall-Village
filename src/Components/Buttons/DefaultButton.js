import { ThemeProvider } from "styled-components/native";
import { dark, invertTheme } from "../../Themes/Dark";
import { DefaultText, ButtonContainer } from "../../Styles";
import VoteIcon from "../CustomIcons/VoteIcon";
import PawIcon from "../CustomIcons/PawIcon";

export default function DefaultButton({
  onPress,
  title,
  style,
  disabled,
  inverted,
  showWolfIcon,
  showVotesIcon,
  voteCount
}) {

  const theme = inverted ? invertTheme(dark) : dark

  return (
    <ThemeProvider theme={theme}>
      <ButtonContainer
        onPress={onPress}
        style={style}
        disabled={disabled}
      >
        {showWolfIcon && <PawIcon theme={theme}/>}
        {showVotesIcon && <VoteIcon>{voteCount}</VoteIcon>}
        <DefaultText >{title}</DefaultText>
      </ButtonContainer>
    </ThemeProvider>
  )
};

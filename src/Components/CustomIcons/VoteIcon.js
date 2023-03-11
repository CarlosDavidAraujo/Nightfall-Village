import { ThemeProvider } from "styled-components/native";
import { IconContainer, SmallText } from "../../Styles";
import { invertTheme } from "../../Themes/Dark";

export default function VoteIcon({ children, theme }) {
  return (
    <IconContainer theme={invertTheme(theme)}>
      <ThemeProvider theme={invertTheme(theme)}>
        <SmallText>{children}</SmallText>
      </ThemeProvider>
    </IconContainer>
  );
}

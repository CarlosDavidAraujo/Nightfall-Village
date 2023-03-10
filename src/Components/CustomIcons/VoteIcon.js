import { ThemeProvider } from "styled-components/native";
import { IconContainer } from "../../Styles";
import { DefaultText } from "../../Styles";
import { invertTheme } from "../../Themes/Dark";

export default function VoteIcon({ children, theme }) {
  return (
    <IconContainer theme={invertTheme(theme)}>
      <ThemeProvider theme={invertTheme(theme)}>
        <DefaultText>{children}</DefaultText>
      </ThemeProvider>
    </IconContainer>
  );
}

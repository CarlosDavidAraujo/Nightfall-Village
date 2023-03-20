import React from "react";
import { ThemeProvider } from "styled-components/native";
import { theme, invertTheme } from "../../Styles/Theme";
import Button from "../../Styles/elements/Button";
import VoteIcon from "../CustomIcons/VoteIcon";
import PawIcon from "../CustomIcons/PawIcon";
import SkullIcon from "../CustomIcons/SkullIcon";

export default function DefaultButton({
  onPress,
  title,
  style,
  disabled,
  inverted,
  showWolfIcon,
  showVotesIcon,
  showUndeadIcon,
  voteCount,
}) {
  const newTheme = inverted ? invertTheme(theme) : theme;

  return (
    <ThemeProvider theme={newTheme}>
      <Button onPress={onPress} style={style} disabled={disabled}>
        {showWolfIcon && <PawIcon theme={theme} />}
        {showVotesIcon && <VoteIcon theme={theme}>{voteCount}</VoteIcon>}
        {showUndeadIcon && <SkullIcon theme={theme} />}
        <Button.Text>{title}</Button.Text>
      </Button>
    </ThemeProvider>
  );
}


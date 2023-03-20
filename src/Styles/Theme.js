const theme = {
  colors: {
    primary: "#c7b299",
    secondary: "#1c1c1c",
  },
  fonts: {
    newRocker: 'NewRocker_400Regular',
    germaniaOne: 'GermaniaOne_400Regular',
    sizes: {
      small: "18px",
      medium: "26px",
      large: "42px",
    }
  }
};

const invertTheme = ({ colors, fonts }) => ({
  colors: {
    primary: colors.secondary,
    secondary: colors.primary,
  },
  fonts,
});

export { theme, invertTheme };

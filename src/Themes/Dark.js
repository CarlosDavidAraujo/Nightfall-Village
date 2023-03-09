const dark = {
  bg: "#1c1c1c",
  color: "#c7b299",
};

const invertTheme = ({ bg, color }) => ({
  bg: color,
  color: bg,
});

export { dark, invertTheme };

const dark = {
    bg: '#1c1c1c',
    color: '#f5deb3'
}

const invertTheme= ({ bg, color }) => ({
    bg: color,
    color: bg
});

export {dark, invertTheme}
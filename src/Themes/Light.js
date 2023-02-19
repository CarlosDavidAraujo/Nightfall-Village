const light = {
    bg: '#1c1c1c',
    color: 'white'
}

const invertTheme= ({ bg, color }) => ({
    bg: color,
    color: bg
});

export {light, invertTheme}
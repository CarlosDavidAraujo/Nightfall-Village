import { useState } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { dark, invertTheme } from "../../Themes/Dark";

export default function ButtonWithShadow({ onPress, children, style, inverted, disabled, skillUsed }) {
    const [isPressed, setIsPressed] = useState(false);
    const theme = inverted ? invertTheme(dark) : dark;

    return (
        <ThemeProvider theme={theme}>
            <Container style={style}
                isPressed={isPressed}
                disabled={disabled}
                skillUsed={skillUsed}
                inverted={inverted}
                onPress={onPress}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
            >
                {!isPressed && !disabled && <Shadow />}
                <Content>
                    {children}
                </Content>
            </Container>
        </ThemeProvider>
    );
};

const Container = styled.Pressable`
    position: relative;
    flex-direction: row;
    margin-top: 4%;
    opacity: ${props => props.skillUsed ? 0.6 : 1};
    transform: ${({ isPressed, inverted }) => isPressed || !inverted ? 'translate(5px, 5px)' : 'translate(0, 0)'};
`;

const Content = styled.View` 
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 2px solid ${props => props.theme.color};
    background-color:  ${props => props.theme.bg};
    width: 100%;
    height: 100%;
    padding: 5px;
`;

const Shadow = styled.View`
    background-color: ${props => props.theme.color};
    transform: translate(5px, 5px); 
    position: absolute;
    width: 100%;
    height: 100%;
`;

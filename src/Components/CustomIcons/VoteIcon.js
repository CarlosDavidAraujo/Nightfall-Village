import styled, { ThemeProvider } from "styled-components/native";
import { DefaultText } from "../../Styles";
import { dark, invertTheme } from "../../Themes/Dark";

const IconContainer = styled.View`
    border-radius: 50;
    background-color: ${props => props.theme.bg};
    width: 20;
    height: 20;
    align-self: flex-end;
    margin-right: -20px;
    margin-top: -20px;
`;

export default function VoteIcon({ children }) {
    return (
        <ThemeProvider theme={dark}>
            <IconContainer >
                <DefaultText>{children}</DefaultText>
            </IconContainer>
        </ThemeProvider>

    );
}
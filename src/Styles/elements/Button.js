import styled from "styled-components/native";
import { applyStyleModifiers } from "styled-components-modifiers";
import Text from "./Text";

const MODIFIER_CONFIG = {
  grow: () => `
    width: 100%;
  `,
  round: () => `
    border-radius: 50;
  `,
  large: () => `
    height: 50px;
  `,
  active: ({theme}) => `
    background-color: ${theme.colors.secondary};
    border: 2px solid ${theme.colors.primary};
  `,
  transparent: () => `
    background-color: transparent;
    `,
  noBorder: () => `
    border: none;
  `,
  noPadding: () => `
    padding: 0;
  `
};

const IconContainer = styled.View`
  position: absolute;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  top: -13px;
  right: -8px;
  aspect-ratio: 1;
  border-radius: 50;
  width: 28px;
  padding: 4px;
  background-color: ${(props) => props.theme.colors.primary};
  border: 2px solid ${(props) => props.theme.colors.secondary};
`;

const Image = styled.Image`
  width:20px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  border: 2px solid ${(props) => props.theme.colors.secondary};
  border-radius: 2px;
  padding: 5px 10px;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  ${applyStyleModifiers(MODIFIER_CONFIG)};
`;

Button.Text = Text;
Button.IconContainer = IconContainer;
Button.Image = Image;

export default Button;
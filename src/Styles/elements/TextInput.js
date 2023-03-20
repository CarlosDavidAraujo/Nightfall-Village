import styled from "styled-components/native";
import { applyStyleModifiers } from 'styled-components-modifiers';

const MODIFIER_CONFIG = {
    small: () => `
      font-size: ${(props) => props.theme.fonts.sizes.small};
    `,
    medium: () => `
      font-size: ${(props) => props.theme.fonts.sizes.medium};
    `,
    large: () => `
      font-size: ${(props) => props.theme.fonts.sizes.large};
    `,
  };

const TextInput = styled.TextInput`
  color: ${(props) => props.theme.colors.secondary};
  font-size: ${(props) => props.theme.fonts.sizes.small};
  font-family: "GermaniaOne_400Regular";
  ${applyStyleModifiers(MODIFIER_CONFIG)};
`;

export default TextInput;

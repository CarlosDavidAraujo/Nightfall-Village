import styled from "styled-components/native";
import { applyStyleModifiers } from 'styled-components-modifiers';

const MODIFIER_CONFIG = {
    small: ({theme}) => `
      font-size: ${theme.fonts.sizes.small};
    `,
    medium: ({theme}) => `
      font-size: ${theme.fonts.sizes.medium};
      font-family: ${theme.fonts.newRocker};
    `,
    large: ({theme}) => `
      font-size: ${theme.fonts.sizes.large};
      font-family: ${theme.fonts.newRocker};
    `,
    rotated: () => `
      transform: rotateX(30deg) rotateY(-20deg) rotateZ(-13deg);
    `
  };

const Text = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 18px;
  font-family: ${(props) => props.theme.fonts.germaniaOne};
  text-align: center;
  ${applyStyleModifiers(MODIFIER_CONFIG)};
`;

export default Text;


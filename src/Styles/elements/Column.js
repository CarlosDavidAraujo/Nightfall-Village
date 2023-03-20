import styled from "styled-components/native";
import { applyStyleModifiers } from "styled-components-modifiers";

const MODIFIER_CONFIG = {
  start: () => `justify-content: flex-start`,
  center: () => `justify-content: center`,
  end: () => `justify-content: flex-end`,
  spaceBetween: () => `justify-content: space-between`,
  spaceAround: () => `justify-content: space-around`,
  spaceEvenly: () => `justify-content: space-evenly`,
  grow: () => `
    flex: 1;
  `,
  primary: ({theme}) => `
    background-color: ${theme.colors.primary}; 
  `
}

const Column = styled.View`
  justify-content: flex-start;
  align-items: center;
  background-color: transparent; 
  ${applyStyleModifiers(MODIFIER_CONFIG)}
`;

export default Column;
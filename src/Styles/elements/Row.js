import styled from "styled-components/native";
import { applyStyleModifiers } from "styled-components-modifiers";

const MODIFIER_CONFIG = {
  start: () => `justify-content: flex-start`,
  center: () => `justify-content: center`,
  end: () => `justify-content: flex-end`,
  spaceBetween: () => `justify-content: space-between`,
  spaceAround: () => `justify-content: space-around`,
  spaceEvenly: () => `justify-content: space-evenly`,
  grow: () => `width: 100%`
}

const Row = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  ${applyStyleModifiers(MODIFIER_CONFIG)}
`;

export default Row;
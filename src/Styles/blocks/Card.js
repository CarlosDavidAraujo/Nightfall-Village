import styled from "styled-components/native";
import Text from "../elements/Text";
import Row from "../elements/Row";

const Body = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const Image = styled.Image`
  width: 70px;
  height: 70px;
`;

const Card = styled.Pressable`
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary};
  height: 180px;
  padding: 10px 5px;
  border-radius: 4px;
  border: 3px solid ${(props) => props.theme.colors.secondary};
`;

Card.Header = Row;
Card.Body = Body;
Card.Footer = Row;
Card.Image = Image;
Card.Text = Text;

export default Card;
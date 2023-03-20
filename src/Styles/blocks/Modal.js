import styled from "styled-components/native";
import Column from "../elements/Column";
import Row from "../elements/Row";

const Modal = styled.View`
  flex: 1;
  align-items: center;
`;

Modal.Header = Row;
Modal.Body = Column;
Modal.Footer = Row;

export default Modal;
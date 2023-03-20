import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import styled from "styled-components";

const AwesomeIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.secondary};
`;

export default AwesomeIcon;
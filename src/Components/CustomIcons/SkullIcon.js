import styled from "styled-components/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSkull} from "@fortawesome/free-solid-svg-icons";

export default function SkullIcon({theme}) {
    return (
        <IconContainer theme={theme}>
            <FontAwesomeIcon icon={faSkull} color={theme.color}/>
        </IconContainer>
    );
}

const IconContainer = styled.View`
    width: 20px;
    height: 20px;
    align-self: flex-end;
    align-items: center;
    margin-top: -20px;
    margin-right: -20px;
    border-radius: 50;
`;
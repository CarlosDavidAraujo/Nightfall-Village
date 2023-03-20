import styled from "styled-components/native";
import Text from "../../Styles/elements/Text";
import ButtonWithShadow from "./ButtonWithShadow";

export default function SkillButton({ onPress, skillName, skillDescription, skillIcon, disabled, showOpacity }) {
    return (
        <ButtonWithShadow onPress={onPress} inverted={true} disabled={disabled} showOpacity={showOpacity}> 
                <IconContainer>
                    <Image source={skillIcon} />
                    <Text>{skillName}</Text>
                </IconContainer>
                <Text style={{ flexShrink: 1, textAlign: 'justify' }}>{skillDescription}</Text>   
        </ButtonWithShadow>
    );
};

const IconContainer = styled.View`
    align-items: center; 
    margin-right: 4%;
    width: 27%;
    aspect-ratio: 1;
`;

const Image = styled.Image`
    height: 80%;
    width: 80%;
`;







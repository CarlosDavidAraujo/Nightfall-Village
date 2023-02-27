import styled from "styled-components/native";
import { SmallText } from "../../Styles";
import ButtonWithShadow from "./ButtonWithShadow";

export default function SkillButton({ onPress, skillName, skillDescription, skillIcon, disabled, skillUsed }) {
    return (
        <ButtonWithShadow onPress={onPress} inverted={true} disabled={disabled} skillUsed={skillUsed}> 
                <IconContainer>
                    <Image source={skillIcon} />
                    <SmallText>{skillName}</SmallText>
                </IconContainer>
                <SmallText style={{ flexShrink: 1, textAlign: 'justify' }}>{skillDescription}</SmallText>   
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







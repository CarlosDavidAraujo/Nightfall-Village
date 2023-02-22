import styled from "styled-components/native";
import { DefaultText } from "../../Styles";
import ButtonWithShadow from "./ButtonWithShadow";

export default function SkillButton({ onPress, skillName, skillDescription, skillIcon, disabled, skillUsed }) {
    return (
        <ButtonWithShadow onPress={onPress} inverted={true} disabled={disabled} skillUsed={skillUsed}> 
                <IconContainer>
                    <Image source={skillIcon} />
                    <DefaultText>{skillName}</DefaultText>
                </IconContainer>
                <DefaultText style={{ flexShrink: 1, textAlign: 'justify' }}>{skillDescription}</DefaultText>   
        </ButtonWithShadow>
    );
};

const IconContainer = styled.View`
    align-items: center; 
    margin-right: 2%;
`;

const Image = styled.Image`
    height: 70;
    width: 70;
`;







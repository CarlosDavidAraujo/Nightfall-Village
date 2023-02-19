import { useState } from "react";
import styled from "styled-components/native";

export default function SkillButton({ onPress, skillName, skillDescription, skillIcon }) {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <Container
            isPressed={isPressed}
            onPress={onPress}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
        >   
            {!isPressed && <Shadow />}
            <Content >
                <IconContainer>
                    <Image source={skillIcon} />
                    <Text style={{ fontFamily: 'NewRocker_400Regular'}}>{skillName}</Text>
                </IconContainer>
                <Text style={{ fontFamily: 'NewRocker_400Regular'}}>{skillDescription}</Text>
            </Content>
        </Container>

    );
};

const Container = styled.TouchableOpacity`
  flex-direction: row;
  position: relative;
  width: 100%;
  height: 100px;
  background-color: yellow;
  transform: ${({ isPressed }) => isPressed ? 'translate(5px, 5px)' : 'translate(0, 0)'};
`;

const Content = styled.View` 
    flex: 1;
    flex-direction: row;
    align-items: center;
    padding-right: 10px;
    border: 2px solid black;
    background-color:  #f5deb3;
`;

const IconContainer = styled.View`
    align-items: center; 
    margin-right: 10px;
`;

const Image = styled.Image`
    height: 70;
    width: 70;
`;

const Shadow = styled.View`
    background-color: black;
    width: 100%;
    height: 100px;
    transform: translate(5px, 5px); 
    position: absolute;
`;

const Text = styled.Text`
    font-size: 18;
    flex-shrink: 1;
    text-align: justify;
`;





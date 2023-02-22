import styled from "styled-components/native";
import { dark } from "./Themes/Dark";

export const ButtonContainer = styled.TouchableOpacity`
    background-color: ${props => props.theme.bg};
    border: 2px solid ${props => props.theme.color};
    border-radius: 2px;
    padding: 5px 10px;
    align-items: center;
    justify-content: center;
    opacity: ${props => props.disabled? 0.4 : 1};
`;

export const NavigationContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-self: flex-end;
`;

export const VoteButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
`;

export const DefaultText = styled.Text`
    color: ${props => props.theme.color};
    font-size: 18px;
    font-family: 'NewRocker_400Regular';
    text-align: center;
`;

export const RotatedText = styled.Text`
  transform: rotateX(30deg) rotateY(-20deg) rotateZ(-13deg); 
  color: ${props => props.theme.color};
  font-size: 30px;
  font-family: 'NewRocker_400Regular';
`;

export const Title = styled.Text`
    color: ${props => props.theme.color};
    font-size: 40px;
    font-family: 'NewRocker_400Regular';
    text-align: center;
`;

export const SubTitle = styled.Text`
    color: ${props => props.theme.color};
    font-size: 30px;
    font-family: 'NewRocker_400Regular';
    text-align: center;
`;

export const TextInput = styled.TextInput`
    font-family: 'NewRocker_400Regular';
    font-size: 18px;
    color: ${props => props.theme.color};
`;

export const CardContainer = styled.Pressable`
    align-items: center;
    background-color: ${dark.color};
    height: 180px;
    padding: 10px 5px;
    border-radius: 2px;
    border: 3px solid black;
`;


export const BackgroundImage = styled.ImageBackground`
    flex: 1;
    object-fit: cover;
`;

export const ScreenContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
    padding-top: 100px;
`;

export const RoleScreenContainer = styled.View`
    flex: 1;
    align-items: center;
`;

export const SkillsContainer = styled.View`
    align-items: center;
    height: 35%;
    justify-content: space-evenly;
`;

export const RoleImage = styled.Image`
    width: 250px;
    height: 250px;
`;


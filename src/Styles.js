import styled from "styled-components/native";

export const ButtonContainer = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.secondary};
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 2px;
  padding: 5px 10px;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
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

export const IconContainer = styled.View`
  position: absolute;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  top: -13px;
  right: -8px;
  aspect-ratio: 1;
  border-radius: 50;
  width: 28px;
  padding: 4px;
  background-color: ${(props) => props.theme.colors.primary};
  border: 2px solid ${(props) => props.theme.colors.secondary};
`;

export const DefaultText = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: 18px;
  font-family: "GermaniaOne_400Regular";
  text-align: center;
`;

export const SmallText = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: 16px;
  font-family: "GermaniaOne_400Regular";
  text-align: justify;
  flex-shrink: 1;
`;

export const RotatedText = styled.Text`
  transform: rotateX(30deg) rotateY(-20deg) rotateZ(-13deg);
  color: ${(props) => props.theme.colors.secondary};
  font-size: 30px;
  font-family: "GermaniaOne_400Regular";
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 40px;
  font-family: "NewRocker_400Regular";
  text-align: center;
`;

export const SubTitle = styled.Text`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 30px;
  font-family: "NewRocker_400Regular";
  text-align: center;
`;

export const TextInput = styled.TextInput`
  font-family: "GermaniaOne_400Regular";
  font-size: 18px;
  color: ${(props) => props.theme.colors.secondary};
`;

export const CardContainer = styled.Pressable`
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary};
  height: 180px;
  padding: 10px 5px;
  border-radius: 4px;
  border: 3px solid ${(props) => props.theme.colors.secondary};
`;

export const BackgroundImage = styled.ImageBackground`
  flex: 1;
  object-fit: cover;
`;

export const SpaceAroundContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
`;

export const SpaceBetweenContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export const FlexStartContainer = styled.View`
  align-items: center;
  justify-content: flex-start;
`;

export const SkillsContainer = styled.View`
  align-items: center;
`;

export const RoleImage = styled.Image`
  height: 100%;
  width: 100%;
`;

export const RoleImageContainer = styled.View`
  width: 50%;
  aspect-ratio: 1;
`;

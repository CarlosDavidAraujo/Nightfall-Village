import { useState } from "react";
import styled from "styled-components/native";

export default function ButtonWithShadow({
  onPress,
  children,
  style,
  inverted,
  disabled,
  showOpacity,
}) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Container
      style={style}
      isPressed={isPressed}
      disabled={disabled}
      showOpacity={showOpacity}
      inverted={inverted}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      {!isPressed && !disabled && <Shadow />}
      <Content>{children}</Content>
    </Container>
  );
}

const Container = styled.Pressable`
  position: relative;
  flex-direction: row;
  margin-top: 4%;
  opacity: ${(props) => (props.showOpacity ? 0.6 : 1)};
  transform: ${({ isPressed, inverted }) =>
    isPressed || !inverted ? "translate(5px, 5px)" : "translate(0, 0)"};
`;

const Content = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 2px solid ${(props) => props.theme.colors.secondary};
  background-color: ${(props) => props.theme.colors.primary};
  width: 100%;
  height: 100%;
  padding: 5px;
`;

const Shadow = styled.View`
  background-color: ${(props) => props.theme.colors.secondary};
  transform: translate(5px, 5px);
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

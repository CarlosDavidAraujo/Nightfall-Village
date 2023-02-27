import { View } from "react-native";
import Modal from "react-native-modal";
import { RoleImage, SkillsContainer, Title, SubTitle, DefaultText, FlexStartContainer, RoleImageContainer } from "../../Styles";
import { dark, invertTheme } from "../../Themes/Dark";
import CloseButton from "../Buttons/CloseButton";
import SkillButton from "../Buttons/SkillButton";

export default function RoleInfoModal({ isVisible, onClose, role }) {
    return (
        <View>
            <Modal
                isVisible={isVisible}
                style={{ backgroundColor: invertTheme(dark).bg, padding: 10, justifyContent: 'flex-start' }} >
                <FlexStartContainer>
                    <CloseButton onPress={onClose} />
                    <Title>{role.getName()}</Title>
                    <RoleImageContainer>
                        <RoleImage source={role.getRoleImg()} />
                    </RoleImageContainer>
                    <DefaultText>{`Você faz parte do time dos "${role.getTeam()}". Seu objetivo é ${role.getObjective()}`}</DefaultText>
                    <SubTitle style={{ marginTop: '5%' }}>Habilidades</SubTitle>
                    <SkillsContainer>
                        <SkillButton
                            skillName={role.getFirstSkillName()}
                            skillIcon={role.getFirstSkillIcon()}
                            skillDescription={role.getFirstSkillDescription()}
                            disabled={true}
                        />
                        <SkillButton
                            skillName={role.getSecondSkillName()}
                            skillIcon={role.getSecondSkillIcon()}
                            skillDescription={role.getSecondSkillDescription()}
                            disabled={true}
                        />
                    </SkillsContainer>
                </FlexStartContainer >
            </Modal>
        </View>
    )
}
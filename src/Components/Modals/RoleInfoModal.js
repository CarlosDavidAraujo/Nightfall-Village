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
                    <DefaultText>{role.getObjective()}</DefaultText>
                    <SubTitle style={{ marginTop: '5%' }}>Habilidades</SubTitle>
                    <SkillsContainer>
                        <SkillButton
                            skillName={role.getSkillName(1)}
                            skillIcon={role.getSkillIcon(1)}
                            skillDescription={role.getSkillDescription(1)}
                            disabled={true}
                        />
                        <SkillButton
                            skillName={role.getSkillName(2)}
                            skillIcon={role.getSkillIcon(2)}
                            skillDescription={role.getSkillDescription(2)}
                            disabled={true}
                        />
                    </SkillsContainer>
                </FlexStartContainer >
            </Modal>
        </View>
    )
}
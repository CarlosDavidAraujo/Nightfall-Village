import { View } from "react-native"
import { SubTitle } from "../../Styles";

export default function ConditionalMessage({ showChooseSkill, showSelectPlayer, selectPlayerMessage, showAlert, alertMessage }) {
    return (
        <View>
            {showChooseSkill &&
                <SubTitle >
                    Selecione uma habilidade
                </SubTitle>
            }
            {showSelectPlayer &&
                <SubTitle >
                    {selectPlayerMessage}
                </SubTitle>
            }
            {showAlert &&
                <SubTitle >
                    {alertMessage}
                </SubTitle>
            }
        </View>
    )
}

import DefaultButton from "./DefaultButton";
import { FontAwesomeIcon, FontAwesomeIconStyle } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { dark } from "../../Themes/Dark";

export default function BackButton() {
    const navigation = useNavigation();

    return (
        <DefaultButton
            title={<FontAwesomeIcon icon={faArrowLeft} color={dark.color}/>}
            onPress={() => navigation.goBack()}
        />
    );
}
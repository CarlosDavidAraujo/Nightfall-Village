import { SectionGrid } from "react-native-super-grid";
import RoleCard from "../Cards/RoleCard";
import { SubTitle } from "../../Styles";
import { ThemeProvider } from "styled-components/native";
import { dark } from "../../Themes/Dark";

export default function AvailableRolesGrid({ roleMap, selectedRoles, setSelectedRoles }) {

    const availableRoles = roleMap.map((team) => {
        const availableData = team.data.filter(role => !alreadySelected(role));
        return { ...team, data: availableData };
    });

    function alreadySelected(role) {
        return selectedRoles.some((selectedRole) => selectedRole.role.name === role.name);
    }

    function addRole(roleToAdd) {
        const roleIndex = selectedRoles.findIndex((selectedRole) => selectedRole.role.name === roleToAdd.name);
        const notInSelectedRoleYet = roleIndex < 0;
        notInSelectedRoleYet && setSelectedRoles([...selectedRoles, { role: roleToAdd, count: 1 }]);
    }

    return (
            <SectionGrid
                itemDimension={110}
                spacing={5}
                sections={availableRoles}
                renderItem={({ item }) => (
                    <RoleCard
                        role={item}
                        onPress={() => addRole(item)}
                    />
                )}
                renderSectionHeader={({ section }) => (
                    <ThemeProvider theme={dark}>
                        <SubTitle style={{ marginTop: 50, marginBottom: 10}}>
                            {section.team}
                        </SubTitle>
                    </ThemeProvider>
                )}
            />
    )
}
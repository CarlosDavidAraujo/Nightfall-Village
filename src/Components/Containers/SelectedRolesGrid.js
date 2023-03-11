import RoleCard from "../Cards/RoleCard";
import { SimpleGrid } from "react-native-super-grid";
import { ThemeProvider } from "styled-components/native";
import { SubTitle } from "../../Styles";
import { dark } from "../../Themes/Dark";

export default function SelectedRolesGrid({ selectedRoles, setSelectedRoles }) {

    const handleIncrease = (index) => {
        const updatedSelectedRoles = [...selectedRoles];
        updatedSelectedRoles[index].count += 1;
        setSelectedRoles(updatedSelectedRoles);
    };

    const handleDecrease = (index) => {
        setSelectedRoles(prevSelectedRoles => {
            const newSelectedRoles = [...prevSelectedRoles];
            newSelectedRoles[index].count -= 1;
            if (newSelectedRoles[index].count === 0) {
                newSelectedRoles.splice(index, 1);
            }
            return newSelectedRoles;
        });
    };

    return (
        <>
            <ThemeProvider theme={dark}>
                <SubTitle>Papéis Selecionados</SubTitle>
            </ThemeProvider>
            <SimpleGrid
                itemDimension={110}
                data={selectedRoles}
                spacing={5}
                renderItem={({ item, index }) => (
                    <RoleCard
                        role={item.role}
                        count={item.count}
                        selected={true}
                        onIncrease={() => handleIncrease(index)}
                        onDecrease={() => handleDecrease(index)}
                    />
                )}
            />
        </>
    )
}
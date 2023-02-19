import { useContext, useState } from "react";
import SkillButton from "../Buttons/SkillButton";
import spyIcon from '../../Images/keyHole.png';
import { GameContext } from "../../Context/GameContext";

export default function SpySkill({currentGame, villager, playerList, discoveredWereWolf, setDiscoveredWereWolf}) {
    function handleSpy(gameInstance) {
        setDiscoveredWereWolf(villager.espiar(playerList, gameInstance));
        if (!discoveredWereWolf) {
            return passTurn();
        }
        setSkillWasChosen(true);
    }

    return (
        <SkillButton
            onPress={() => handleSpy()}
            skillName='Espiar'
            skillDescription='Há uma pequena chance de você descobrir um lobisomem, mas uma pequena chance de você morrer.'
            skillIcon={spyIcon}
        />
    )
}
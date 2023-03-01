import Role from "./Role";
import doctorImg from "../../assets/images/doctor.png";
import firstSkillIcon from "../../assets/images/medicine.png";
import secondSkillIcon from "../../assets/images/syringe.png";

export default class Doctor extends Role {
    constructor() {
        super(
            "Médica",
            "Aldeões",
            "Human",
            true,
            doctorImg,
            "manter os aldeões vivos",
            {
                name: "Curar",
                description: "Impede um jogador de morrer esta noite. Não pode selecionar o mesmo alvo em turnos seguidos.",
                isTargetType: true,
                icon: firstSkillIcon,
            },
            {
                name: "Reanimar",
                description: "Uma vez por jogo ressuscite um jogador eliminado.",
                isTargetType: true,
                icon: secondSkillIcon,
            }
        );
        this.lastHealedTarget = null;
        this.lastTurnOfHealUse = -1;
    }

    curar(targetPlayer) {
        targetPlayer.setProtected(true);
        this.lastHealedTarget = targetPlayer;
        this.lastTurnOfHealUse = this.currentGame.getCurrentTurn();
    }

    skillHasInvalidTargetOn(targetPlayer, chosenSkill) {
        const usingOnSameTarget = this.lastHealedTarget === targetPlayer;
        const healWasUsedLastTurn = this.lastTurnOfHealUse === this.currentGame.getCurrentTurn() -1;
        return (
            usingOnSameTarget &&
            healWasUsedLastTurn &&
            chosenSkill === 1       //somente para a habilidade curar
        );
    }

    reanimar(targetPlayer) {
        targetPlayer.setMarkedForRess(true);
        this.disableSkill(2, 1000);
    }

}

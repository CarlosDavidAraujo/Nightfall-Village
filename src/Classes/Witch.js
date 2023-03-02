import Role from "./Role";
import witchImg from "../../assets/images/witch.png";
import firstSkillIcon from "../../assets/images/darkPotion.png";
import secondSkillIcon from "../../assets/images/crystalBall.png";

export default class Witch extends Role {
    constructor(currentGame) {
        super(
            currentGame,
            "Bruxa",
            "Lobisomens",
            "Human",
            false,
            witchImg,
            "descobrir quem são os videntes e evitar que os lobisomens morram.",
            {
                name: "Maldição",
                description:
                    "Você bloqueia uma habilidade aleatória de um jogador por 1 turno. Não pode selecionar o mesmo alvo em turnos seguidos.",
                isTargetType: true,
                icon: firstSkillIcon,
            },
            {
                name: "Premonição",
                description:
                    "Selecione um jogador para ver se ele é lobisomem ou vidente",
                isTargetType: true,
                icon: secondSkillIcon,
            }
        );
        this.lastCursedTarget = null;
        this.lastTurnOfCurseUse = -1;
    }

    amaldicoar(targetPlayer) {
        const targetPlayerRole = targetPlayer.getRole();
        const randomSkill = Math.floor(Math.random() * 2) + 1;
        targetPlayerRole.disableSkill(randomSkill, 1);
        this.lastCursedTarget = targetPlayer;
        this.lastTurnOfCurseUse = this.currentGame.getCurrentTurn();
    }

    prever(targetPlayer) {
        const isSeer = targetPlayer.getRoleName() === "Vidente";
        const isWerewolf = targetPlayer.isWolf();
        if (isSeer) {
            return `A visão é clara! ${targetPlayer.getName()} é um vidente.`;
        }
        if (isWerewolf) {
            return `A visão é clara! ${targetPlayer.getName()} é um ${targetPlayer.getRoleName()}.`;
        }
        if (!isWerewolf && !isSeer) {
            return `${targetPlayer.getName()} não é vidente nem lobisomem.`;
        }
    }

    hasInvalidTargetOn(targetPlayer, chosenSkill) {
        const usingOnSameTarget = this.lastCursedTarget === targetPlayer;
        const curseWasUsedLastTurn = this.lastTurnOfCurseUse === this.currentGame.getCurrentTurn() - 1;
        return (
            usingOnSameTarget &&
            curseWasUsedLastTurn &&
            chosenSkill === 1       //somente para a habilidade amaldiçoar
        );
    }
}

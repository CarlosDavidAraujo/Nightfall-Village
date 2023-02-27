import Role from "./Role";
import witchImg from "../../assets/images/witch.png";
import firstSkillIcon from "../../assets/images/darkPotion.png";
import secondSkillIcon from "../../assets/images/crystalBall.png";

export default class Witch extends Role {
  constructor() {
    super(
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
        target: true,
        icon: firstSkillIcon,
      },
      {
        name: "Premonição",
        description:
          "Selecione um jogador para ver se ele é lobisomem ou vidente",
        target: true,
        icon: secondSkillIcon,
      }
    );
    this.lastCursedPlayer = null;
    this.lastCursedTurn = -1; //inicia em -1 para permitir o uso no primeiro turno
  }

  amaldicoar(otherPlayer, currentTurn) {
    const otherPlayerRole = otherPlayer.getRole();
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    otherPlayerRole.blockSkill(randomNumber, 1, currentTurn); //bloqueia uma skill aleatoria por 1 turno
    this.lastCursedPlayer = otherPlayer;
    this.lastCursedTurn = currentTurn;
    this.lastAction = "curse";
  }

  prever(otherPlayer) {
    const vidente = otherPlayer.getRoleName() === "Vidente";
    const lobisomem = otherPlayer.belongsToWerewolfsTeam();
    this.lastAction = "prev";
    if (vidente) {
      return `A visão é clara!  ${otherPlayer.getName()} é um vidente.`;
    }
    if (lobisomem) {
      return `A visão é clara!  ${otherPlayer.getName()} é um ${otherPlayer.getRoleName()}.`;
    }
    if (!lobisomem && !vidente) {
      return `${otherPlayer.getName()} não é vidente nem lobisomem.`;
    }
  }

  //se o ultimo jogador amaldiçoado for o jogador alvo e o ultimo turno em que a habilidade foi usada foi o turno anterior o alvo sera invalido
  //isso impede da habilidade amaldiçoar ser usada no mesmo alvo 2 turnos seguidos
  hasInvalidTargetOn(otherPlayer, currentTurn, chosenSkill) {
    return (
      this.lastCursedPlayer === otherPlayer &&
      this.lastCursedTurn === currentTurn - 1 &&
      chosenSkill === 1
    );
  }
}

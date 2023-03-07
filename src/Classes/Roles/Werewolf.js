import Role from "./Role";
import werewolfImg from "../../../assets/images/werewolf.png";
import firstSkillIcon from "../../../assets/images/bite.png";
import secondtSkillIcon from "../../../assets/images/transmute.png";
import loneWolfImg from "../../../assets/images/loneWolf.png";

export class WereWolf extends Role {
  constructor() {
    super(
      "Lobisomem", //nome
      "Lobisomens", //time
      "Wolf",
      false,
      werewolfImg, //imagem
      "Seu objetivo é eliminar todos os aldeões. Haja como se fosse um aldeão.",
      {
        1: {
          name: "Devorar",
          description:
            "Você e outros lobisomens votam em um jogador para elimina-lo do jogo. Em caso de empate, a vítima é aleatória.",
          isTargetType: true,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: firstSkillIcon,
        },
        2: {
          name: "Transmutar",
          description:
            "Os outros aldeões te verão como aldeão neste e no próximo turno. Bloqueia devorar enquanto transmutado.",
          isTargetType: false,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: secondtSkillIcon,
        },
      }
    );
  }

  devorar(targetPlayer) {
    this.player.voteOn(targetPlayer);
  }

  transmutar() {
    this.setFakeName("Aldeão", 1);
    this.disableSkill(1, 1);
  }

  skillHasInvalidTargetOn(targetPlayer) {
    return targetPlayer.isWolf();
  }
}

export class LonelyWerewolf extends WereWolf {
  constructor() {
    super();
    this.name = "Lobisomem Solitário";
    this.objective =
      "eliminar todos os aldeões, mas você só vencerá se for o último lobisomem vivo.";
    this.roleImg = loneWolfImg;
  }

  isLastWolfStanding(werewolfPlayers) {
    const aliveWerewolfPlayers = werewolfPlayers.filter(
      (p) => p.isAlive() && p.getRole().getName() === "Lobisomem"
    );
    return (
      aliveWerewolfPlayers.length === 1 &&
      aliveWerewolfPlayers[0] === this.player
    );
  }
}

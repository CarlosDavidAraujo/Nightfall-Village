import Role from "./Role";
import crusaderImg from "../../../assets/images/crusader.png";
import firstSkillIcon from "../../../assets/images/shield.png";
import secondSkillIcon from "../../../assets/images/balance.png";

export default class Crusader extends Role {
  constructor() {
    super(
      "Cruzado",
      "Aldeões",
      "Human",
      false,
      crusaderImg,
      "Seu objeitvo é proteger os aldeões e descobrir os lobisomens.",
      {
        1: {
          name: "Sacrifício",
          description:
            "Escolha um jogador. Se ele morreria esta noite você morre no lugar dele.",
          isTargetType: true,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: firstSkillIcon,
        },
        2: {
          name: "Julgamento",
          description:
            "Escolha um jogador. Se for um lobisomem, ele será exposto e julgamento é bloqueado permanentemente, se for um aldeão, julgamento e seus votos são bloqueados por 2 rodadas.",
          isTargetType: true,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: secondSkillIcon,
        },
      }
    );
  }

  sacrificar(targetPlayer) {
    //targetPlayer.setProtectedTurnsDuration(1);
    targetPlayer.setProtector(this.player);
  }

  julgar(targetPlayer) {
    const targetPlayerTeam = targetPlayer.getRole().getTeam();
    if (targetPlayerTeam === "Lobisomens") {
      const news = this.currentGame.getNews();
      news.addNews(`${targetPlayer.getName()} é um lobisomem entre nós!`);
      this.disableSkill(2, 1000);
    } else {
      this.disableSkill(2, 2);
      this.player.setDisabledVoteDuration(2);
    }
  }
}

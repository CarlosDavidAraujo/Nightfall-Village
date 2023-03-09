import Role from "./Role";
import gunslingerImg from "../../../assets/images/gunslinger.png";
import firstSkillIcon from "../../../assets/images/revolver.png";
import secondSkillIcon from "../../../assets/images/bang.png";

export default class Gunslinger extends Role {
  constructor() {
    super(
      "Pistoleiro",
      "Aldeões",
      "Human",
      false,
      gunslingerImg,
      "Seu objetivo é eliminar os lobisomens e ajudar os aldeões a vencerem o jogo.",
      {
        1: {
          name: "Tome Bala!",
          description: "Duas vezes por jogo escolha alguém para eliminar.",
          isTargetType: true,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: firstSkillIcon,
        },
        2: {
          name: "BANG",
          description:
            "Passivo: seus tiros sâo muito barulhentos e sua função será revelada após o primeiro disparo.",
          isTargetType: false,
          enableTurn: 1000,
          turnItWasDisabled: -1,
          icon: secondSkillIcon,
        },
      }
    );
    this.charges = 2;
  }

  atirar(targetPlayer) {
    targetPlayer.dieAfterManyTurns(1);
    if (this.charges === 2) {
      this.currentGame.news.addNews(`${this.player.name} é um pistoleiro.`);
    }
    this.charges--;
    if (this.charges === 0) {
      this.disableSkill(1, 1000);
    }
  }
}

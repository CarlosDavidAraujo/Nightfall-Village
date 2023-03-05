import Role from "./Role";
import villagerImg from "../../../assets/images/villager.png";
import oldManImg from "../../../assets/images/oldMan.png";
import firstSkillIcon from "../../../assets/images/keyhole.png";
import secondSkillIcon from "../../../assets/images/pray.png";

export class Villager extends Role {
  constructor() {
    super(
      "Aldeão",
      "Aldeões",
      "Human",
      false,
      villagerImg,
      "Seu objetivo é descobrir quem são os lobisomens e tentar proteger seus aliados.",
      {
        name: "Espiar",
        description:
          "Você tem 5% de chance de descobrir um lobisomem. Se conseguir, há 15% de chance dele te matar.",
        isTargetType: false,
        icon: firstSkillIcon,
      },
      {
        name: "Rezar",
        description:
          "Escolha outro jogador. Ele tem 5% de chance de ser protegido.",
        isTargetType: true,
        icon: secondSkillIcon,
      }
    );
  }

  espiar() {
    const alivePlayers = this.currentGame.getAlivePlayers();
    const deathChance = 0.15;
    const discoverWerewolfChance = 0.05;
    const randomNumber = Math.random();
    let alert = "";
    let discoveredWereWolf = alivePlayers.find(
      (player) => player.getRole().getFakeName() === "Lobisomem"
    );
    if (randomNumber <= discoverWerewolfChance) {
      const deathNumber = Math.random();
      if (deathNumber <= deathChance) {
        this.player.setMarkedForDeath(true);
      } else if (discoveredWereWolf) {
        alert = `${discoveredWereWolf.getName()} é um lobisomem entre nós!`;
      }
    }
    return alert;
  }

  orar(targetPlayer) {
    const protectingChance = 0.05;
    const randomNumber = Math.random();
    if (randomNumber <= protectingChance) {
      targetPlayer.setProtected(true);
    }
  }
}

export class OldMan extends Villager {
  constructor() {
    super();
    this.name = 'Velho Caduco';
    this.objective = "Você é um aldeão comum, mas sempre que usar uma habilidade ela será bloqueada pro 2 turnos.";
    this.roleImg = oldManImg;
  }

  espiar() {
    super.espiar();
    this.disableSkill(1, 2);
  }

  orar(targetPlayer) {
    super.orar(targetPlayer);
    this.disableSkill(2, 2);
  }
}

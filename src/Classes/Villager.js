import Role from "./Role";
import villagerImg from '../../assets/images/villager.png';
import firstSkillIcon from '../../assets/images/keyhole.png';
import secondSkillIcon from '../../assets/images/pray.png';

export default class Villager extends Role {
  constructor() {
    super(
      "Aldeão",
      "Aldeões",
      'Human',
      false,
      villagerImg,
      'descobrir quem são os lobisomens e tentar proteger seus aliados.',
      {
        name: 'Espiar',
        description: 'Você tem 5% de chance de descobrir um lobisomem. Se conseguir, há 15% de chance dele te matar.',
        target: false,
        icon: firstSkillIcon
      },
      {
        name: 'Rezar',
        description: 'Escolha outro jogador. Ele tem 5% de chance de ser protegido.',
        target: true,
        icon: secondSkillIcon
      }
    );
  }

  espiar(playerList) {
    const deathChance = 0.15;
    const discoverChance = 0.05;
    const randomNumber = Math.random();
    let message = "";
    let discoveredWereWolf;

    if (randomNumber <= discoverChance) {
      const deathNumber = Math.random();

      if (deathNumber <= deathChance) {
        this.player.setMarkedForDeath(true);
      } else {
        discoveredWereWolf = playerList.find(
          (player) => player.getRole().getFakeName() === "Lobisomem"
        );
        message = `${discoveredWereWolf.getName()} é um lobisomem entre nós!`;
      }
    }

    return message;
  }

  orar(otherPlayer) {
    const chance = Math.random();
    if (chance <= 0.05) {
      otherPlayer.setProtected(true);
    }
  }
}

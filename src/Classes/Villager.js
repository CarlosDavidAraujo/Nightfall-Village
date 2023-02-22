import Role from "./Role";
import villagerImg from '../../assets/images/villager.png';
import firstSkillIcon from '../../assets/images/keyhole.png';
import secondSkillIcon from '../../assets/images/pray.png';

export default class Villager extends Role {
  constructor() {
    super(
      "Aldeão", 
      "Aldeões", 
      villagerImg,
      'descobrir quem são os lobisomens e tentar proteger seus aliados',
      'Espiar',
      'Você tem 10% de chance de descobrir um lobisomem. Se conseguir, há 15% de chance dele te matar.',
      firstSkillIcon,
      false,
      'Rezar',
      'Escolha outro jogador. Ele tem 10% de chance de ser protegido.',
      secondSkillIcon
      );
  }

  espiar(playerList, game) {
    const deathChance = 0.1;
    const discoverChance = 0.15;
    const randomNumber = Math.random();
    let message = "";
    let discoveredWereWolf;

    if (randomNumber <= discoverChance) {
      const deathNumber = Math.random();

      if (deathNumber <= deathChance) {
        game.addPlayerToRemove(game.getCurrentPlayer());
      } else {
        discoveredWereWolf = playerList.find(
          (player) => player.getRoleName() === "Lobisomem"
        );
        message = `${discoveredWereWolf.getName()} é um lobisomem entre nós!`;
      }
    }

    return message;
  }

  orar(otherPlayer) {
    const chance = Math.random();
    if (chance <= 0.1) {
      otherPlayer.setProtected(true);
    }
  }
}

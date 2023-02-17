import Role from "./Role";

export default class Villager extends Role {
  constructor() {
    super("Aldeão", "Villagers");
  }

  bisbilhotar(playerList, game) {
    const deathChance = 0.5;
    const discoverChance = 0.1;
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

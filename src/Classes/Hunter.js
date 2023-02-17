import Role from "./Role";

export default class Hunter extends Role {
  constructor() {
    super("Caçador", "Villagers");
  }

  atirar(otherPlayer, game) {
    game.addPlayerToRemove(otherPlayer);
  }
}

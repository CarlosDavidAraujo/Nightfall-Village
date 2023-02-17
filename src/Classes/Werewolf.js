import Role from "./Role";

export default class WereWolf extends Role {
  constructor() {
    super("Lobisomem", "WereWolfs");
  }

  devorar(otherPlayer, game) {
    game.addPlayerToRemove(otherPlayer);
  }
}

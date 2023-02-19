import Role from "./Role";

export default class Seer extends Role {
  constructor() {
    super("Vidente", "Villagers");
  }

  revelar(otherPlayer) {
    return `A verdade foi revelada! O papel de ${otherPlayer.getName()} é ${otherPlayer.getRoleName()}. Fique atento à sua jogada!`;
  }
}

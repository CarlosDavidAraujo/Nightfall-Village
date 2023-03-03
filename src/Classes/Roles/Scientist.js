import Role from "./Role";
import scientistImg from "../../../assets/images/scientist.png";
import firstSkillIcon from "../../../assets/images/tube.png";
import secondSkillIcon from "../../../assets/images/potion.png";
import { WereWolf } from "./Werewolf";
import Villager from "./Villager";

export default class Scientist extends Role {
  constructor() {
    super(
      "Cientista Maluco",
      "Aldeões",
      "Human",
      false,
      scientistImg,
      "ajudar a eliminar os lobisomens, mas tudo que você faz é imprevisível.",
      {
        name: "Experimento",
        description:
          "Uma vez por jogo escolha um jogador. Se for um lobisomem, transforme-o em aldeão. Se for aldeão transforme-o em lobisomem.",
        isTargetType: true,
        icon: firstSkillIcon,
      },
      {
        name: "Alquimia",
        description:
          'Crie 1 de 3 poções aleatórias (pavor, confusão ou manipulação), sem repetir a mesma poção a cada turno. Bloqueia "Alquimia" após 3 usos.',
        isTargetType: true,
        icon: secondSkillIcon,
      }
    );
    this.potionsEffects = {
      pavor: (targetPlayer) => targetPlayer.disableVote(1),
      confusão: (targetPlayer) => targetPlayer.setConfused(true),
      manipulação: (targetPlayer) => targetPlayer.setDuplicatedVote(true),
    };
  }

  experimentar(targetPlayer) {
    if (targetPlayer.belongsToVillagersTeam()) {
      const werewolf = new WereWolf();
      targetPlayer.setRole(werewolf);
      werewolf.setPlayer(targetPlayer);
    } else if (targetPlayer.isWolf()) {
      const villager = new Villager();
      targetPlayer.setRole(villager);
      villager.setPlayer(targetPlayer);
    }
    this.disableSkill(1, 1000);
  }

  usarPocao(targetPlayer, potion) {
    const usePotionEffectOn = this.potionsEffects[potion];
    usePotionEffectOn(targetPlayer);
    delete this.potionsEffects[potion];
    if (!this.hasPotions()) {
      return this.disableSkill(2, 1000);
    }
  }

  gerarPocao() {
    const potions = Object.keys(this.potionsEffects);
    const randomIndex = Math.floor(Math.random() * potions.length);
    const potion = potions[randomIndex];
    return potion;
  }

  hasPotions() {
    return Object.keys(this.potionsEffects).length > 0;
  }
}

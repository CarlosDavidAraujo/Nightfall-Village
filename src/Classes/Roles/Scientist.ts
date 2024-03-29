import Role from "./Role";
import scientistImg from "../../../assets/images/scientist.png";
import firstSkillIcon from "../../../assets/images/tube.png";
import secondSkillIcon from "../../../assets/images/potion.png";
import { WereWolf } from "./Werewolf";
import {Villager} from "./Villager";
import Player from "../Player";

export default class Scientist extends Role {
  private potionsEffects: Record<string, (targetPlayer: Player) => void>;

  constructor() {
    super(
      "Cientista Maluco",
      "Aldeões",
      "Human",
      false,
      scientistImg,
      "Seu objetivo é ajudar a erradicar os lobisomens, mas tudo que você faz é imprevisível.",
      {
        1: {
          name: "Experimento",
          description:
            "Uma vez por jogo escolha um jogador. Se for um lobisomem, transforme-o em aldeão. Se for aldeão transforme-o em lobisomem.",
          isTargetType: true,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: firstSkillIcon,
        },
        2: {
          name: "Alquimia",
          description:
            'Crie 1 de 3 poções aleatórias (pavor, confusão ou manipulação), sem repetir a mesma poção a cada turno. Bloqueia "Alquimia" após 3 usos.',
          isTargetType: true,
          enableTurn: -1,
          turnItWasDisabled: -1,
          icon: secondSkillIcon,
        },
      }
    );
    this.potionsEffects = {
      pavor: (targetPlayer) => targetPlayer.setDisabledVoteDuration(1),
      confusão: (targetPlayer) => targetPlayer.setConfused(true),
      manipulação: (targetPlayer) => targetPlayer.setDuplicatedVote(true),
    };
  }

  public experimentar(targetPlayer: Player): void {
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

  public usarPocao(targetPlayer: Player, potion: string): void {
    const usePotionEffectOn = this.potionsEffects[potion];
    usePotionEffectOn(targetPlayer);
    delete this.potionsEffects[potion];
    if (!this.hasPotions()) {
      return this.disableSkill(2, 1000);
    }
  }

  public gerarPocao(): string {
    const potions = Object.keys(this.potionsEffects);
    const randomIndex = Math.floor(Math.random() * potions.length);
    const potion = potions[randomIndex];
    return potion;
  }

  private hasPotions(): boolean {
    return Object.keys(this.potionsEffects).length > 0;
  }
}

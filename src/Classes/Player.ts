import Undead from "./Roles/Undead";
import Game from "../Classes/Game";
import Role from "../Classes/Roles/Role";

export default class Player {
  private name: string;
  private ID: number;
  private role: Role | null;
  private currentGame: Game | null;
  private votesCount: number;
  private disabledVoteDuration: number;
  private duplicatedVote: boolean;
  private confused: boolean;
  private protectionDuration: number;
  private protector: Player | null;
  private protectionBarrier: boolean;
  private infected: boolean;
  private taunt: boolean;
  private deathTurn: number;
  private inevitableDeath: boolean;
  private resurrectTurn: number;

  constructor(name: string, ID: number, currentGame: Game) {
    this.name = name;
    this.ID = ID;
    this.role = null;
    this.currentGame = currentGame;
    this.votesCount = 0;
    this.disabledVoteDuration = -1;
    this.duplicatedVote = false;
    this.confused = false;
    this.protectionDuration = -1;
    this.protector = null;
    this.protectionBarrier = false;
    this.infected = false;
    this.taunt = false;
    this.deathTurn = -1;
    this.inevitableDeath = false;
    this.resurrectTurn = -1;
  }

  //------------GETTERS E SETTERS BÁSICOS----------//

  public getName(): string {
    return this.name;
  }

  public getID(): number {
    return this.ID;
  }

  public getRole(): Role | null {
    return this.role;
  }

  public setRole(role: Role): void {
    this.role = role;
  }

  public getRoleName(): string {
    return this.role!.getName();
  }

  public getVotesCount(): number {
    return this.votesCount;
  }

  public clearVotes(): void {
    this.votesCount = 0;
  }

  public setDuplicatedVote(value: boolean): void {
    this.duplicatedVote = value;
  }

  public hasDuplicatedVote(): boolean {
    return this.duplicatedVote === true;
  }

  public setConfused(value: boolean): void {
    this.confused = value;
  }

  public isConfused(): boolean {
    return this.confused === true;
  }

  public setInevitableDeath(value: boolean): void {
    this.inevitableDeath = value;
  }

  public hasInevitableDeath(): boolean {
    return this.inevitableDeath === true;
  }

  public setProtectedTurnsDuration(duration: number): void {
    if (this.hasInevitableDeath()) return;
    const currentTurn = this.currentGame!.getCurrentTurn();
    this.protectionDuration = duration * 2 + currentTurn;
  }

  public isProtected(): boolean {
    const currentTurn = this.currentGame!.getCurrentTurn();
    return this.protectionDuration >= currentTurn;
  }

  public getProtector(): Player {
    return this.protector!;
  }

  public setProtector(player: Player): void {
    this.protector = player;
  }

  public hasProtector(): boolean {
    return this.protector !== null;
  }

  public hasProtectionBarrier(): boolean {
    return this.protectionBarrier === true;
  }

  public setProtectionBarrier(value: boolean): void {
    this.protectionBarrier = value;
  }

  public setInfected(value: boolean): void {
    this.infected = value;
  }

  public isInfected(): boolean {
    return this.infected === true;
  }

  public setTaunt(value: boolean): void {
    this.taunt = value;
  }

  public hasTaunt(): boolean {
    return this.taunt === true;
  }

  public belongsToWerewolvesTeam(): boolean {
    return this.role!.getTeam() === "Lobisomens";
  }

  public belongsToVillagersTeam(): boolean {
    return this.role!.getTeam() === "Aldeões";
  }

  public belongsToUndeadsTeam(): boolean {
    return this.role!.getTeam() === "Undeads";
  }

  public isHuman(): boolean {
    return this.role!.getSpecies() === "Human";
  }

  public isWolf(): boolean {
    return this.role!.getSpecies() === "Wolf";
  }

  public isLonelyWolf(): boolean {
    return this.getRoleName() === "Lobisomem Solitário";
  }

  public isUndead(): boolean {
    return this.role!.getSpecies() === "Undead";
  }

  public isAssassin(): boolean {
    return this.getRoleName() === "Assassino em Série";
  }

  public resetAllStates(): void {
    this.votesCount = 0;
    this.duplicatedVote = false;
    this.confused = false;
    this.protector = null;
  }

  //----------MÉTODOS DE VOTOS------------//

  public voteOn(targetPlayer: Player): void {
    let player = targetPlayer;
    if (this.isConfused()) {
      player = this.currentGame!.getRandomPlayer();
    }
    if (this.hasDuplicatedVote()) {
      player.votesCount += 2;
      return;
    }
    player.votesCount += 1;
  }

  public setDisabledVoteDuration(duration: number): void {
    const currentTurn = this.currentGame!.getCurrentTurn();
    this.disabledVoteDuration = duration * 2 + currentTurn - 1;
  }

  public hasDisabledVote(): boolean {
    return this.disabledVoteDuration >= this.currentGame!.getCurrentTurn();
  }

  //-----------MÉTODOS DE REMOÇÃO-------------//

  public shouldDie(): boolean {
    const currentTurn = this.currentGame!.getCurrentTurn();
    return currentTurn === this.deathTurn && !this.isProtected();
  }

  public dieAfterManyTurns(turns: number): void {
    if (this.protectionBarrier) {
      this.protectionBarrier = false;
      return;
    }
    const currentTurn = this.currentGame!.getCurrentTurn();
    const currentDeathTurn = this.deathTurn;
    const newDeathTurn = turns * 2 + currentTurn - 1;
    this.deathTurn =
      newDeathTurn > currentDeathTurn ? newDeathTurn : currentDeathTurn;
  }

  public sendDeathMessage(): void {
    const news = this.currentGame!.getNews();
    news.addNews(
      `${this.name} morreu esta noite. Deve ficar calado até o fim do jogo.`
    );
  }

  public sendLynchingMessage(): void {
    const news = this.currentGame!.getNews();
    news.addNews(
      `A vila linchou ${this.name}. Deve ficar calado até o fim do jogo.`
    );
  }

  //----------MÉTODOS DE RESSURREIÇÃO------------//

  public resurrectAfterManyTurns(turns: number): void {
    const currentTurn = this.currentGame!.getCurrentTurn();
    this.resurrectTurn = turns * 2 + currentTurn - 1;
  }

  public sendResurrectMessage(): void {
    const news = this.currentGame!.getNews();
    news.addNews(`${this.name} foi ressuscitado.`);
  }

  public shouldResurrect(): boolean {
    const currentTurn = this.currentGame!.getCurrentTurn();
    return currentTurn === this.resurrectTurn;
  }

  //------------TRANSFORMAÇÃO DE ZUMBIS------------//

  public transformInUndead(): void {
    this.dieAfterManyTurns(2);
    this.disabledVoteDuration = 1000;
    this.infected = true;
    const undead = new Undead();
    undead.setCurrentGame(this.currentGame!);
    undead.setPlayer(this);
    this.setRole(undead);
  }
}

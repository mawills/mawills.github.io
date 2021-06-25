export default class Dom {
  canvas: HTMLCanvasElement;
  nextWaveButton: HTMLButtonElement;
  stats: HTMLDivElement;
  tower1Card: HTMLDivElement;
  tower2Card: HTMLDivElement;
  tower3Card: HTMLDivElement;
  tower4Card: HTMLDivElement;
  tower5Card: HTMLDivElement;
  towerStats: HTMLDivElement;

  constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
    if (!this.canvas) throw new Error("could not find canvas element");

    this.nextWaveButton = <HTMLButtonElement>(
      document.getElementById("next-wave")
    );
    if (!this.nextWaveButton)
      throw new Error("could not find next wave button");

    this.stats = <HTMLDivElement>document.getElementById("stats");
    if (!this.stats) throw new Error("could not find stats element");

    this.tower1Card = <HTMLDivElement>document.getElementById("tower1");
    if (!this.stats) throw new Error("could not find tower 1 card element");

    this.tower2Card = <HTMLDivElement>document.getElementById("tower2");
    if (!this.stats) throw new Error("could not find tower 2 card element");

    this.tower3Card = <HTMLDivElement>document.getElementById("tower3");
    if (!this.stats) throw new Error("could not find tower 3 card element");

    this.tower4Card = <HTMLDivElement>document.getElementById("tower4");
    if (!this.stats) throw new Error("could not find tower 4 card element");

    this.tower5Card = <HTMLDivElement>document.getElementById("tower5");
    if (!this.stats) throw new Error("could not find tower 5 card element");

    this.towerStats = <HTMLDivElement>document.getElementById("tower-stats");
    if (!this.stats) throw new Error("could not find tower stats element");
  }
}

export default class Dom {
  canvas: HTMLCanvasElement;
  nextWaveButton: HTMLButtonElement;
  stats: HTMLDivElement;

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
  }
}

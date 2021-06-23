import Alien from "./alien";

export default class Population {
  population: Alien[];
  maxHeight: number;
  maxWidth: number;
  minHeight: number;
  minWidth: number;

  constructor(n: number) {
    this.population = [];
    this.maxHeight = 100;
    this.minHeight = 50;
    this.maxWidth = 100;
    this.minWidth = 50;
    this.initializePopulation(n);
  }

  initializePopulation(n: number) {
    for (let i = 0; i < n; i++) {
      const width = Math.random() * (this.maxWidth - this.minWidth + 1);
      const height = Math.random() * (this.maxHeight - this.minHeight + 1);
      const veritcalPosition = Math.random() * (600 - height);
      this.population.push(new Alien(900, veritcalPosition, width, height));
    }
  }

  shufflePopulation() {
    // Fisher-Yates shuffle algorithm
    let count = this.population.length;
    let randomNumber = 0;
    let temp: Alien;
    while (count) {
      randomNumber = (Math.random() * count--) | 0;
      temp = this.population[count];
      this.population[count] = this.population[randomNumber];
      this.population[randomNumber] = temp;
    }
  }

  createAttackWave(n: number): Alien[] {
    this.shufflePopulation();
    let attackWave: Alien[] = [];
    for (let i = 0; i < n; i++) {
      let temp = this.population.pop();
      if (temp) {
        attackWave.push(temp);
      } else {
        break;
      }
    }

    return attackWave;
  }

  reproduce() {}
}

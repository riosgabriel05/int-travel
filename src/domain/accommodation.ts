class Accommodation {
  // TODO: implementar clase Accommodation con los campos name y cost
   #acName!: string;
  #cost!: number;

  constructor(
    acName: unknown,
    cost: unknown,
  ) {
    this.setName(acName);
    this.setCost(cost);
  }

  getCost(): number {
    return this.#cost;
  }

  setCost(cost: unknown): void {
    if (cost === null || cost === undefined) {
      throw new Error("Cost must be a number");
    }
    if (typeof cost !== "number") {
      throw new Error("Cost must be a number");
    }
    if (cost<0){
      throw new Error("El costo debe ser mayor a 0");
    }
    this.#cost = cost;
  }

  getName(): string {
    return this.#acName;
  }

  setName(acName: unknown): void {
    if (typeof acName !== "string" || acName.trim() === "") {
      throw new Error("El nombre del alojamiento debe ser una cadena no vacía");
    }
    this.#acName = acName.trim();
  }



}
export default Accommodation;

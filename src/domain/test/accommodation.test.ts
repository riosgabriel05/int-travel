import { describe, beforeEach, test, expect } from "vitest";
import Accommodation from "../accommodation.ts";

describe("Accommodation", () => {
  let accommodation: Accommodation;
  beforeEach(() => {
    accommodation = new Accommodation("Test AcName",2);
    void accommodation;
  });

  describe("Accommodation name", () => {
    test("should get the correct name", () => {
      expect(accommodation.getName()).toBe("Test AcName");
    });

  test("should throw error if aco name is empty", () => {
    // TODO: Implementar validación de nombre vacío en la clase City
    expect(() => accommodation.setName(123)).toThrow("El nombre del alojamiento debe ser una cadena no vacía");
  });
    // TODO: agregar más tests para el nombre
  test("should throw error if aco name is empty2", () => {
    // TODO: Implementar validación de nombre vacío en la clase City
    expect(() => accommodation.setName("")).toThrow("El nombre del alojamiento debe ser una cadena no vacía");
  });

  });

  describe("Accommodation cost", () => {
    test.todo("agregar tests para el costo");
    test("should get the correct cost", () => {
      expect(accommodation.getCost()).toBe(2);
    });
    test("should throw error if cost is empty1", () => {
    expect(() => accommodation.setCost(null)).toThrow("Cost must be a number");
  });
   test("should throw error if cost is empty2", () => {
    // TODO: Implementar validación de nombre vacío en la clase City
    expect(() => accommodation.setCost("a")).toThrow("Cost must be a number");
  });
   test("should throw error if cost is empty3", () => {
    // TODO: Implementar validación de nombre vacío en la clase City
    expect(() => accommodation.setCost(-3)).toThrow("El costo debe ser mayor a 0");
  });
    
  });
});

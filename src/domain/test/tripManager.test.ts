import { describe, beforeEach, test, expect } from "vitest";
import TripManager from "../tripManager.ts";
import Accommodation from "../accommodation.ts";
import City from "../city.ts";

describe("TripManager", () => {
  let manager: TripManager;
  beforeEach(() => {
    manager = new TripManager();
  });

  test("get cities", () => {
    expect(manager.getAllCities()).toEqual([]);
  });

  test("find city by name", () => {
    // TODO: Agregar test para la función findCityByName
  function createCity(): City {
  return new City(
    "TestCity",
    "TestCountry",
    new Date("2023-05-01"),
    new Date("2023-05-04"),
    "Notas",
    new Accommodation("Test AcName",4)
  );
}
const city = createCity();
manager.addCity(city);
expect(manager.getAllCities().length).toBe(1);
expect(manager.findCityByName("TestCity")).toEqual(city);
  });

  test("find city by name returns null if not found", () => {
    expect(manager.findCityByName("NonExistentCity")).toBeNull();
  });
});

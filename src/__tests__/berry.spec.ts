import { assertType, beforeAll, describe, expect, expectTypeOf, it } from "vitest";
import { BerryClient } from "../clients";
import { BERRIES, BERRY_FIRMNESSES, BERRY_FLAVORS } from "../constants";
import { Berry, BerryFirmness, BerryFlavor, NamedAPIResourceList } from "../models";

describe("Berry Client", () => {
  let client: BerryClient;

  beforeAll(() => {
    client = new BerryClient();
  });

  it("should be instantiated correctly", () => {
    expect(client).toBeDefined();
    assertType<BerryClient>(client);
  });

  // Berry Tests:

  it("should fetch a berry by name and return the correct data", async () => {
    const data = await client.getBerryByName("cheri");

    expectTypeOf(data).toEqualTypeOf<Berry>();
    expect(data.id).toBe(BERRIES.CHERI);
  });

  it("should fetch a berry by ID and return the correct data", async () => {
    const data = await client.getBerryById(BERRIES.CHERI);

    expectTypeOf(data).toEqualTypeOf<Berry>();
    expect(data.name).toBe("cheri");
  });

  it("should fetch a list of berries and return valid results", async () => {
    const data = await client.listBerries();

    expectTypeOf(data).toEqualTypeOf<NamedAPIResourceList>();
    expect(data.results.length).toBeGreaterThan(0);
    expect(data.results.length).toBeLessThanOrEqual(20);
  });

  // Berry Firmness Tests:

  it("should fetch a berry firmness by name and return the correct data", async () => {
    const data = await client.getBerryFirmnessByName("very-soft");

    expectTypeOf(data).toEqualTypeOf<BerryFirmness>();
    expect(data.name).toBe("very-soft");
  });

  it("should fetch a berry firmness by ID and return the correct data", async () => {
    const data = await client.getBerryFirmnessById(BERRY_FIRMNESSES.VERY_SOFT);

    expectTypeOf(data).toEqualTypeOf<BerryFirmness>();
    expect(data.name).toBe("very-soft");
  });

  it("should fetch a list of berry firmnesses and return valid results", async () => {
    const data = await client.listBerryFirmnesses();

    expectTypeOf(data).toEqualTypeOf<NamedAPIResourceList>();
    expect(data.results.length).toBeGreaterThan(0);
    expect(data.results.length).toBeLessThanOrEqual(20);
  });

  // Berry Flavor Tests:

  it("should fetch a berry flavor by name and return the correct data", async () => {
    const data = await client.getBerryFlavorByName("spicy");

    expectTypeOf(data).toEqualTypeOf<BerryFlavor>();
    expect(data.id).toBe(BERRY_FLAVORS.SPICY);
  });

  it("should fetch a berry flavor by ID and return the correct data", async () => {
    const data = await client.getBerryFlavorById(BERRY_FLAVORS.SPICY);

    expectTypeOf(data).toEqualTypeOf<BerryFlavor>();
    expect(data.name).toBe("spicy");
  });

  it("should fetch a list of berry flavors and return valid results", async () => {
    const data = await client.listBerryFlavors();

    expectTypeOf(data).toEqualTypeOf<NamedAPIResourceList>();
    expect(data.results.length).toBeGreaterThan(0);
    expect(data.results.length).toBeLessThanOrEqual(20);
  });

  // Berry - Edge Cases and Errors
  it("should handle fetching a non-existing berry by name with an error", async () => {
    await expect(client.getBerryByName("nonexistentberry")).rejects.toThrow();
  });

  it("should handle fetching a non-existing berry by negative ID with an error", async () => {
    await expect(client.getBerryById(-1)).rejects.toThrow();
  });

  // Berry Firmness - Edge Cases and Errors
  it("should handle fetching a non-existing berry firmness by name with an error", async () => {
    await expect(client.getBerryFirmnessByName("nonexistentfirmness")).rejects.toThrow();
  });

  it("should handle fetching a non-existing berry firmness by negative ID with an error", async () => {
    await expect(client.getBerryFirmnessById(-1)).rejects.toThrow();
  });

  // Berry Flavor - Edge Cases and Errors
  it("should handle fetching a non-existing berry flavor by name with an error", async () => {
    await expect(client.getBerryFlavorByName("nonexistentflavor")).rejects.toThrow();
  });

  it("should handle fetching a non-existing berry flavor by negative ID with an error", async () => {
    await expect(client.getBerryFlavorById(-1)).rejects.toThrow();
  });

  // Common Error Scenarios
  it("should handle API errors while fetching a berry with an error", async () => {
    await expect(client.getBerryByName("errorberry")).rejects.toThrow();
  });

  it("should handle API errors while fetching berry firmness with an error", async () => {
    await expect(client.getBerryFirmnessById(999)).rejects.toThrow();
  });

  it("should handle API errors while fetching berry flavors with an error", async () => {
    await expect(client.getBerryFlavorByName("errorflavor")).rejects.toThrow();
  });
});

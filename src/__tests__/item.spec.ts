import { beforeAll, describe, expect, expectTypeOf, it } from "vitest";
import { ItemClient } from "../clients";
import { ITEM_CATEGORIES, ITEM_FLING_EFFECTS, ITEM_POCKETS } from "../constants";
import {
  Item,
  ItemAttribute,
  ItemCategory,
  ItemFlingEffect,
  ItemPocket,
  NamedAPIResourceList,
} from "../models";

describe("Item Client", () => {
  let client: ItemClient;
  beforeAll(() => {
    client = new ItemClient();
  });

  // Item Client
  it("check if the item client was instantiated correctly", () => {
    expectTypeOf(client).toEqualTypeOf<ItemClient>();
  });

  // Item
  it("check if it returns an item passig a name", async () => {
    const data = await client.getItemByName("master-ball");

    expectTypeOf(data).toEqualTypeOf<Item>();
    expect(data.name).toBe("master-ball");
  });

  it("check if it returns an item passing an ID", async () => {
    const data = await client.getItemById(1);

    expectTypeOf(data).toEqualTypeOf<Item>();
    expect(data.name).toBe("master-ball");
  });

  it("check if it returns a list of Items", async () => {
    const data = await client.listItems();

    expectTypeOf(data).toEqualTypeOf<NamedAPIResourceList>();
    expect(data.results.length).toBeGreaterThan(0);
    expect(data.results.length).toBeLessThanOrEqual(20);
  });

  // Item Attribute
  it("check if it returns an item attribute passig a name", async () => {
    const data = await client.getItemAttributeByName("countable");

    expectTypeOf(data).toEqualTypeOf<ItemAttribute>();
    expect(data.name).toBe("countable");
  });

  it("check if it returns an item attribute passing an ID", async () => {
    const data = await client.getItemAttributeById(1);

    expectTypeOf(data).toEqualTypeOf<ItemAttribute>();
    expect(data.name).toBe("countable");
  });

  it("check if it returns a list of item attributes", async () => {
    const data = await client.listItemAttributes();

    expectTypeOf(data).toEqualTypeOf<NamedAPIResourceList>();
    expect(data.results.length).toBeGreaterThan(0);
    expect(data.results.length).toBeLessThanOrEqual(20);
  });

  // Item Category
  it("check if it returns an item category passig a name", async () => {
    const data = await client
      .getItemCategoryByName("choice")
      .then((response: ItemCategory) => response);

    expect(data.id).toBe(13);
  });

  it("check if it returns an item category passing an ID", async () => {
    const data = await client.getItemCategoryById(ITEM_CATEGORIES.CHOICE);

    expectTypeOf(data).toEqualTypeOf<ItemCategory>();
    expect(data.name).toBe("choice");
  });

  it("check if it returns a list of item categories", async () => {
    const data = await client.listItemCategories();

    expectTypeOf(data).toEqualTypeOf<NamedAPIResourceList>();
    expect(data.results.length).toBeGreaterThan(0);
    expect(data.results.length).toBeLessThanOrEqual(20);
  });

  // Item Fling Effects
  it("check if it returns an item fling effect passig a name", async () => {
    const data = await client.getItemFlingEffectByName("flinch");

    expectTypeOf(data).toEqualTypeOf<ItemFlingEffect>();
    expect(data.id).toBe(ITEM_FLING_EFFECTS.FLINCH);
  });

  it("check if it returns an item fling effect passing an ID", async () => {
    const data = await client.getItemFlingEffectById(ITEM_FLING_EFFECTS.FLINCH);

    expectTypeOf(data).toEqualTypeOf<ItemFlingEffect>();
    expect(data.name).toBe("flinch");
  });

  it("check if it returns a list of item fling effects", async () => {
    const data = await client.listItemFilingEffects();

    expectTypeOf(data).toEqualTypeOf<NamedAPIResourceList>();
    expect(data.results.length).toBeGreaterThan(0);
    expect(data.results.length).toBeLessThanOrEqual(20);
  });

  // Item Pocket
  it("check if it returns an item pocket passig a name", async () => {
    const data = await client.getItemPocketByName("battle");

    expectTypeOf(data).toEqualTypeOf<ItemPocket>();
    expect(data.id).toBe(ITEM_POCKETS.BATTLE);
  });

  it("check if it returns an item pocket passing an ID", async () => {
    const data = await client.getItemPocketById(ITEM_POCKETS.BATTLE);

    expectTypeOf(data).toEqualTypeOf<ItemPocket>();
    expect(data.name).toBe("battle");
  });

  it("check if it returns a list of item pockets", async () => {
    const data = await client.listItemPockets();

    expectTypeOf(data).toEqualTypeOf<NamedAPIResourceList>();
    expect(data.results.length).toBeGreaterThan(0);
    expect(data.results.length).toBeLessThanOrEqual(20);
  });
});

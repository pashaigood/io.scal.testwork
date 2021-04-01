import { order } from "./collection";

describe(__filename, () => {
  describe("order", () => {
    it("should sort collection", () => {
      const collection = [
        { name: "B", age: 21 },
        { name: "A", age: 22 },
      ];
      expect(order(collection, { name: "asc" }).map((c) => c.name)).toEqual([
        "A",
        "B",
      ]);

      expect(order(collection, { name: "desc" }).map((c) => c.name)).toEqual([
        "B",
        "A",
      ]);

      expect(order(collection, { age: "desc" }).map((c) => c.age)).toEqual([
        22,
        21,
      ]);
    });

    it("should not be case sensitive", () => {
      const collection = [{ name: "Bz" }, { name: "ba" }];
      expect(order(collection, { name: "asc" }).map((c) => c.name)).toEqual([
        "ba",
        "Bz",
      ]);
    });
  });
});

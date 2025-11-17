import { inputSchema } from "../schemas";

describe("schemas", () => {
  describe("inputSchema", () => {
    it("validates correct input", () => {
      const result = inputSchema.safeParse({
        message: "test message",
        minutes: "10",
        deleteNext: true,
      });

      expect(result.success).toBe(true);
    });

    it("coerces deleteNext to boolean", () => {
      const result = inputSchema.safeParse({
        message: "test",
        minutes: "5",
        deleteNext: false,
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.deleteNext).toBe(false);
      }
    });

    it("fails validation for missing fields", () => {
      const result = inputSchema.safeParse({});

      expect(result.success).toBe(false);
    });
  });
});

describe("cypher", () => {
  let encrypt: (text: string) => string;
  let decrypt: (text: string) => string;

  beforeEach(() => {
    jest.resetModules();
  });

  describe("encrypt", () => {
    it("should encrypt text when ENCRYPTION_KEY is 32+ characters", () => {
      process.env.ENCRYPTION_KEY = "a".repeat(32);
      const cypher = require("../cypher");
      encrypt = cypher.encrypt;
      const text = "test message";
      const encrypted = encrypt(text);

      expect(encrypted).toContain(":");
      expect(encrypted).not.toBe(text);
    });

    it("should return plain text when ENCRYPTION_KEY is less than 32 characters", () => {
      process.env.ENCRYPTION_KEY = "short";
      const cypher = require("../cypher");
      encrypt = cypher.encrypt;
      const text = "test message";
      const encrypted = encrypt(text);

      expect(encrypted).toBe(text);
    });

    it("should generate different encrypted values for same text", () => {
      process.env.ENCRYPTION_KEY = "a".repeat(32);
      const cypher = require("../cypher");
      encrypt = cypher.encrypt;
      const text = "test message";
      const encrypted1 = encrypt(text);
      const encrypted2 = encrypt(text);

      expect(encrypted1).not.toBe(encrypted2);
    });
  });

  describe("decrypt", () => {
    it("should decrypt encrypted text when ENCRYPTION_KEY is 32+ characters", () => {
      process.env.ENCRYPTION_KEY = "a".repeat(32);
      const cypher = require("../cypher");
      encrypt = cypher.encrypt;
      decrypt = cypher.decrypt;
      const text = "test message";
      const encrypted = encrypt(text);
      const decrypted = decrypt(encrypted);

      expect(decrypted).toBe(text);
    });

    it("should return plain text when ENCRYPTION_KEY is less than 32 characters", () => {
      process.env.ENCRYPTION_KEY = "short";
      const cypher = require("../cypher");
      decrypt = cypher.decrypt;
      const text = "test message";
      const decrypted = decrypt(text);

      expect(decrypted).toBe(text);
    });

    it("should throw error for invalid encrypted text format", () => {
      process.env.ENCRYPTION_KEY = "a".repeat(32);
      const cypher = require("../cypher");
      decrypt = cypher.decrypt;
      const invalidText = ":invalidformat";

      expect(() => decrypt(invalidText)).toThrow("Invalid encrypted text format");
    });

    it("should handle text with colons in encrypted content", () => {
      process.env.ENCRYPTION_KEY = "a".repeat(32);
      const cypher = require("../cypher");
      encrypt = cypher.encrypt;
      decrypt = cypher.decrypt;
      const text = "message:with:colons";
      const encrypted = encrypt(text);
      const decrypted = decrypt(encrypted);

      expect(decrypted).toBe(text);
    });
  });

  describe("encrypt/decrypt integration", () => {
    it("should handle empty string", () => {
      process.env.ENCRYPTION_KEY = "a".repeat(32);
      const cypher = require("../cypher");
      encrypt = cypher.encrypt;
      decrypt = cypher.decrypt;
      const text = "";
      const encrypted = encrypt(text);
      const decrypted = decrypt(encrypted);

      expect(decrypted).toBe(text);
    });

    it("should handle special characters", () => {
      process.env.ENCRYPTION_KEY = "a".repeat(32);
      const cypher = require("../cypher");
      encrypt = cypher.encrypt;
      decrypt = cypher.decrypt;
      const text = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`";
      const encrypted = encrypt(text);
      const decrypted = decrypt(encrypted);

      expect(decrypted).toBe(text);
    });

    it("should handle unicode characters", () => {
      process.env.ENCRYPTION_KEY = "a".repeat(32);
      const cypher = require("../cypher");
      encrypt = cypher.encrypt;
      decrypt = cypher.decrypt;
      const text = "Hello 世界 🌍";
      const encrypted = encrypt(text);
      const decrypted = decrypt(encrypted);

      expect(decrypted).toBe(text);
    });
  });
});

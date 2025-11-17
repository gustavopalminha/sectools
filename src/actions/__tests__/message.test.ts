import { createMessage, getMessage, tryGetMessage, deleteMessage, deleteOlderMessages } from "../message";
import { encrypt, decrypt } from "@/lib/cypher";
import prisma from "@/lib/db";
import { Message } from "../message.types";

jest.mock("@/lib/cypher");
jest.mock("@/lib/db", () => ({
  __esModule: true,
  default: {
    message: {
      create: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      deleteMany: jest.fn(),
    },
  },
}));
jest.mock("@/lib/logger", () => ({
  logger: {
    child: () => ({
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
    }),
  },
}));

global.setImmediate = jest.fn((cb) => cb()) as any;

const mockEncrypt = encrypt as jest.MockedFunction<typeof encrypt>;
const mockDecrypt = decrypt as jest.MockedFunction<typeof decrypt>;

describe("message actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createMessage", () => {
    it("should create message with valid data", async () => {
      const formData = new FormData();
      formData.append("message", "test message");
      formData.append("minutes", "10");
      formData.append("deleteNext", "false");

      mockEncrypt.mockReturnValue("encrypted");
      (prisma.message.create as jest.Mock).mockResolvedValue({
        id: "123",
        body: "encrypted",
        minutesToExpire: 10,
        nextVisit: false,
      });

      const result = await createMessage(null, formData);

      expect(result.status).toBe(true);
      expect(result.data.messageId).toBe("123");
      expect(result.errors).toBeNull();
      expect(mockEncrypt).toHaveBeenCalledWith("test message");
    });

    it("should return errors for invalid data", async () => {
      const formData = new FormData();

      const result = await createMessage(null, formData);

      expect(result.status).toBe(false);
      expect(result.errors).toBeTruthy();
    });
  });

  describe("getMessage", () => {
    it("should return message by id", async () => {
      const mockMessage: Message = {
        id: "123",
        createdAt: new Date(),
        body: "encrypted",
        minutesToExpire: 10,
        nextVisit: false,
      };

      (prisma.message.findUnique as jest.Mock).mockResolvedValue(mockMessage);

      const result = await getMessage("123");

      expect(result).toEqual(mockMessage);
      expect(prisma.message.findUnique).toHaveBeenCalledWith({ where: { id: "123" } });
    });

    it("should return null if message not found", async () => {
      (prisma.message.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await getMessage("999");

      expect(result).toBeNull();
    });
  });

  describe("tryGetMessage", () => {
    it("should return decrypted message if not expired", async () => {
      const mockMessage: Message = {
        id: "123",
        createdAt: new Date(),
        body: "encrypted",
        minutesToExpire: 10,
        nextVisit: false,
      };

      (prisma.message.findUnique as jest.Mock).mockResolvedValue(mockMessage);
      mockDecrypt.mockReturnValue("decrypted");

      const result = await tryGetMessage("123");

      expect(result?.body).toBe("decrypted");
      expect(mockDecrypt).toHaveBeenCalledWith("encrypted");
    });

    it("should return null if message not found", async () => {
      (prisma.message.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await tryGetMessage("999");

      expect(result).toBeNull();
    });

    it("should delete and return null if message expired", async () => {
      const pastDate = new Date(Date.now() - 20 * 60 * 1000);
      const mockMessage: Message = {
        id: "123",
        createdAt: pastDate,
        body: "encrypted",
        minutesToExpire: 10,
        nextVisit: false,
      };

      (prisma.message.findUnique as jest.Mock).mockResolvedValue(mockMessage);
      (prisma.message.delete as jest.Mock).mockResolvedValue(mockMessage);

      const result = await tryGetMessage("123");

      expect(result).toBeNull();
      expect(prisma.message.delete).toHaveBeenCalledWith({ where: { id: "123" } });
    });

    it("should delete if nextVisit is true", async () => {
      const mockMessage: Message = {
        id: "123",
        createdAt: new Date(),
        body: "encrypted",
        minutesToExpire: 10,
        nextVisit: true,
      };

      (prisma.message.findUnique as jest.Mock).mockResolvedValue(mockMessage);
      (prisma.message.delete as jest.Mock).mockResolvedValue(mockMessage);
      mockDecrypt.mockReturnValue("decrypted");

      const result = await tryGetMessage("123");

      expect(result?.body).toBe("decrypted");
      expect(prisma.message.delete).toHaveBeenCalledWith({ where: { id: "123" } });
    });
  });

  describe("deleteMessage", () => {
    it("should delete message by id", async () => {
      const mockMessage: Message = {
        id: "123",
        createdAt: new Date(),
        body: "encrypted",
        minutesToExpire: 10,
        nextVisit: false,
      };

      (prisma.message.delete as jest.Mock).mockResolvedValue(mockMessage);

      const result = await deleteMessage("123");

      expect(result).toEqual(mockMessage);
      expect(prisma.message.delete).toHaveBeenCalledWith({ where: { id: "123" } });
    });
  });

});

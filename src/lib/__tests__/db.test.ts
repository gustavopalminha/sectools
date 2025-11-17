import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  })),
}));

describe("db", () => {
  it("creates a PrismaClient instance", () => {
    const prisma = require("../db").default;
    
    expect(prisma).toBeDefined();
  });
});

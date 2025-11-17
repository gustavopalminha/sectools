import "@testing-library/jest-dom";
import RootLayout from "@/app/layout";

describe("Layout Component", () => {
  it("exports RootLayout function", () => {
    expect(RootLayout).toBeDefined();
    expect(typeof RootLayout).toBe("function");
  });

  it("has correct metadata", async () => {
    const { metadata } = await import("@/app/layout");
    expect(metadata).toBeDefined();
    expect(metadata.title).toBe("..: Sectools :..");
    expect(metadata.description).toBe("Share sensitive info tool");
  });
});

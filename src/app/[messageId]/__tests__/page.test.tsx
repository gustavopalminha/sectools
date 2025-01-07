import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "@/app/[messageId]/page";
import { getMessage } from "@/actions/message";

// Mock dependencies
jest.mock("@/actions/message");
jest.mock("@/components/editor", () => {
  const MockEditor = () => <div>Editor Component</div>;
  MockEditor.displayName = "MockEditor";
  return MockEditor;
});

jest.mock("@/app/[messageId]/not-found", () => {
  const MockNotFound = () => <div role="not-found">Not Found</div>;
  MockNotFound.displayName = "MockNotFound";
  return MockNotFound;
});

jest.mock("@/lib/logger", () => ({
  logger: {
    child: () => ({
      error: (message: string) => `
        ${message}`,
    }),
  },
}));

describe("Page Component", () => {
  it("renders Editor component when message is found", async () => {
    const promise = new Promise<{ messageId: string }>((res) => {
      res({ messageId: "message-fake-id" });
    });

    (getMessage as jest.Mock).mockResolvedValue({
      id: "message-fake-id",
      body: "Test message body",
    });

    render(
      await Page({
        params: promise,
      })
    );

    const editorElement = await screen.findByText("Editor Component");
    expect(editorElement).toBeInTheDocument();
  });

  it("renders NotFound component when message is not found", async () => {
    const promise = new Promise<{ messageId: string }>((res) => {
      res({ messageId: "message-fake-id" });
    });

    (getMessage as jest.Mock).mockResolvedValue(null);

    render(
      await Page({
        params: promise,
      })
    );

    const notFoundElement = await screen.findByRole("not-found");
    expect(notFoundElement).toBeInTheDocument();
  });
});

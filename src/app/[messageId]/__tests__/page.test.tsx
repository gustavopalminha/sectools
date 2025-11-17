import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "@/app/[messageId]/page";
import { tryGetMessage } from "@/actions/message";

jest.mock("@/actions/message");
jest.mock("@/app/[messageId]/not-found", () => {
  const MockNotFound = () => <div role="not-found">Not Found</div>;
  MockNotFound.displayName = "MockNotFound";
  return MockNotFound;
});

jest.mock("@/lib/logger", () => ({
  logger: {
    child: () => ({
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
    }),
  },
}));

describe("Page Component", () => {
  it("renders textarea with message when found", async () => {
    const promise = Promise.resolve({ messageId: "message-fake-id" });

    (tryGetMessage as jest.Mock).mockResolvedValue({
      id: "message-fake-id",
      body: "Test message body",
    });

    render(
      await Page({
        params: promise,
      })
    );

    const textarea = await screen.findByDisplayValue("Test message body");
    expect(textarea).toBeInTheDocument();
  });

  it("renders NotFound component when message is not found", async () => {
    const promise = Promise.resolve({ messageId: "message-fake-id" });

    (tryGetMessage as jest.Mock).mockResolvedValue(null);

    render(
      await Page({
        params: promise,
      })
    );

    const notFoundElement = await screen.findByRole("not-found");
    expect(notFoundElement).toBeInTheDocument();
  });
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Component from "@/app/page";

jest.mock("@/components/add-message", () => {
  const MockAddMessageComponent = ({
    children,
  }: {
    children: React.ReactNode;
  }) => <form>{children}</form>;
  MockAddMessageComponent.displayName = "MockAddMessageComponent";
  return MockAddMessageComponent;
});

jest.mock("@/components/message-input", () => {
  const MockMessageInput = () => <div data-testid="message-input">Message Input</div>;
  MockMessageInput.displayName = "MockMessageInput";
  return MockMessageInput;
});

jest.mock("@/components/delete-options", () => {
  const MockDeleteOptions = () => <div data-testid="delete-options">Delete Options</div>;
  MockDeleteOptions.displayName = "MockDeleteOptions";
  return MockDeleteOptions;
});

describe("Home Component", () => {
  it("renders message input component", () => {
    render(<Component />);
    expect(screen.getByTestId("message-input")).toBeInTheDocument();
  });

  it("renders delete options component", () => {
    render(<Component />);
    expect(screen.getByTestId("delete-options")).toBeInTheDocument();
  });

  it("renders create button", () => {
    render(<Component />);
    const button = screen.getByRole("button", { name: /create/i });
    expect(button).toBeInTheDocument();
  });
});

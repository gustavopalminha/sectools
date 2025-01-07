import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AddMessage from "@/components/add-message";

jest.mock("@/actions/message", () => ({
  createMessage: jest.fn(),
}));

jest.mock("@/components/submit", () => {
  const MockSubmitComponent = () => <div role="submit"></div>;
  MockSubmitComponent.displayName = "MockSubmitComponent";
  return MockSubmitComponent;
});

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormState: () => [
    {
      // Return a mock state object
      data: {
        messageId: null,
      },
    },
    // Mock setState function
    "FAKE ACTION",
  ],
}));

jest.mock("next/dynamic", () => {
  return jest.fn(() => <div role="dynamic"></div>);
});

jest.mock("@/lib/logger", () => ({
  logger: {
    child: () => ({
      info: jest.fn(),
    }),
  },
}));

describe("AddMessage Component", () => {
  it("renders the component", async () => {
    render(
      <AddMessage>
        <input />
      </AddMessage>
    );

    const formComponent = await screen.findByTestId("add-message");
    expect(formComponent).toBeInTheDocument();
  });

  it("renders the link viewer component if a message was created", async () => {
    render(
      <AddMessage>
        <input />
      </AddMessage>
    );

    const formComponent = await screen.findByTestId("add-message");

    expect(formComponent).toBeInTheDocument();
    expect(screen.queryByRole("dynamic")).not.toBeInTheDocument();
  });
});

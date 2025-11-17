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

const mockUseActionState = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useActionState: (...args: any[]) => mockUseActionState(...args),
}));

jest.mock("next/dynamic", () => {
  return jest.fn(() => {
    const MockComponent = () => <div role="dynamic"></div>;
    MockComponent.displayName = "MockDynamic";
    return MockComponent;
  });
});

jest.mock("@/lib/logger", () => ({
  logger: {
    child: () => ({
      info: jest.fn(),
    }),
  },
}));

describe("AddMessage Component", () => {
  beforeEach(() => {
    mockUseActionState.mockReturnValue([
      { data: { messageId: null } },
      "FAKE ACTION",
    ]);
  });

  it("renders the component with children when no message created", async () => {
    render(
      <AddMessage>
        <input data-testid="test-input" />
      </AddMessage>
    );

    const formComponent = await screen.findByTestId("add-message");
    expect(formComponent).toBeInTheDocument();
    expect(screen.getByTestId("test-input")).toBeInTheDocument();
  });

  it("renders link viewer when message is created", async () => {
    mockUseActionState.mockReturnValue([
      { data: { messageId: "test-id-123" } },
      "FAKE ACTION",
    ]);

    render(
      <AddMessage>
        <input />
      </AddMessage>
    );

    const formComponent = await screen.findByTestId("add-message");
    expect(formComponent).toBeInTheDocument();
    expect(screen.getByRole("dynamic")).toBeInTheDocument();
  });

  it("does not render children when message is created", async () => {
    mockUseActionState.mockReturnValue([
      { data: { messageId: "test-id-123" } },
      "FAKE ACTION",
    ]);

    render(
      <AddMessage>
        <input data-testid="test-input" />
      </AddMessage>
    );

    expect(screen.queryByTestId("test-input")).not.toBeInTheDocument();
  });
});

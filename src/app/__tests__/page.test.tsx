import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Component from "@/app/page";

jest.mock("@/components/delete", () => {
  const MockDeleteComponent = () => <div role="delete"></div>;
  MockDeleteComponent.displayName = "MockDeleteComponent";
  return MockDeleteComponent;
});
jest.mock("@/components/editor", () => {
  const MockEditorComponent = () => <div role="editor"></div>;
  MockEditorComponent.displayName = "MockEditorComponent";
  return MockEditorComponent;
});
jest.mock("@/components/add-message", () => {
  const MockAddMessageComponent = ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div role="add">{children}</div>;
  MockAddMessageComponent.displayName = "MockAddMessageComponent";
  return MockAddMessageComponent;
});

describe("Home Component", () => {
  it("renders the Add Message Form component", async () => {
    render(<Component />);
    const formComponent = await screen.findByRole("add");
    expect(formComponent).toBeInTheDocument();
  });

  it("renders the Message Editor component inside the Form", async () => {
    render(<Component />);
    const editorComponent = await screen.findByRole("editor");
    expect(editorComponent).toBeInTheDocument();
  });

  it("renders the Delete Options component inside the Form", async () => {
    render(<Component />);
    const optionsComponent = await screen.findByRole("delete");
    expect(optionsComponent).toBeInTheDocument();
  });
});

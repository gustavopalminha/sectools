import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Component from "@/app/layout";

jest.mock("@/components/Header", () => {
  const MockHeaderComponent = () => <div role="header"></div>;
  MockHeaderComponent.displayName = "MockHeaderComponent";
  return MockHeaderComponent;
});
jest.mock("@/components/Footer", () => {
  const MockFooterComponent = () => <div role="footer"></div>;
  MockFooterComponent.displayName = "MockFooterComponent";
  return MockFooterComponent;
});
jest.mock("@/components/body", () => {
  const MockBodyComponent = ({ children }: { children: React.ReactNode }) => (
    <main role="body">{children}</main>
  );
  MockBodyComponent.displayName = "MockBodyComponent";
  return MockBodyComponent;
});

describe("Home Component", () => {
  const ChildComponent = <div>CHILD</div>;

  it("renders the Body component", async () => {
    render(<Component>{ChildComponent}</Component>);

    const bodyComponent = await screen.findByRole("body");
    expect(bodyComponent).toBeInTheDocument();
  });
  it("renders the Header component", async () => {
    render(<Component>{null}</Component>);

    const headerComponent = await screen.findByRole("header");
    expect(headerComponent).toBeInTheDocument();
  });
  it("renders the Footer component", async () => {
    render(<Component>{null}</Component>);

    const footerComponent = await screen.findByRole("footer");
    expect(footerComponent).toBeInTheDocument();
  });
});

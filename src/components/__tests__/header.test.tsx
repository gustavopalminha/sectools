import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Header from "@/components/header";

describe("Header", () => {
  it("renders a header component", async () => {
    render(<Header />);

    const headerComponent = screen.findByTestId("header");

    waitFor(() => {
      expect(headerComponent).toBeInTheDocument();
    });
  });
});

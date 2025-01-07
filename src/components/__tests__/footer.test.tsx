import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Footer from "@/components/footer";

describe("Footer", () => {
  it("renders a footer component", async () => {
    render(<Footer />);

    const footerComponent = screen.findByTestId("footer");

    waitFor(() => {
      expect(footerComponent).toBeInTheDocument();
    });
  });
});

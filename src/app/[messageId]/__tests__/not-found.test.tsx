import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NotFound from "@/app/[messageId]/not-found";

describe("NotFound", () => {
  it("renders not found message", () => {
    render(<NotFound />);
    
    expect(screen.getByText("Message Not Found!")).toBeInTheDocument();
  });

  it("renders return home link", () => {
    render(<NotFound />);
    
    const link = screen.getByRole("link", { name: /return home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});

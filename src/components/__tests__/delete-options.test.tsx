import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DeleteOptions from "@/components/delete-options";

describe("DeleteOptions", () => {
  it("renders delete options heading", () => {
    render(<DeleteOptions />);
    expect(screen.getByText("Delete Options:")).toBeInTheDocument();
  });

  it("renders after first visit checkbox", () => {
    render(<DeleteOptions />);
    expect(screen.getByText("After first visit?")).toBeInTheDocument();
  });

  it("renders minutes to expire input", () => {
    render(<DeleteOptions />);
    const input = screen.getByDisplayValue("5");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "number");
    expect(input).toHaveAttribute("name", "minutes");
  });
});

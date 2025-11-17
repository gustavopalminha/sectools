import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MessageInput from "@/components/message-input";

describe("MessageInput", () => {
  it("renders textarea with placeholder", () => {
    render(<MessageInput />);
    const textarea = screen.getByPlaceholderText("Enter your secret message here...");
    expect(textarea).toBeInTheDocument();
  });

  it("renders textarea with correct name attribute", () => {
    render(<MessageInput />);
    const textarea = screen.getByPlaceholderText("Enter your secret message here...");
    expect(textarea).toHaveAttribute("name", "message");
  });
});

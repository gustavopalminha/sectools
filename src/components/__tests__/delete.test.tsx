import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Component from "@/components/delete";

describe("Expire Options", () => {
  it("renders a checkbox to enable next visit expire", () => {
    render(<Component />);

    const inputCheckbox = screen.getByRole("checkbox");

    expect(inputCheckbox).toBeInTheDocument();
  });

  it("renders a number input to define the amount of minutes this message is valid", () => {
    render(<Component />);

    const inputNumber = screen.getByRole("spinbutton");

    expect(inputNumber).toBeInTheDocument();
  });

  it("renders a number input where the user can pick 1 to 1440 minutes", () => {
    render(<Component />);

    const inputNumber = screen.getByRole("spinbutton") as HTMLInputElement;

    fireEvent.change(inputNumber, { target: { value: "1" } });

    expect(inputNumber.value).toBe("1");

    fireEvent.change(inputNumber, { target: { value: "1440" } });

    expect(inputNumber.value).toBe("1440");
  });
});

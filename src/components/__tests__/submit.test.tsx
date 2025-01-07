import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Component from "@/components/submit";
import * as ReactDOM from "react-dom";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: jest.fn(),
}));

describe("Submit", () => {
  it("renders button allowing to create a message", () => {
    const formStatus: ReactDOM.FormStatus = {
      pending: false,
      method: null,
      action: null,
      data: null,
    };

    jest.spyOn(ReactDOM, "useFormStatus").mockImplementation(() => formStatus);

    render(<Component />);

    const button = screen.getByRole("button") as HTMLButtonElement;

    expect(button).toBeInTheDocument();
    expect(button.innerHTML).toBe("Create");
  });

  it("renders button disabled with a message", () => {
    const formStatus: ReactDOM.FormStatus = {
      pending: true,
      method: "",
      action: "",
      data: new FormData(),
    };

    jest.spyOn(ReactDOM, "useFormStatus").mockImplementation(() => formStatus);

    render(<Component />);

    const button = screen.getByRole("button") as HTMLButtonElement;

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button.innerHTML).toBe("Saving...");
  });
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Component from "@/components/editor";

describe("Editor", () => {
  it("renders a textarea", () => {
    render(
      <Component
        params={{
          readOnly: false,
        }}
      />
    );

    const inputTextArea = screen.getByRole("textbox");

    expect(inputTextArea).toBeInTheDocument();
  });

  it("renders a textarea with initial state", () => {
    render(
      <Component
        params={{
          readOnly: false,
        }}
      />
    );

    const inputTextArea = screen.getByRole("textbox") as HTMLTextAreaElement;

    expect(inputTextArea.value).toBe("Your message goes here...");
  });

  it("renders a textarea with custom input depending on readonly", () => {
    const customText = "some message to be shown";

    render(
      <Component
        params={{
          readOnly: true,
          text: customText,
        }}
      />
    );

    const inputTextArea = screen.getByRole("textbox") as HTMLTextAreaElement;

    expect(inputTextArea.value).toBe(customText);
  });
});

import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Component from "@/components/link-viewer";

global.document.execCommand = jest.fn();

describe("Link Viewer", () => {
  it("renders nothing if messageId is null", async () => {
    render(
      <Component
        params={{
          messageId: "",
        }}
      />
    );

    await waitFor(() => {
      expect(screen.queryByText("Copy to clipboard")).not.toBeInTheDocument();
    });
  });

  it("renders an input with the link url and a button to clipboard copy", () => {
    const fakeId = "dadasdasd-asdasd-asffew";

    render(
      <Component
        params={{
          messageId: fakeId,
        }}
      />
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;

    expect(input).toBeInTheDocument();

    expect(input.value).toBe(`http://localhost/${fakeId}`);

    const button = screen.getByRole("button") as HTMLButtonElement;

    expect(button.innerHTML).toBe("Copy to clipboard");

    fireEvent(button, new MouseEvent("click", { bubbles: true }));

    expect(button.innerHTML).toBe("Copied!");
  });
});

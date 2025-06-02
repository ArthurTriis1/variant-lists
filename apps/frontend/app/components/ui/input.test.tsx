import { render, screen } from "@testing-library/react";
import { Input, InputLabel, InputError } from "./input";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { WarningCircle } from "@phosphor-icons/react";

describe("Input", () => {
  const defaultClasses = [
    "mb-[20px]",
    "w-full",
    "rounded-[16px]",
    "border-[4px]",
    "border-black",
    "bg-white",
    "px-[16px]",
    "py-[8px]",
    "font-londrina",
    "text-[20px]",
    "text-gray-500",
    "placeholder:text-gray-500",
    "focus:outline-none",
  ];

  it("renders with default props and classes", () => {
    render(<Input aria-label="Test Input" />);
    const inputElement = screen.getByLabelText(/test input/i);
    expect(inputElement).toBeInTheDocument();
    defaultClasses.forEach((cls) => expect(inputElement).toHaveClass(cls));
    expect(inputElement).toHaveClass("drop-shadow-custom");
    expect(inputElement).not.toHaveClass("drop-shadow-error");
  });

  it("renders with a placeholder", () => {
    render(
      <Input
        placeholder="Enter text here"
        aria-label="Input with placeholder"
      />
    );
    const inputElement = screen.getByPlaceholderText(/enter text here/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("allows text input and calls onChange", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} aria-label="Text Input Test" />);
    const inputElement = screen.getByLabelText(
      /text input test/i
    ) as HTMLInputElement;
    await user.type(inputElement, "Hello world");
    expect(inputElement.value).toBe("Hello world");
    expect(handleChange).toHaveBeenCalledTimes("Hello world".length);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Input disabled aria-label="Disabled Input" />);
    const inputElement = screen.getByLabelText(/disabled input/i);
    expect(inputElement).toBeDisabled();
  });

  it("renders with a specific type", () => {
    render(<Input type="password" aria-label="Password Input" />);
    const inputElement = screen.getByLabelText(/password input/i);
    expect(inputElement).toHaveAttribute("type", "password");
  });

  it("applies additional className and merges with default classes", () => {
    render(
      <Input className="my-custom-class" aria-label="Custom Class Input" />
    );
    const inputElement = screen.getByLabelText(/custom class input/i);
    expect(inputElement).toHaveClass("my-custom-class");
    defaultClasses.forEach((cls) => expect(inputElement).toHaveClass(cls));
  });

  it("renders with an icon", () => {
    render(
      <Input
        icon={<WarningCircle data-testid="input-icon" />}
        aria-label="Input with icon"
      />
    );
    const inputElement = screen.getByLabelText(/input with icon/i);
    expect(inputElement).toBeInTheDocument();
    const iconElement = screen.getByTestId("input-icon");
    expect(iconElement).toBeInTheDocument();
    // Check icon container classes
    expect(iconElement.parentElement).toHaveClass(
      "absolute right-[16px] top-1/2 -translate-y-[22px] text-gray-500"
    );
  });

  describe("when error prop is provided", () => {
    const errorMessage = "This is an error";
    it("applies error styles and displays the error message", () => {
      render(<Input error={errorMessage} aria-label="Input with error" />);
      const inputElement = screen.getByLabelText(/input with error/i);
      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toHaveClass("drop-shadow-error");
      expect(inputElement).not.toHaveClass("drop-shadow-custom");

      const errorSpan = screen.getByText(errorMessage);
      expect(errorSpan).toBeInTheDocument();
      expect(errorSpan).toHaveAttribute("title", errorMessage);
      expect(errorSpan).toHaveClass(
        "absolute bottom-0 left-0 w-[calc(100%-20px)] translate-x-[16px] cursor-default truncate whitespace-nowrap bg-black font-londrina text-[16px] text-white"
      );
    });
  });

  describe("when error prop is not provided", () => {
    it("does not apply error styles or display an error message", () => {
      render(<Input aria-label="Input without error" />);
      const inputElement = screen.getByLabelText(/input without error/i);
      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toHaveClass("drop-shadow-custom");
      expect(inputElement).not.toHaveClass("drop-shadow-error");
      // The error span is complex to query directly if empty, ensure no element with its specific classes exists
      // or query by a potential role if it had one. Here, we check it's not in document by text.
      expect(screen.queryByText("This is an error")).not.toBeInTheDocument();
    });
  });

  it("renders children when provided (e.g., a label)", () => {
    render(
      <Input aria-label="Input with children">
        <InputLabel htmlFor="test-input-children">Label as Child</InputLabel>
      </Input>
    );
    // The input itself is found by its aria-label
    const inputElement = screen.getByLabelText("Input with children");
    expect(inputElement).toBeInTheDocument();
    // The child label is also rendered
    expect(screen.getByText("Label as Child")).toBeInTheDocument();
  });
});

// Tests for InputLabel (can be in the same file or separate)
describe("InputLabel", () => {
  it("renders a label with default and custom classes", () => {
    render(
      <InputLabel htmlFor="test-id" className="custom-label">
        Test Label
      </InputLabel>
    );
    const labelElement = screen.getByText("Test Label");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement.tagName).toBe("LABEL");
    expect(labelElement).toHaveAttribute("for", "test-id");
    expect(labelElement).toHaveClass("font-londrina text-[20px] text-black");
    expect(labelElement).toHaveClass("custom-label");
  });
});

// Tests for InputError (can be in the same file or separate)
describe("InputError", () => {
  it("renders an error message with default and custom classes", () => {
    render(<InputError className="custom-error">Error content</InputError>);
    const errorElement = screen.getByText("Error content");
    expect(errorElement).toBeInTheDocument();
    expect(errorElement.tagName).toBe("P");
    expect(errorElement).toHaveClass(
      "mt-1 font-londrina text-[16px] text-red-500"
    );
    expect(errorElement).toHaveClass("custom-error");
  });

  it("does not render if no children are provided", () => {
    render(<InputError />);
    expect(screen.queryByText(/./)).not.toBeInTheDocument();
  });
});

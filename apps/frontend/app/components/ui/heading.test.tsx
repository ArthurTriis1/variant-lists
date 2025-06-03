import { render, screen } from "@testing-library/react";
import { Heading } from "./heading";
import { DatabaseIcon } from "@phosphor-icons/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Heading", () => {
  it("renders with default props (lg size, h2 level)", () => {
    render(<Heading>Test Heading</Heading>);
    const headingElement = screen.getByRole("heading", {
      name: /test heading/i,
      level: 2,
    });
    expect(headingElement).toBeInTheDocument();
    // Default size is 'lg'
    expect(headingElement).toHaveClass("px-[16px] py-[8px]");
    expect(headingElement).toHaveClass("text-[20px]");
  });

  it("renders with an icon", () => {
    render(
      <Heading icon={<DatabaseIcon data-testid="icon" />}>
        Heading with Icon
      </Heading>
    );
    const headingElement = screen.getByRole("heading", {
      name: /heading with icon/i,
    });
    expect(headingElement).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders with size 'sm'", () => {
    render(<Heading size="sm">Small Heading</Heading>);
    const headingElement = screen.getByRole("heading", {
      name: /small heading/i,
      level: 2,
    });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass("px-3 py-1.5");
  });

  it("renders with size 'default'", () => {
    render(<Heading size="default">Default Size Heading</Heading>);
    const headingElement = screen.getByRole("heading", {
      name: /default size heading/i,
      level: 2,
    });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass("px-4 py-2");
  });

  it("renders with size 'lg'", () => {
    render(<Heading size="lg">Large Heading</Heading>);
    const headingElement = screen.getByRole("heading", {
      name: /large heading/i,
      level: 2,
    });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass("px-[16px] py-[8px]");
  });

  it("renders as h1 when level is 1", () => {
    render(<Heading level={1}>H1 Heading</Heading>);
    const headingElement = screen.getByRole("heading", {
      name: /h1 heading/i,
      level: 1,
    });
    expect(headingElement).toBeInTheDocument();
  });

  it("renders as h3 when level is 3", () => {
    render(<Heading level={3}>H3 Heading</Heading>);
    const headingElement = screen.getByRole("heading", {
      name: /h3 heading/i,
      level: 3,
    });
    expect(headingElement).toBeInTheDocument();
  });

  it("applies additional className", () => {
    render(<Heading className="my-custom-class">Custom Class Heading</Heading>);
    const headingElement = screen.getByRole("heading", {
      name: /custom class heading/i,
    });
    expect(headingElement).toHaveClass("my-custom-class");
  });

  it("renders plus icon and calls onPlusClick when provided and clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Heading onPlusClick={handleClick}>Heading with Plus</Heading>);

    const headingElement = screen.getByRole("heading", {
      name: /heading with plus/i,
    });
    expect(headingElement).toBeInTheDocument();

    // The PlusIcon is inside a button, which is a child of the heading
    // We can find the button by its role within the heading element.
    // Or, more reliably, if the button had a specific aria-label or test-id.
    // For now, let's assume it's the only button.
    const plusButton = screen.getByRole("button");
    expect(plusButton).toBeInTheDocument();

    // Check for PlusIcon presence if needed, e.g., by checking its class or structure if it's identifiable
    // For example, if PlusIcon component adds a specific class or data-testid

    await user.click(plusButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not render plus icon if onPlusClick is not provided", () => {
    render(<Heading>Heading without Plus</Heading>);
    const headingElement = screen.getByRole("heading", {
      name: /heading without plus/i,
    });
    expect(headingElement).toBeInTheDocument();
    const plusButton = screen.queryByRole("button"); // queryByRole returns null if not found
    expect(plusButton).not.toBeInTheDocument();
  });

  it("forwards HTML attributes through props spreading", () => {
    render(
      <Heading
        data-testid="test-heading"
        aria-label="Test Label"
        title="Test Title"
      >
        Props Heading
      </Heading>
    );

    const headingElement = screen.getByTestId("test-heading");
    expect(headingElement).toHaveAttribute("aria-label", "Test Label");
    expect(headingElement).toHaveAttribute("title", "Test Title");
  });
});

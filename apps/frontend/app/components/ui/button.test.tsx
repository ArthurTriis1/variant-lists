import { render, screen } from "@testing-library/react";
import { Button } from "./button";
import { describe, it, expect } from "vitest";

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders with a different variant", () => {
    render(<Button>Delete</Button>);
    const buttonElement = screen.getByRole("button", { name: /delete/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders with a different size", () => {
    render(<Button size="lg">Large Button</Button>);
    const buttonElement = screen.getByRole("button", { name: /large button/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders as a child", () => {
    render(
      <Button asChild>
        <a href="/">Link Button</a>
      </Button>
    );
    const linkElement = screen.getByRole("link", { name: /link button/i });
    expect(linkElement).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByRole("button", {
      name: /disabled button/i,
    });
    expect(buttonElement).toBeDisabled();
  });
});

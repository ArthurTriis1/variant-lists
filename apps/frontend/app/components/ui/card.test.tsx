import { render, screen } from "@testing-library/react";
import { Card } from "./card";
import { describe, it, expect } from "vitest";

describe("Card", () => {
  const defaultClasses = [
    "drop-shadow-custom",
    "rounded-[16px]",
    "border-[4px]",
    "border-black",
    "bg-white",
  ];

  it("renders with default props and classes", () => {
    render(<Card data-testid="test-card">Card Content</Card>);
    const cardElement = screen.getByTestId("test-card");
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveTextContent("Card Content");
    defaultClasses.forEach((cls) => expect(cardElement).toHaveClass(cls));
  });

  it("renders children correctly", () => {
    render(
      <Card data-testid="test-card">
        <h2>Card Title</h2>
        <p>Card paragraph.</p>
      </Card>
    );
    const cardElement = screen.getByTestId("test-card");
    expect(cardElement).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Card Title" })
    ).toBeInTheDocument();
    expect(screen.getByText("Card paragraph.")).toBeInTheDocument();
  });

  it("applies additional className and merges with default classes", () => {
    render(
      <Card className="my-custom-card-class" data-testid="test-card">
        Custom Class Card
      </Card>
    );
    const cardElement = screen.getByTestId("test-card");
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveClass("my-custom-card-class");
    defaultClasses.forEach((cls) => expect(cardElement).toHaveClass(cls));
  });

  it("passes through other HTML attributes", () => {
    render(
      <Card
        id="myCardId"
        aria-label="A descriptive card"
        data-testid="test-card"
      >
        Attributes Card
      </Card>
    );
    const cardElement = screen.getByTestId("test-card");
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveAttribute("id", "myCardId");
    expect(cardElement).toHaveAttribute("aria-label", "A descriptive card");
  });
});

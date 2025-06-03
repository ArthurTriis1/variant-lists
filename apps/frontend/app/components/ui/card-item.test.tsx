import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CardItem } from "./card-item";
import { ListIcon } from "@phosphor-icons/react";

describe("CardItem", () => {
  const defaultProps = {
    title: "Movie",
    subtitle: "Favorite Movies",
    subtitleIcon: <ListIcon size={16} />,
    description: "This is a movie description",
    author: "@Barton",
  };

  it("renders with all props", () => {
    render(<CardItem {...defaultProps} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Movie"
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Favorite Movies"
    );
    expect(screen.getByText("This is a movie description")).toBeInTheDocument();
    expect(screen.getByText("@Barton")).toBeInTheDocument();
  });

  it("renders without optional props", () => {
    render(<CardItem title="Movie" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Movie"
    );
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
    expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/@/)).not.toBeInTheDocument();
  });

  it("displays warning message when provided", () => {
    const warning = "Out of date with schema";
    render(<CardItem {...defaultProps} warning={warning} />);

    expect(screen.getByText(warning)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<CardItem {...defaultProps} className="custom-class" />);

    const card = screen.getByRole("heading", { level: 1 }).closest("div");
    expect(card).toHaveClass("custom-class");
  });

  it("passes through other HTML attributes", () => {
    render(
      <CardItem
        {...defaultProps}
        data-testid="card-item"
        aria-label="Movie card"
      />
    );

    const card = screen.getByTestId("card-item");
    expect(card).toHaveAttribute("aria-label", "Movie card");
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Button } from "./button";
import { useState } from "react";

describe("Popover", () => {
  it("renders popover content when trigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Popover content</p>
        </PopoverContent>
      </Popover>
    );

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open Popover" }));

    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("closes popover when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <>
        <div data-testid="outside">Outside</div>
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Popover content</p>
          </PopoverContent>
        </Popover>
      </>
    );

    await user.click(screen.getByRole("button", { name: "Open Popover" }));
    expect(screen.getByText("Popover content")).toBeInTheDocument();

    await user.click(screen.getByTestId("outside"));
    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("handles controlled state", async () => {
    const user = userEvent.setup();
    function ControlledPopover() {
      const [open, setOpen] = useState(false);
      return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button>Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>Popover content</p>
          </PopoverContent>
        </Popover>
      );
    }

    render(<ControlledPopover />);

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open Popover" }));
    expect(screen.getByText("Popover content")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open Popover" }));
    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("applies custom classes to content", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="custom-class">
          <p>Popover content</p>
        </PopoverContent>
      </Popover>
    );

    await user.click(screen.getByRole("button", { name: "Open Popover" }));

    const content = screen.getByText("Popover content").parentElement;
    expect(content).toHaveClass("custom-class");
  });

  it("supports different alignments", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent align="end" side="right">
          <p>Popover content</p>
        </PopoverContent>
      </Popover>
    );

    await user.click(screen.getByRole("button", { name: "Open Popover" }));

    const content = screen.getByText("Popover content").parentElement;
    expect(content).toHaveAttribute("data-align", "end");
    expect(content).toHaveAttribute("data-side", "right");
  });
});

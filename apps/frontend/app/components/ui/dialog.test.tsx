import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";

describe("Dialog", () => {
  it("renders dialog when trigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Test Description</DialogDescription>
          </DialogHeader>
          <p>Dialog content</p>
        </DialogContent>
      </Dialog>
    );

    expect(screen.queryByText("Test Dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open Dialog" }));

    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Dialog content")).toBeInTheDocument();
  });

  it("closes dialog when close button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
          <p>Dialog content</p>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByRole("button", { name: "Open Dialog" }));
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByText("Test Dialog")).not.toBeInTheDocument();
  });

  it("closes dialog when clicking overlay", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByRole("button", { name: "Open Dialog" }));
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();

    // Click the backdrop/overlay
    const overlay = document.querySelector(
      '[data-slot="dialog-overlay"]'
    ) as HTMLElement;
    await user.click(overlay);

    expect(screen.queryByText("Test Dialog")).not.toBeInTheDocument();
  });

  it("maintains focus trap within dialog", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
          <Button>First Button</Button>
          <Button>Second Button</Button>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByRole("button", { name: "Open Dialog" }));

    const firstButton = screen.getByRole("button", { name: "First Button" });
    const secondButton = screen.getByRole("button", { name: "Second Button" });
    const closeButton = screen.getByRole("button", { name: "Close" });

    expect(document.activeElement).toBe(firstButton);

    await user.tab();
    expect(document.activeElement).toBe(secondButton);

    await user.tab();
    expect(document.activeElement).toBe(closeButton);

    await user.tab();
    expect(document.activeElement).toBe(firstButton);
  });
});

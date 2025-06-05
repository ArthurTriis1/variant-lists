import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Combobox } from "./combobox";

describe("Combobox", () => {
	const items = [
		{ value: "item1", label: "Item 1" },
		{ value: "item2", label: "Item 2" },
		{ value: "item3", label: "Item 3" },
	];

	it("renders with default props", () => {
		render(<Combobox items={items} label="Select Item" />);

		expect(screen.getByRole("combobox")).toHaveTextContent("Select Item");
	});

	it("opens popover when clicked", async () => {
		const user = userEvent.setup();
		render(<Combobox items={items} label="Select Item" />);

		const combobox = screen.getByRole("combobox");
		await user.click(combobox);

		// Check if items are rendered
		expect(screen.getByPlaceholderText("Select Item")).toBeInTheDocument();
		items.forEach((item) => {
			expect(screen.getByText(item.label)).toBeInTheDocument();
		});
	});

	it("filters items based on input", async () => {
		const user = userEvent.setup();
		render(<Combobox items={items} label="Select Item" />);

		const combobox = screen.getByRole("combobox");
		await user.click(combobox);

		const input = screen.getByPlaceholderText("Select Item");
		await user.type(input, "item1");

		expect(screen.getByText("Item 1")).toBeInTheDocument();
		expect(screen.queryByText("Item 2")).not.toBeInTheDocument();
	});

	it("selects item when clicked", async () => {
		const user = userEvent.setup();
		render(<Combobox items={items} label="Select Item" />);

		const combobox = screen.getByRole("combobox");
		await user.click(combobox);

		await user.click(screen.getByText("Item 1"));
		expect(combobox).toHaveTextContent("Item 1");
	});

	it("shows custom not found message", async () => {
		const user = userEvent.setup();
		render(
			<Combobox items={items} label="Select Item" notFoundMessage="Nothing here" />
		);

		const combobox = screen.getByRole("combobox");
		await user.click(combobox);

		const input = screen.getByPlaceholderText("Select Item");
		await user.type(input, "nonexistent");

		expect(screen.getByText("Nothing here")).toBeInTheDocument();
	});
});

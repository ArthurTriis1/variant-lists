import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandSeparator,
} from "./command";

describe("Command", () => {
	it("renders command with input and items", () => {
		render(
			<Command>
				<CommandInput placeholder="Search..." />
				<CommandList>
					<CommandEmpty>No results found</CommandEmpty>
					<CommandGroup>
						<CommandItem value="item1">Item 1</CommandItem>
						<CommandSeparator />
						<CommandItem value="item2">Item 2</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		);

		expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
		expect(screen.getByText("Item 1")).toBeInTheDocument();
		expect(screen.getByText("Item 2")).toBeInTheDocument();
	});

	it("filters items based on input", async () => {
		const user = userEvent.setup();
		render(
			<Command>
				<CommandInput placeholder="Search..." />
				<CommandList>
					<CommandEmpty>No results found</CommandEmpty>
					<CommandGroup>
						<CommandItem value="apple">Apple</CommandItem>
						<CommandItem value="banana">Banana</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		);

		const input = screen.getByPlaceholderText("Search...");
		await user.type(input, "app");

		expect(screen.getByText("Apple")).toBeInTheDocument();
		expect(screen.queryByText("Banana")).not.toBeInTheDocument();
	});

	it("shows empty message when no results found", async () => {
		const user = userEvent.setup();
		render(
			<Command>
				<CommandInput placeholder="Search..." />
				<CommandList>
					<CommandEmpty>No results found</CommandEmpty>
					<CommandGroup>
						<CommandItem value="item1">Item 1</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		);

		const input = screen.getByPlaceholderText("Search...");
		await user.type(input, "nonexistent");

		expect(screen.getByText("No results found")).toBeInTheDocument();
		expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
	});

	it("handles item selection", async () => {
		const handleSelect = vi.fn();
		const user = userEvent.setup();

		render(
			<Command>
				<CommandInput placeholder="Search..." />
				<CommandList>
					<CommandGroup>
						<CommandItem value="item1" onSelect={handleSelect}>
							Item 1
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		);

		await user.click(screen.getByText("Item 1"));
		expect(handleSelect).toHaveBeenCalledWith("item1");
	});
});

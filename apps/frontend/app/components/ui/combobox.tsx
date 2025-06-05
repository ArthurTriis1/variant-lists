"use client";

import * as React from "react";
import { ChevronsUpDownIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "~/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";

export type ComboboxProps = {
	items: { value: string; label: string }[];
	label: string;
	placeholder?: string;
	notFoundMessage?: string;
	onItemSelect?: (value: string) => void;
};

export function Combobox({
	items,
	label,
	placeholder = label,
	notFoundMessage = "Not found",
	onItemSelect,
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{value ? items.find((item) => item.value === value)?.label : label}
					<ChevronsUpDownIcon
						strokeWidth={4}
						className="ml-2 h-4 w-4 shrink-0 text-black"
					/>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder={placeholder} />
					<CommandList>
						<CommandEmpty>{notFoundMessage}</CommandEmpty>
						<CommandGroup>
							{items.map((item) => (
								<CommandItem
									key={item.value}
									value={item.value}
									onSelect={(currentValue) => {
										onItemSelect?.(currentValue);
										setValue(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
								>
									{item.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

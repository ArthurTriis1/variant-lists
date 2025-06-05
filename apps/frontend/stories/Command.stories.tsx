import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "~/components/ui/command";
import { Button } from "~/components/ui/button";
import { useState } from "react";

const meta = {
	title: "UI/Command",
	component: Command,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A command palette component with dialog and filtering capabilities. Perfect for building keyboard-first interfaces.",
			},
		},
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className="w-[400px] border-4 border-black rounded-2xl bg-white p-2">
			<Command>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>
							<span>Calendar</span>
							<CommandShortcut>⌘C</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<span>Search Schema</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<span>Create Schema</span>
							<CommandShortcut>⌘N</CommandShortcut>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						<CommandItem>
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<span>Settings</span>
							<CommandShortcut>⌘,</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</div>
	),
};

export const WithDialog: Story = {
	render: function RenderWithDialog() {
		const [open, setOpen] = useState(false);

		return (
			<>
				<Button onClick={() => setOpen(true)} className="font-londrina">
					Open Command Palette
				</Button>
				<CommandDialog open={open} onOpenChange={setOpen}>
					<CommandInput placeholder="Type a command or search..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup heading="Suggestions">
							<CommandItem>
								<span>Calendar</span>
								<CommandShortcut>⌘C</CommandShortcut>
							</CommandItem>
							<CommandItem>
								<span>Search Schema</span>
								<CommandShortcut>⌘S</CommandShortcut>
							</CommandItem>
							<CommandItem>
								<span>Create Schema</span>
								<CommandShortcut>⌘N</CommandShortcut>
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</CommandDialog>
			</>
		);
	},
};

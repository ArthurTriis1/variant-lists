import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "../app/components/ui/table";
import { TextAaIcon } from "@phosphor-icons/react";
import type { Meta } from "@storybook/react-vite";

const meta = {
	title: "UI/Table",
	component: Table,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;

export const Default = () => (
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead className="h-1" colSpan={2}>
					<h1>Label</h1>
				</TableHead>
				<TableHead className="h-1">
					<h1>Property</h1>
				</TableHead>
				<TableHead className="h-1">
					<h1>Type</h1>
				</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{[1, 2, 3].map((_, i) => (
				<TableRow key={i}>
					<TableCell className="pr-1">
						<TextAaIcon weight="regular" />
					</TableCell>
					<TableCell className="pl-0">
						<b>Title</b>
					</TableCell>
					<TableCell>Title</TableCell>
					<TableCell>Text</TableCell>
				</TableRow>
			))}
		</TableBody>
	</Table>
);

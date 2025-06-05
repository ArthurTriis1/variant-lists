import React from "react";
import { render, screen } from "@testing-library/react";
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "./table";
import { describe, expect, it } from "vitest";

describe("Table component", () => {
	it("renders table headers and rows", () => {
		render(
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Label</TableHead>
						<TableHead>Property</TableHead>
						<TableHead>Type</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Title</TableCell>
						<TableCell>title</TableCell>
						<TableCell>Text</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		);
		expect(screen.getByText("Label")).toBeInTheDocument();
		expect(screen.getByText("Property")).toBeInTheDocument();
		expect(screen.getByText("Type")).toBeInTheDocument();
		expect(screen.getByText("Title")).toBeInTheDocument();
		expect(screen.getByText("title")).toBeInTheDocument();
		expect(screen.getByText("Text")).toBeInTheDocument();
	});

	it("renders multiple rows", () => {
		render(
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Label</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Row 1</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Row 2</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		);
		expect(screen.getByText("Row 1")).toBeInTheDocument();
		expect(screen.getByText("Row 2")).toBeInTheDocument();
	});

	it("renders empty table without crashing", () => {
		render(<Table />);
	});
});

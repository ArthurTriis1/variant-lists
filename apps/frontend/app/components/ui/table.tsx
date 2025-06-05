import * as React from "react";
import { cn } from "~/lib/utils";

function Table({ className, ...props }: React.ComponentProps<"table">) {
	return (
		<div
			data-slot="table-container"
			className="relative w-full overflow-x-auto rounded-3xl border-4 border-black drop-shadow-custom"
			style={{ boxShadow: "0 2px 16px 0 rgba(0,0,0,0.08)" }}
		>
			<table
				data-slot="table"
				className={cn(
					"w-full min-w-full caption-bottom text-lg border-separate border-spacing-0 font-sans",
					className
				)}
				{...props}
			/>
		</div>
	);
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
	return (
		<thead data-slot="table-header" className={cn("", className)} {...props} />
	);
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
	return (
		<tbody data-slot="table-body" className={cn("", className)} {...props} />
	);
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn(
				"bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
				className
			)}
			{...props}
		/>
	);
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
	return (
		<tr
			data-slot="table-row"
			className={cn(
				"border-b-4 border-black last:border-b-0 transition-colors group",
				className
			)}
			{...props}
		/>
	);
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
	return (
		<th
			data-slot="table-head"
			className={cn(
				"px-6 py-2 text-left align-middle font-bold text-xl border-black border-b-4 first:rounded-tl-2xl last:rounded-tr-2xl bg-white font-sans",
				className
			)}
			{...props}
		/>
	);
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
	return (
		<td
			data-slot="table-cell"
			className={cn(
				"px-6 py-6 align-middle whitespace-nowrap bg-white font-sans text-xl border-b-4 group-last:border-b-0 border-black",
				className
			)}
			{...props}
		/>
	);
}

function TableCaption({
	className,
	...props
}: React.ComponentProps<"caption">) {
	return (
		<caption
			data-slot="table-caption"
			className={cn("text-muted-foreground mt-4 text-sm", className)}
			{...props}
		/>
	);
}

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
};

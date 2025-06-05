import { Card } from "./card";
import { cn } from "~/lib/utils";

interface CardItemProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	subtitle?: string;
	description?: string;
	author?: string;
	warning?: string;
	subtitleIcon?: React.ReactNode;
}

export const CardItem = ({
	title,
	subtitle,
	subtitleIcon,
	description,
	author,
	warning,
	className,
	...props
}: CardItemProps) => {
	return (
		<Card
			wrapperClassName="w-[260px]"
			className={cn("px-4 py-2 flex flex-col gap-2 relative ", className)}
			{...props}
			footerMessage={warning}
		>
			<h1 className="text-[32px] leading-8">{title}</h1>
			{subtitle && (
				<div className="flex items-center gap-2">
					{subtitleIcon}
					<h2 className="text-base font-light">{subtitle}</h2>
				</div>
			)}

			{description && (
				<p className="text-zinc-700 dark:text-zinc-300 text-base font-light">
					{description}
				</p>
			)}
			{author && (
				<p className="text-zinc-400 dark:text-zinc-400 text-sm text-end">
					{author}
				</p>
			)}
		</Card>
	);
};

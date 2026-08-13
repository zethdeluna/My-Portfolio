"use client";

import Link, { LinkProps } from "next/link";
import { useTransitionRouter } from "./TransitionProvider";

export function TransitionLink({
	className,
	href,
	children,
	setMenuOpen,
	link,
	...props
}: LinkProps & { 
	children: React.ReactNode; 
	setMenuOpen?: (open: boolean) => void;
	className?: string;
	link?: string;
}) {

	const navigate = useTransitionRouter();

	return (
		<Link
			className={className}
			href={href}
			{...props}
			onClick={e => {
				e.preventDefault();
				setMenuOpen?.(false);
				navigate(href.toString());
			}}
			data-link={link}
		>
			{children}
		</Link>
	);

};
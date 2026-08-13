"use client";

import { TransitionLink } from "./TransitionLink";
import { NAV_LINKS } from "./GlobalVars";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/dist/CustomEase";
import { File, LinkedIn, Github } from "./MyIcons";

gsap.registerPlugin(useGSAP, CustomEase);
CustomEase.create("easeBounce", ".3, 1, .5, 1.2");

export function Header() {

	const navRef = useRef<HTMLElement>(null);
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	const handleClick = () => {
		setMenuOpen(prev => !prev);
	};

	return (
		<header className={menuOpen ? 'menu-open' : ''}>
			
			<button 
				className="menu-button"
				aria-label="Open menu" 
				onClick={handleClick}
			>
				<span />
				<span />
			</button>

			<nav ref={navRef}>
				<ul>
					{NAV_LINKS.map(link => (
						<li key={link.href}>
							<TransitionLink
								href={link.href}
								children={link.title}
								setMenuOpen={setMenuOpen}
							/>
						</li>
					))}
					<li className="downloads">
						<a href="/Zeth_De_Luna_Resume.pdf" aria-label="Resume" target="_blank"><File /></a>
						<a href="https://www.linkedin.com/in/zethdeluna/" aria-label="LinkedIn" target="_blank"><LinkedIn /></a>
						<a href="https://github.com/zethdeluna" aria-label="Github" target="_blank"><Github /></a>
					</li>
				</ul>
			</nav>

		</header>
	);

}
"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { FullWidthMedia } from "./FullWidthMedia";

gsap.registerPlugin(useGSAP);

interface PostHeroProps {
	title: string;
	date: string;
	demoUrl?: string;
	repoUrl?: string;
	coverImage?: string;
	heroImage?: string;
}

export function PostHero({
	title,
	date,
	demoUrl,
	repoUrl,
	coverImage,
	heroImage
}: PostHeroProps) {

	const heroRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {

		const tl = gsap.timeline();

		tl
			.to('.background', {
				translateY: window.innerHeight,
				ease: 'power1.out',
				delay: 1,
				duration: 0.5
			})
			.to('h1', {
				color: '#FEFAF4',
				ease: 'power1.out',
				duration: 0.5
			}, '-=0.5')
		;

	}, { scope: heroRef });

	return (
		<div className="post-hero" ref={heroRef}>
			<span className="background" />
			<div className="hero-content">
				<h1>{title}</h1>
				<div className="sub-title">
					<time>{date}</time>
					{demoUrl && <a href={demoUrl} target="_blank">Demo</a>}
					{repoUrl && <a href={repoUrl} target="_blank">Repo</a>}
				</div>
			</div>
			{heroImage && <FullWidthMedia mediaType="image" src={heroImage} />}
		</div>
	);

};
"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRef } from "react";
import { NameZ, NameE, NameT, NameH } from "../MyIcons";
import type { HeroProps } from "./AnimationWrapper";
import { MEDIA_QUERIES } from "../GlobalVars";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const EASE = 'power1.inOut';

export function Hero({
	svgWidth,
	setSvgWidth,
	svgHeight,
	setSvgHeight,
	padding,
	setPadding,
	setHeroComplete
}: HeroProps) {

	const heroRef = useRef<HTMLElement>(null);
	const nameRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {

		if ( !document.querySelector('.home-page') || !nameRef.current ) return;

		const mq = gsap.matchMedia();

		mq.add({
			isMobile: MEDIA_QUERIES.mobile,
			isTablet: MEDIA_QUERIES.tablet,
			isDesktop: MEDIA_QUERIES.desktop
		}, (context) => {

			const { isMobile } = context.conditions as { isMobile: boolean; };

			const width = isMobile 
				? (window.innerWidth - 40) / 4
				: (window.innerWidth - 60) / 4
			;
			const height = width * (360 / 345);

			setSvgWidth(width);
			setSvgHeight(height);

			const padding = isMobile ? 8 : 12;
			setPadding(padding);

			// if ( isMobile ) {

			// 	const tl = gsap.timeline({
			// 		onComplete: () => {
			// 			setHeroComplete(true);
			// 			ScrollTrigger.refresh();
			// 		}
			// 	});

			// 	// tl animations

			// 	return () => tl.kill();

			// }

			const pseudoHeight = isMobile
				? 'calc(20 / 375 * 100vw)'
				: 'calc(100 / 1440 * 100vw)'
			;

			const tl = gsap.timeline({
				onComplete: () => {
					setHeroComplete(true);
					ScrollTrigger.refresh();
				}
			});

			tl
				.to('[data-letter]', {
					duration: 0,
					translateY: '-50%'
				})
				.to('[data-letter="z"]', {
					delay: 1,
					duration: 0.15,
					ease: EASE,
					scale: '1 1'
				})
				.to('[data-letter="e"]', {
					duration: 0.15,
					ease: EASE,
					scale: '1 1'
				})
				.to('[data-letter="t"]', {
					duration: 0.15,
					ease: EASE,
					scale: '1 1'
				})
				.to('[data-letter="h"]', {
					duration: 0.15,
					ease: EASE,
					scale: '1 1'
				})
				.to('.name', {
					duration: 0.5,
					ease: EASE,
					height: height + (2 * padding)
				}, '+=0.25')
				.to('[data-letter="z"]', {
					duration: 0.5,
					ease: EASE,
					translateX: 0,
					width: width
				})
				.to('[data-letter="e"]', {
					duration: 0.5,
					ease: EASE,
					translateX: width + padding,
					width: width
				}, '-=0.5')
				.to('[data-letter="t"]', {
					duration: 0.5,
					ease: EASE,
					translateX: 2 * (width + padding),
					width: width
				}, '-=0.5')
				.to('[data-letter="h"]', {
					duration: 0.5,
					ease: EASE,
					translateX: 3 * (width + padding),
					width: width
				}, '-=0.5')
				.to('[data-letter]', {
					duration: 0.5,
					ease: EASE,
					height: height,
					// '--pseudo-height': (110 / 1440) * window.innerWidth
					'--pseudo-height': pseudoHeight,
					'--pseudo-left': '1px',
					'--pseudo-top': 'calc(50% + 2px)',
					'--pseudo-width': 'calc(100% - 4px)'
				})
			;

			return () => tl.kill();

		});

	}, { scope: heroRef, dependencies: [nameRef.current] });

	return (
		<section className="home-hero" ref={heroRef}>
			<div className="name" ref={nameRef}>
				<NameZ />
				<NameE />
				<NameT />
				<NameH />
			</div>
		</section>
	);

};
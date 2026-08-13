"use client"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRef } from "react";
import type { HomeAboutProps } from "./AnimationWrapper";
import { TransitionLink } from "../TransitionLink";
import { MEDIA_QUERIES } from "../GlobalVars";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function About({
	svgHeight,
	padding,
	setAboutComplete
}: HomeAboutProps) {

	const scopeRef = useRef<HTMLElement | null>(null);

	useGSAP(() => {

		if ( !document.querySelector('.home-page') ) return;

		const mq = gsap.matchMedia();

		mq.add({
			isMobile: MEDIA_QUERIES.mobile,
			isTablet: MEDIA_QUERIES.tablet,
			isDesktop: MEDIA_QUERIES.desktop
		}, (context) => {

			const { isMobile } = context.conditions as { isMobile: boolean; };

			// if ( isMobile ) {

			// 	const tl = gsap.timeline({
			// 		onComplete: () => {
			// 			setAboutComplete(true);
			// 		}
			// 	});

			// 	// Mobile animations

			// 	return () => tl.kill();

			// }

			const tl = gsap.timeline({
				onComplete: () => {
					setAboutComplete(true);
				}
			});

			tl
				.to('.spacer', {
					duration: 0,
					height: window.innerHeight - svgHeight + (2 * padding)
				})
			;

			gsap.to('.content', {
				immediateRender: false,
				'--about-bar-cover-opacity': 1,
				scrollTrigger: {
					trigger: '.content',
					start: 'top bottom',
					end: 'top bottom',
					toggleActions: 'play none none reverse'
				}
			});

			gsap.to('.content', {
				immediateRender: false,
				'--about-bar-cover-opacity': 0,
				scrollTrigger: {
					trigger: '.content',
					start: 'bottom bottom',
					end: 'bottom bottom',
					toggleActions: 'play none none reverse'
				}
			});

		});

	}, { scope: scopeRef, dependencies: [svgHeight, padding] });

	return (
		<section className="home-about" ref={scopeRef}>

			<div className="spacer" />

			<div className="content">

				<div className="sticky-container">
					<h2>Frontend <br/>Engineer</h2>
					<article>
						<p>React</p>
						<p>TypeScript</p>
						<p>JavaScript</p>
					</article>
				</div>

				<div className="right-column">

					<div className="bio">
						<p>I'm Zeth — a frontend engineer with a bit of an unconventional background. I studied astrophysics in college because I'm genuinely fascinated by anything about science and exploration, and that hasn't changed. What I discovered along the way is that I'm also really good at building user-facing experiences, and that the two pair together surprisingly well — there's something satisfying about using code to make the universe a little more tangible and explorable.</p>
					</div>

					<TransitionLink href="/about" >
						More about <span className="last-word">me <span className="arrow">→</span></span>
					</TransitionLink>

				</div>

			</div>
		</section>
	);

};
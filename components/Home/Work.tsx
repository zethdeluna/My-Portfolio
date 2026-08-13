"use client"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRef } from "react";
import type { HomeWorkProps } from "./AnimationWrapper";
import { TransitionLink } from "../TransitionLink";
import { MEDIA_QUERIES } from "../GlobalVars";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Work({
	aboutComplete,
	posts
}: HomeWorkProps) {

	const workRef = useRef<HTMLElement | null>(null);
	const cardsRef = useRef<HTMLUListElement | null>(null);

	useGSAP(() => {

		if ( 
			!document.querySelector('.home-page') || 
			!aboutComplete || 
			!cardsRef.current 
		) return;

		const mq = gsap.matchMedia();

		mq.add({
			isMobile: MEDIA_QUERIES.mobile,
			isTablet: MEDIA_QUERIES.tablet,
			isDesktop: MEDIA_QUERIES.desktop
		}, (context) => {

			if ( !cardsRef.current ) return;

			const { isMobile } = context.conditions as { isMobile: boolean; };

			// if ( isMobile ) {

			// 	// Mobile animations

			// 	return;

			// }

			gsap.to(workRef.current, {
				immediateRender: false,
				'--work-bar-cover-opacity': 1,
				scrollTrigger: {
					trigger: workRef.current,
					start: 'top bottom',
					end: 'top bottom',
					toggleActions: 'play none none reverse',
					// markers: true
				},
			});

			gsap.to(workRef.current, {
				immediateRender: false,
				'--work-bar-cover-opacity': 0,
				scrollTrigger: {
					trigger: workRef.current,
					start: 'bottom bottom',
					end: 'bottom bottom',
					toggleActions: 'play none none reverse',
					// markers: true
				},
			});

			gsap.fromTo('h2',
				{
					translateX: 0,
				},
				{
					immediateRender: false,
					translateX: isMobile 
						? -1 * window.innerWidth
						: -1 * (window.innerWidth + 20)
					,
					scrollTrigger: {
						trigger: '[data-trigger="title"]',
						start: 'top bottom',
						end: 'top top',
						scrub: 0.75,
						// markers: true
					},
				}
			);

			// Cards
			const cardsWidth = cardsRef.current.offsetWidth;
			gsap.to('[data-trigger="cards"]', {
				duration: 0,
				height: window.innerHeight + (cardsWidth / 2)
			});

			gsap.to('.cards', {
				immediateRender: false,
				translateX: -1 * (window.innerWidth + cardsWidth + 40),
				scrollTrigger: {
					trigger: '[data-trigger="cards"]',
					start: 'top bottom',
					end: 'bottom top',
					scrub: 0.75,
					// markers: true
				},
			});

		});

	}, { scope: workRef, dependencies: [aboutComplete] });

	return (
		<section className="home-work" ref={workRef}>
			<div className="spacer" data-trigger="title" />
			<h2>Work</h2>
			<div className="spacer" data-trigger="cards" />
			<ul className="cards" ref={cardsRef}>
				{posts && (posts.map(project => (
					<li key={project.title}>
						<TransitionLink href={`/work/${project.slug}`}>
							<div className="image-container">
								{project.coverImage && <img src={project.coverImage} alt={`${project.title} thumbnail`} />}
							</div>
							<article>
								<h3>{project.title}</h3>
							</article>
						</TransitionLink>
					</li>
				)))}
			</ul>
		</section>
	);

};
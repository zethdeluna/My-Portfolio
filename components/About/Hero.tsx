"use client"

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRef } from "react";
import me from "../../public/images/me.jpeg";
import me2 from "../../public/images/me-2.jpg";
import { MEDIA_QUERIES } from "../GlobalVars";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Hero() {

	const imageRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {

		const mq = gsap.matchMedia();

		mq.add({
			isMobile: MEDIA_QUERIES.mobile,
			isTablet: MEDIA_QUERIES.tablet,
			isDesktop: MEDIA_QUERIES.desktop
		}, (context) => {

			const { isMobile } = context.conditions as { isMobile: boolean; };

			// if ( isMobile ) {

			// 	const tl = gsap.timeline();

			// 	// Mobile animations

			// 	return () => tl.kill();

			// }

			const tl = gsap.timeline();

			tl
				.to('.about-hero .cover-divider', {
					delay: 1,
					duration: 0.5,
					ease: 'power2.out',
					scaleX: 1
				})
				.to('.about-hero .cover-divider', {
					delay: 0.25,
					duration: 0.25,
					ease: 'power2.out',
					opacity: 0
				})
				.to('.about-hero .cover.top', {
					duration: 0.75,
					ease: 'power2.out',
					translateY: '-100%'
				}, '-=0.25')
				.to('.about-hero .cover.bottom', {
					duration: 0.75,
					ease: 'power2.out',
					translateY: '100%'
				}, '-=0.75')
			;

			tl.eventCallback('onComplete', () => {

				if ( !imageRef.current ) return;

				const coverScale = Math.max(
					window.innerWidth / imageRef.current.offsetHeight,
					window.innerHeight / imageRef.current.offsetWidth
				) * 1.1;

				gsap.to('.about-hero .image-container', {
					immediateRender: false,
					'--overlay-cover-translateY': 0,
					rotate: 90,
					scale: coverScale,
					scrollTrigger: {
						trigger: '.about-bio',
						start: 'top bottom',
						end: 'top top',
						scrub: 0.75
					}
				});

				gsap.fromTo('.about-hero .image-container',
					{
						immediateRender: false,
						scale: coverScale,
						'--overlay-cover-translateY': 0,
					},
					{
						immediateRender: false,
						scale: Math.min(
							(0.8 * window.innerWidth) / imageRef.current.offsetHeight,
							(0.8 * window.innerHeight) / imageRef.current.offsetWidth
						),
						'--overlay-cover-translateY': 110,
						scrollTrigger: {
							trigger: '.about-bio',
							start: 'bottom bottom',
							end: 'bottom top',
							scrub: 0.75,
							// markers: true
						}
					}
				);

				gsap.to('.about-hero .image-container', {
					immediateRender: false,
					'--overlay-cover-opacity': 0.3,
					scrollTrigger: {
						trigger: '.about-bio',
						start: 'center bottom',
						end: 'center bottom',
						toggleActions: 'play none none reverse'
					}
				});

				gsap.to('.about-hero img.first', {
					immediateRender: false,
					opacity: 0,
					visibility: 'hidden',
					scrollTrigger: {
						trigger: '.about-bio',
						start: 'center bottom',
						end: 'center bottom',
						toggleActions: 'play none none reverse'
					}
				});

				gsap.to('.about-hero img.last', {
					immediateRender: false,
					opacity: 1,
					visibility: 'visible',
					scrollTrigger: {
						trigger: '.about-bio',
						start: 'center bottom',
						end: 'center bottom',
						toggleActions: 'play none none reverse'
					}
				});

				gsap.to('.about-hero [data-line="1"]', {
					immediateRender: false,
					translateX: -100,
					scrollTrigger: {
						trigger: '.about-hero',
						start: 'top top',
						end: 'bottom top',
						scrub: 0.75
					}
				});

				gsap.to('.about-hero [data-line="2"]', {
					immediateRender: false,
					translateX: 70,
					scrollTrigger: {
						trigger: '.about-hero',
						start: 'top top',
						end: 'bottom top',
						scrub: 0.75
					}
				});

				gsap.to('.about-hero [data-line="3"]', {
					immediateRender: false,
					translateX: -60,
					scrollTrigger: {
						trigger: '.about-hero',
						start: 'top top',
						end: 'bottom top',
						scrub: 0.75
					}
				});

				gsap.to('.about-hero [data-line="4"]', {
					immediateRender: false,
					translateX: 100,
					scrollTrigger: {
						trigger: '.about-hero',
						start: 'top top',
						end: 'bottom top',
						scrub: 0.75
					}
				});

				gsap.to('.about-hero [data-line="1"]', {
					immediateRender: false,
					translateX: 0,
					scrollTrigger: {
						trigger: '.about-bio',
						start: 'top top',
						end: 'bottom -100%',
						scrub: 0.75
					}
				});

				gsap.to('.about-hero [data-line="2"]', {
					immediateRender: false,
					translateX: 0,
					scrollTrigger: {
						trigger: '.about-bio',
						start: 'top top',
						end: 'bottom -100%',
						scrub: 0.75
					}
				});

				gsap.to('.about-hero [data-line="3"]', {
					immediateRender: false,
					translateX: 0,
					scrollTrigger: {
						trigger: '.about-bio',
						start: 'top top',
						end: 'bottom -100%',
						scrub: 0.75
					}
				});

				gsap.to('.about-hero [data-line="4"]', {
					immediateRender: false,
					translateX: 0,
					scrollTrigger: {
						trigger: '.about-bio',
						start: 'top top',
						end: 'bottom -100%',
						scrub: 0.75
					}
				});

			});

			return () => tl.kill();

		});

	});

	return (
		<section className="about-hero">
			
			<h1 aria-label="About me" />

			<div className="image-container" ref={imageRef}>
				<img className="first" src={me.src} />
				<img className="last" src={me2.src} />
				<span className="cover top" />
				<span className="cover bottom" />
			</div>

			<div className="banner" aria-hidden="true">
				<span data-line="1">{"about me ".repeat(44)}</span>
				<span data-line="2">{"about me ".repeat(44)}</span>
				<span data-line="3">{"about me ".repeat(44)}</span>
				<span data-line="4">{"about me ".repeat(44)}</span>
				<span className="cover top" />
				<span className="cover bottom" />
			</div>

			<span className="cover-divider" />

		</section>
	);

};
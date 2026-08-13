"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomBounce from "gsap/dist/CustomBounce";
import CustomEase from "gsap/dist/CustomEase";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRef } from "react";
import type { BarProps } from "./AnimationWrapper";
import { MEDIA_QUERIES } from "../GlobalVars";

const CONV_FACTOR = 180 / Math.PI;

gsap.registerPlugin(useGSAP, CustomBounce, CustomEase, ScrollTrigger);

export function Bar({
	svgHeight,
	padding, 
	heroComplete
}: BarProps) {

	const barRef = useRef<HTMLDivElement>(null);

	const barTop = svgHeight + (2 * padding);

	useGSAP(() => {

		if ( 
			!document.querySelector('.home-page') || 
			!barRef.current ||
			!heroComplete
		) return;

		const mq = gsap.matchMedia();

		mq.add({
			isMobile: MEDIA_QUERIES.mobile,
			isTablet: MEDIA_QUERIES.tablet,
			isDesktop: MEDIA_QUERIES.desktop
		}, (context) => {

			if ( !barRef.current ) return;

			const { isMobile } = context.conditions as { isMobile: boolean; };

			const barWidth = barRef.current.offsetWidth;
			const barHeight = barRef.current.offsetHeight;

			const pivotY = barTop + barHeight;

			const asinInput = Math.min(1, Math.max(-1, (window.innerHeight - pivotY - 12) / barWidth));
			const radians = Math.asin(asinInput);
			const degrees = radians * CONV_FACTOR;

			const barAboutFinalPos = {
				'rotate': 360,
				'top': isMobile 
					? window.innerHeight - barHeight - 8
					: window.innerHeight - barHeight - 12
				,
				'width': isMobile
					? window.innerWidth - (2 * padding)
					: ((window.innerWidth - (2 * padding)) / 2) - 52
			};

			const barWorkFinalPos = {
				'left': window.innerWidth - barHeight - (2 * padding),
				'rotate': 810,
				'top': isMobile 
					? -16
					: -28
				,
				'width': window.innerHeight - (2 * padding)
			};

			const barFooterFinalPos = {
				'left': barHeight,
				'top': window.innerHeight - barHeight - 12,
				'rotate': 990,
				'width': window.innerHeight - (2 * padding)
			};

			// if ( isMobile ) {

			// 	const tl = gsap.timeline();

			// 	// mobile animations

			// 	return () => tl.kill();

			// }

			const tl = gsap.timeline();

			tl
				.to('.bar', {
					duration: 0,
					translateY: barTop
				})
				.to('.bar', {
					duration: 0.5,
					ease: 'elastic.out(1, 0.9)',
					scale: '1 1'
				}, '+=0.5')
				.to('.bar', {
					duration: 0.5,
					ease: 'bounce.out',
					rotate: degrees
				}, '+=0.5')
			;

			tl.eventCallback('onComplete', () => {

				gsap.fromTo('.bar',
					{
						immediateRender: false,
						rotate: degrees,
						translateY: barTop
					},
					{
						immediateRender: false,
						rotate: barAboutFinalPos.rotate,
						translateY: barAboutFinalPos.top,
						width: barAboutFinalPos.width,
						scrollTrigger: {
							trigger: '.home-about .content',
							start: 'top bottom',
							end: 'top top',
							scrub: 0.75,
							// markers: true
						}
					}
				);

				gsap.fromTo('.bar', 
					{
						immediateRender: false,
						rotate: barAboutFinalPos.rotate,
						translateY: barAboutFinalPos.top,
						width: barAboutFinalPos.width
					},
					{
						immediateRender: false,
						rotate: barWorkFinalPos.rotate,
						translateX: barWorkFinalPos.left,
						translateY: barWorkFinalPos.top,
						width: barWorkFinalPos.width,
						scrollTrigger: {
							trigger: '.home-work',
							start: 'top bottom',
							end: 'top top',
							scrub: 0.75,
							// markers: true
						}
					}
				);

				gsap.fromTo('.bar', 
					{
						immediateRender: false,
						rotate: barWorkFinalPos.rotate,
						translateX: barWorkFinalPos.left,
						translateY: barWorkFinalPos.top,
						width: barWorkFinalPos.width
					},
					{
						immediateRender: false,
						rotate: barFooterFinalPos.rotate,
						translateX: barFooterFinalPos.left,
						translateY: barFooterFinalPos.top,
						width: barFooterFinalPos.width,
						scrollTrigger: {
							trigger: 'footer',
							start: 'top bottom',
							end: 'top top',
							scrub: 0.75,
							// markers: true
						}
					}
				);

				gsap.to('.bar', {
					opacity: 0,
					scrollTrigger: {
						trigger: 'footer',
						start: '20% top',
						end: 'top top',
						toggleActions: 'play none none reverse'
					},
				});

			});

			return () => tl.kill();

		});

	}, { dependencies: [heroComplete, barRef.current]});

	return <div className="bar" ref={barRef} />;

};
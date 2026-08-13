"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import CustomEase from "gsap/dist/CustomEase";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);
CustomEase.create("easeBounceAlt", "0.25, 1.005, .36, 1.265");

export function PostContent({
	children
}: { children: React.ReactNode }) {

	const contentRef = useRef<HTMLElement>(null);

	useGSAP(() => {

		gsap.utils.toArray<HTMLElement>('.post-content > *').forEach(el => {

			if ( !el ) return; 

			gsap.to(el, {
				opacity: 1,
				scale: 1,
				visibility: 'visible',
				immediateRender: false,
				ease: 'easeBounceAlt',
				duration: 0.25,
				scrollTrigger: {
					trigger: el,
					start: 'top 90%',
					end: 'top 90%',
					toggleActions: 'play none none reverse'
				}
			})

		});

	}, { scope: contentRef });

	return (
		<article className="post-content" ref={contentRef}>
			{children}
		</article>
	);

};
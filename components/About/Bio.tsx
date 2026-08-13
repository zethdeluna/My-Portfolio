"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/dist/CustomEase";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);
CustomEase.create("easeBounce", ".3, 1, .5, 1.2");
CustomEase.create("easeBounceAlt", "0.25, 1.005, .36, 1.265");

export function Bio() {

	const bioRef = useRef<HTMLElement>(null);

	useGSAP(() => {

		gsap.utils.toArray<HTMLParagraphElement>('p').forEach(el => {
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

	}, { scope: bioRef });

	return (
		<section className="about-bio" ref={bioRef}>
			<article>
				<p>I'm Zeth — a <span>frontend engineer</span> with a bit of an unconventional background. I studied astrophysics in college because I'm genuinely fascinated by anything about science and exploration, and that hasn't changed. What I discovered along the way is that I'm also really good at building user-facing experiences, and that the two pair together surprisingly well — there's something satisfying about using code to make the universe a little more tangible and explorable.</p>
				<p>Most recently, I spent the 5 years at a small digital agency where I got to work on a pretty wide range of products — shipping component systems, wiring up APIs, and generally obsessing over creating experiences that were interactive and memorable. I learned a ton there and genuinely loved the work and our team.</p>
				<p>I work mainly with <span>React</span>, <span>TypeScript</span>, and <span>JavaScript</span>, but also have experience building on top of WordPress's CMS. I care a lot about the space between a beautiful design and a great implementation — getting that right is the part of the job I find most satisfying.</p>
				<p>Outside of work, I enjoy eating good food, drinking good coffee, strengthening my body, and spending time outside when I can (still getting off the high of exploring Yosemite). When the weather's nice, taking a drive down PCH to my little spot on the beach is my favorite way to clear the mind and live in the moment. When the money's nice, traveling to new places and exploring the food and nature is a must!</p>
				<p className="skills"><span>Skills & Tools:</span> React. TypeScript. JavaScript. jQuery. Zustand. HTML. CSS. PHP. Git. WordPress. Figma.</p>
			</article>
		</section>
	);

};
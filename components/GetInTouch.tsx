"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { EMAIL } from "./GlobalVars";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function GetInTouch() {

	useGSAP(() => {

		gsap.to('.get-in-touch .background', {
			translateY: 0,
			immediateRender: false,
			scrollTrigger: {
				trigger: '.get-in-touch',
				start: 'top bottom',
				end: 'top top',
				scrub: 0.75,
				// markers: true
			}
		});

	});

	return (
		<section className="get-in-touch">
			<span className="background" />
			<h2>
				<a href={`mailto:${EMAIL}`} className="flip-link">
					<span>Get in touch.</span>
					<span aria-hidden="true">Get in touch.</span>
				</a>
			</h2>
		</section>
	);

};
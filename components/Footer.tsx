"use client"

import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { TransitionLink } from "./TransitionLink";
import { NAV_LINKS } from "./GlobalVars";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Footer() {

	useGSAP(() => {

		if ( document.querySelector('.home-work h2') ) {
			gsap.fromTo('.home-work h2',
				{
					translateX: -1 * (window.innerWidth + 20)
				},
				{
					scrollTrigger: {
						trigger: 'footer',
						start: 'top bottom',
						end: 'top top',
						scrub: 0.75,
						// markers: true
					},
					translateX: -2 * (window.innerWidth + 20),
					immediateRender: false
				}
			);
		}

		gsap.fromTo('footer article', 
			{
				translateX: 0
			},
			{
				scrollTrigger: {
					trigger: 'footer',
					start: '20% top',
					end: 'bottom bottom',
					scrub: 0.75,
					// markers: true
				},
				translateX: window.innerWidth,
				immediateRender: false
			}
		);

	});

	return (
		<footer>
			<article>
				<h2>See ya.</h2>
				<ul>
					{NAV_LINKS.map(link => (
						<li key={link.href}>
							<TransitionLink 
								href={link.href} 
								children={link.title}
							/>
						</li>
					))}
					<li key="resume">
						<a href="/Zeth_De_Luna_Resume.pdf" target="_blank">Resume</a>
					</li>
					<li key="linkedin">
						<a href="https://www.linkedin.com/in/zethdeluna/" target="_blank">LinkedIn</a>
					</li>
					<li key="github">
						<a href="https://github.com/zethdeluna" target="_blank">Github</a>
					</li>
				</ul>
			</article>
		</footer>
	);

};
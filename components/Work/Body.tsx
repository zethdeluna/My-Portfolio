"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/dist/CustomEase";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { TransitionLink } from "../TransitionLink";
import { PostMeta } from "@/lib/posts";
import { MEDIA_QUERIES } from "../GlobalVars";

gsap.registerPlugin(useGSAP, CustomEase, ScrollTrigger);
CustomEase.create("easeBounce", ".3, 1, .5, 1.2");

export function Body({ posts }: { posts: PostMeta[] }) {

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
				.to('.work-body .background', {
					delay: 1,
					duration: 0.5,
					ease: 'power1.in',
					scaleY: 1
				})
				.to('.work-body h1', {
					color: '#FEFAF4',
					duration: 0.5,
					ease: 'power1.in'
				}, '-=0.5')
				.to('.work-body .description', {
					background: '#272727',
					duration: 0,
				}, '+=0.5')
				.to('.work-body .project-title', {
					background: '#272727',
					duration: 0,
				})
				.to('.work-body .divider', {
					duration: 0.5,
					ease: 'power1.out',
					scaleX: 1
				})
				.to('[data-link="1"]', {
					duration: 0.25,
					ease: 'easeBounce',
					rotate: 0,
					translateY: 0
				}, '-=0.25')
				.to('[data-link="2"]', {
					duration: 0.25,
					ease: 'easeBounce',
					rotate: 0,
					translateY: 0
				}, '-=0.15')
				.to('[data-link="3"]', {
					duration: 0.25,
					ease: 'easeBounce',
					rotate: 0,
					translateY: 0
				}, '-=0.15')
			;

			return () => tl.kill();

		});

	});

	return (
		<section className="work-body">
			<span className="background" />
			<h1>Work</h1>
			<div className="projects">
				<ul>
					{posts.map(project => (
						<li key={project.slug}>
							<article>
								<TransitionLink className="project-title flip-link" href={`/work/${project.slug}`}>
									<span>{project.title}</span>
									<span aria-hidden="true">{project.title}</span>
								</TransitionLink>
								{project.description ? <p className="description">{project.description}</p> : ''}
							</article>
							<div className="links">
								<TransitionLink className="story" href={`/work/${project.slug}`} link="1">Story</TransitionLink>
								<a data-link="2" href={project.demoUrl} target="_blank">Demo</a>
								<a data-link="3" href={project.repoUrl} target="_blank">Repo</a>
							</div>
							<span className="divider" />
						</li>
					))}
				</ul>
			</div>
		</section>
	);

};
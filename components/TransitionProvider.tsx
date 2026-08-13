"use client"

import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, createContext, useContext, ReactNode } from "react";

gsap.registerPlugin(useGSAP);

const TransitionContext = createContext<(href: string) => void>(() => {});

export function useTransitionRouter() {
	return useContext(TransitionContext);
}

export function TransitionProvider({ children }: { children: ReactNode }) {

	const overlayRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	const { contextSafe } = useGSAP({ scope: overlayRef });

	const navigate = contextSafe((href: string) => {

		const tl = gsap.timeline();

		tl
			.to(overlayRef.current, {
				scaleY: 1,
				duration: 0.5,
				ease: 'power2.out',
				transformOrigin: 'bottom',
				onComplete: () => router.push(href)
			})
			.to(overlayRef.current, {
				opacity: 0,
				duration: 0.5
			}, '+=0.5')
			.to(overlayRef.current, {
				scaleY: 0,
				duration: 0.5,
				ease: 'power2.out',
				transformOrigin: 'bottom'
			}, '+=0.5')
			.to(overlayRef.current, {
				opacity: 1
			})
		;

	});

	return (
		<TransitionContext.Provider value={navigate}>
			<div ref={overlayRef} className="page-transition" />
			{children}
		</TransitionContext.Provider>
	);

};
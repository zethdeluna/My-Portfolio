import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/About/Hero";
import { Bio } from "@/components/About/Bio";
import { GetInTouch } from "@/components/GetInTouch";

export const metadata: Metadata = {
	'title': 'About',
	'description': 'Meet Zeth'
};

export default function AboutPage() {

	return (
		<>
			<Header />
			<main className="about-page">
				<Hero />
				<Bio />
				<GetInTouch />
			</main>
			<Footer />
		</>
	);

};
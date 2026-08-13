import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Body } from "@/components/Work/Body";
import { GetInTouch } from "@/components/GetInTouch";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
	'title': 'Work',
	'description': 'Work'
};

export default function WorkPage() {

	const posts = getAllPosts();

	return (
		<>
			<Header />
			<main className="work-page">
				<Body posts={posts} />
				<GetInTouch />
			</main>
			<Footer />
		</>
	);

};
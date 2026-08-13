import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { GetInTouch } from "@/components/GetInTouch";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PostHero } from "@/components/Work/PostHero";
import { PostContent } from "@/components/Work/PostContent";
import { TransitionLink } from "@/components/TransitionLink";
import { FullWidthMedia } from "@/components/Work/FullWidthMedia";
import { TwoColumnMedia } from "@/components/Work/TwoColumnMedia";

const components = { FullWidthMedia, TwoColumnMedia };

export function generateStaticParams() {
	return getAllPosts().map(post => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {

	const { slug } = await params;
	const { meta, content } = getPostBySlug(slug);

	return (
		<>
			<Header />
			<TransitionLink href="/work" className="back"><span className="arrow">→</span>All Work</TransitionLink>
			<section className="post">
				<PostHero 
					title={meta.title} 
					date={meta.date} 
					demoUrl={meta.demoUrl} 
					repoUrl={meta.repoUrl} 
					coverImage={meta.coverImage} 
					heroImage={meta.heroImage} 
				/>
				<PostContent>
					<MDXRemote 
						source={content} 
						components={components}
					/>
					<div className="links">
						{meta.demoUrl && <a href={meta.demoUrl} target="_blank">Demo</a>}
						{meta.repoUrl && <a href={meta.repoUrl} target="_blank">Repo</a>}
					</div>
				</PostContent>
				<GetInTouch />
			</section>
			<Footer />
		</>
	);

}
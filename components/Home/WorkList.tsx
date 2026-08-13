import { getAllPosts } from "@/lib/posts";
import { TransitionLink } from "../TransitionLink";

export function WorkList() {

	const posts = getAllPosts();

	if ( !posts ) return;

	return (
		<>
			{posts.map(project => (
				<li key={project.title}>
					<TransitionLink href={`/work/${project.slug}`}>
						<div className="image-container">
							{project.coverImage && <img src={project.coverImage} alt={`${project.title} thumbnail`} />}
						</div>
						<article>
							<h3>{project.title}</h3>
						</article>
					</TransitionLink>
				</li>
			))}
		</>
	);

};
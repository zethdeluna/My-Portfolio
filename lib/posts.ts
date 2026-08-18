import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/work");

export interface PostMeta {
	slug: string;
	title: string;
	date: string;
	description: string;
	coverImage?: string;
	heroImage?: string;
	liveUrl: string;
	repoUrl?: string;
	note?: string;
	customLinkTitle?: string;
	customLinkUrl?: string;
}

export function getAllPosts(): PostMeta[] {

	const files = fs.readdirSync(postsDirectory);

	const posts = files
		.filter((f) => f.endsWith('.mdx'))
		.map((filename) => {
			const slug = filename.replace(/\.mdx$/, "");
			const fileContents = fs.readFileSync(
				path.join(postsDirectory, filename),
				"utf8"
			);
			const { data } = matter(fileContents);

			return { slug, ...(data as Omit<PostMeta, "slug">) };
		})
	;

	return posts.sort((a, b) => (a.date > b.date ? 1 : -1));

}

export function getPostBySlug(slug: string) {

	const fullPath = path.join(postsDirectory, `${slug}.mdx`);
	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	return { meta: data as Omit<PostMeta, "slug">, content, slug };

}
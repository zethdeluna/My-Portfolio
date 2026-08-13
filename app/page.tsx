import { AnimationWrapper } from "@/components/Home/AnimationWrapper";
import { getAllPosts } from "@/lib/posts";

export default function Home() {

	const posts = getAllPosts();

	return (
		<>
			<AnimationWrapper 
				posts={posts}
			/>
		</>
	);

};
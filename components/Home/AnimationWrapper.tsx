"use client"

import { useState, Dispatch, SetStateAction } from "react";
import { Hero } from "./Hero";
import { Bar } from "@/components/Home/Bar";
import { About } from "@/components/Home/About";
import { Work } from "@/components/Home/Work";
import { GetInTouch } from "@/components/GetInTouch";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PostMeta } from "@/lib/posts";

export interface HeroProps {
	svgWidth: number;
	setSvgWidth: Dispatch<SetStateAction<number>>;
	svgHeight: number;
	setSvgHeight: Dispatch<SetStateAction<number>>;
	padding: number;
	setPadding: Dispatch<SetStateAction<number>>;
	setHeroComplete: Dispatch<SetStateAction<boolean>>;
}

export interface BarProps {
	svgWidth: number;
	svgHeight: number;
	padding: number;
	heroComplete: boolean;
}

export interface HomeAboutProps {
	svgHeight: number;
	padding: number;
	setAboutComplete: Dispatch<SetStateAction<boolean>>;
}

export interface HomeWorkProps {
	aboutComplete: boolean;
	posts?: PostMeta[];
}

interface AWProps {
	posts: PostMeta[];
}

export function AnimationWrapper({ posts }: AWProps) {

	const [svgWidth, setSvgWidth] = useState<number>(0);
	const [svgHeight, setSvgHeight] = useState<number>(0);
	const [padding, setPadding] = useState<number>(0);

	const [heroComplete, setHeroComplete] = useState<boolean>(false);
	const [aboutComplete, setAboutComplete] = useState<boolean>(false);

	return (
		<>
			<Header />
			<main className="home-page">
				<Hero 
					svgWidth={svgWidth} 
					setSvgWidth={setSvgWidth} 
					svgHeight={svgHeight} 
					setSvgHeight={setSvgHeight} 
					padding={padding} 
					setPadding={setPadding} 
					setHeroComplete={setHeroComplete} 
				/>
				<Bar 
					svgWidth={svgWidth} 
					svgHeight={svgHeight} 
					padding={padding} 
					heroComplete={heroComplete} 
				/>
				<About 
					svgHeight={svgHeight} 
					padding={padding} 
					setAboutComplete={setAboutComplete} 
				/>
				<Work 
					aboutComplete={aboutComplete}
					posts={posts}
				/>
				<GetInTouch />
			</main>
			<Footer />
		</>
	);

};
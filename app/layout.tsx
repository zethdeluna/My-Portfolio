import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TransitionProvider } from "@/components/TransitionProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Zeth's Portfolio",
	description: "Zeth's Portfolio",
	metadataBase: new URL("https://www.zethdeluna.com"),
	openGraph: {
		title: "Zeth's Portfolio",
		url: "https://www.zethdeluna.com/",
		locale: 'en_US',
		type: 'website'
	}
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<TransitionProvider>
					{children}
				</TransitionProvider>
			</body>

		</html>
	);
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Layout from "./components/Layout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Genesis.AI",
	description: "Your Generative Analysis Partner",
	icons: "/images/favicon.ico"
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Layout>{children}</Layout>
			</body>
		</html>
	);
}

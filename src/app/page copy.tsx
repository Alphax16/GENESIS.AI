import HeroSection from "./components/HeroSection";
import Features from "./components/Features";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<div className="bg-black font-[sans-serif] text-gray-200 text-[15px]">
				<HeroSection />
				<Features />
			</div>
		</main>
	);
}

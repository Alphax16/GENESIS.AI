"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useNavContext } from "@/contexts/NavContext";

const HeroSection = () => {
    const router = useRouter();
	const { navKey, setNavKey } = useNavContext();

    const handleServicesBtnClick = () => {
        router.push("/services");
		setNavKey(2);
    };

	const handleAboutBtnClick = () => {
		router.push("/about");
		setNavKey(4);
	};

	return (
		<div
			className="relative lg:min-h-screen 2xl:min-h-[730px] before:absolute before:inset-0 before:w-full before:bg-black before:opacity-60 -mt-16"
			style={{
				backgroundImage:
					"url(/assets/images/dark-bg-image.webp)",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className="max-w-5xl mx-auto text-center relative px-4 sm:px-10 mt-16">
				<h1 className="lg:text-7xl md:text-6xl text-4xl font-bold mb-6 md:!leading-[80px]">
					GENESIS.AI
				</h1>
				<p className="text-base text-gray-400">
					The platform is designed keeping in mind the business use case of Cloudflare.
					In the era when cyber threats are on the rise and the internet is becoming a nest of violence and insensitiveness
					we emerge with the aim of filtering all these negativity and making internet once again a happy sea to surf.
					Out application makes use of the capabilities of Generative AI to filter malacious or unethical sites.
				</p>
				<div className="grid sm:grid-cols-3 gap-6 items-center mt-16">
					<div className="flex flex-col items-center text-center">
						<h5 className="font-bold text-2xl text-blue-600 mb-2">
							3+
						</h5>
						<p>Serverless AI Models</p>
					</div>
					<div className="flex flex-col items-center text-center">
						<h5 className="font-bold text-2xl text-blue-600 mb-2">
							100%
						</h5>
						<p>Modular Practices Followed</p>
					</div>
					<div className="flex flex-col items-center text-center">
						<h5 className="font-bold text-2xl text-blue-600 mb-2">
							3+
						</h5>
						<p>EDA Representations</p>
					</div>
				</div>
				<div className="mt-14 flex gap-x-8 gap-y-4 justify-center max-sm:flex-col">
					<button
						type="button"
						className="px-6 py-3.5 rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-all"
                        onClick={handleServicesBtnClick}
					>
						Explore Services
					</button>
					<button
						type="button"
						className="bg-transparent hover:bg-blue-600 border border-blue-600 px-6 py-3.5 rounded-md text-white transition-all"
						onClick={handleAboutBtnClick}
					>
						About
					</button>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;

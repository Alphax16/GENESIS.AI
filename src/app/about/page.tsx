"use client";
import React from "react";
import { useNavContext } from "@/contexts/NavContext";
import { useRouter } from "next/navigation";

const AboutPage = () => {
	const router = useRouter();
	const { navKey, setNavKey } = useNavContext();

	const handleBlogPostBtnClick = () => {
		router.push("/blogs");
		setNavKey(3);
	};

	const handleServicesBtnClick = () => {
		router.push("/services");
		setNavKey(2);
	};

	const handleCloudflareBtnClick = () => {
		const cloudflareDocsUrl =
			"https://developers.cloudflare.com/workers-ai";
		// router.push(cloudflareDocsUrl);
		window.open(cloudflareDocsUrl, "_blank", "noopener,noreferrer");
	};

	return (
		<div className="justify-center text-center items-center mt-10">
			<div className="max-w-5xl mx-auto text-center">
				<h2 className="text-3xl font-extrabold text-[#fff] inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-pink-400 after:rounded-full">
					ABOUT US
				</h2>
				<p className="text-gray-400 mt-5">
					We have been developing this idea as a product solution for
					Clouflare AI challenge. We tried to make this
					application&apos;s idea a scalable one, one which could be
					used seemlessly by businesses.
				</p>
			</div>
			<div className="max-w-4xl mx-auto text-center mt-32">
				<div>
					<h2 className="md:text-4xl text-3xl font-bold md:!leading-[50px] mb-6">
						About our Blog Posts
					</h2>
					<p className="text-gray-400">
						The blog posts being enlisted in the aforementioned
						section are solely for submission at the Cloudflare
						Workers AI Challenge been held this month. They are
						meants to provide you the insights of the internal
						working/functioning of our web-app.
					</p>
				</div>
				<button
					onClick={handleBlogPostBtnClick}
					className="px-6 py-3.5 rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-all mt-10"
				>
					Visit Blogposts
				</button>
			</div>

			<div className="mt-32 rounded-md px-4 py-12">
				<div className="grid md:grid-cols-2 justify-center items-center gap-12 max-w-7xl mx-auto">
					<div>
						<img
							src="https://readymadeui.com/management-img.webp"
							alt="Premium Benefits"
							className="w-full mx-auto"
						/>
					</div>
					<div className="max-md:text-center">
						<h2 className="md:text-4xl text-3xl font-bold md:!leading-[50px] mb-6">
							About Our Services
						</h2>
						<p className="text-gray-400">
							We provide end-to-end service for complete website
							content management, monitoring and analytics. The
							app can be used as a monitoring tool and also for
							establishing closures/restrictions for unsitable
							content.
						</p>
						<button
							type="button"
							className="px-6 py-3.5 rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-all mt-10"
							onClick={handleServicesBtnClick}
						>
							Our Services
						</button>
					</div>
				</div>
			</div>

			<div className="mt-32 rounded-md px-4 py-12">
				<div className="grid md:grid-cols-2 justify-center items-center gap-12 max-w-7xl mx-auto">
					<div className="max-md:text-center">
						<h2 className="md:text-4xl text-3xl font-bold md:!leading-[50px] mb-6">
							About Cloudflare Workers AI
						</h2>
						<p className="text-gray-400">
							Workers AI allows you to run machine learning
							models, on the Cloudflare network, from your own
							code – whether that be from Workers, Pages, or
							anywhere via the Cloudflare API.
						</p>
						<p className="text-gray-400">
							With the launch of Workers AI, Cloudflare is slowly
							rolling out GPUs to its global network. This enables
							you to build and deploy ambitious AI applications
							that run near your users, wherever they are.
						</p>
						<button
							type="button"
							className="px-6 py-3.5 rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-all mt-10"
							onClick={handleCloudflareBtnClick}
						>
							Visit Cloudflare
						</button>
					</div>
					<div>
						<img
							src="https://readymadeui.com/team-image.webp"
							alt="Premium Benefits"
							className="w-full mx-auto"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutPage;

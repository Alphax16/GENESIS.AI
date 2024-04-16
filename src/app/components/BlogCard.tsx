"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { BlogCardType } from "@/interfaces/BlogCardTypes";
import Image from "next/image";

const BlogCard = ({
	img,
	date,
	author,
	title,
	description,
	linkTo = "https://dev.to/raj-91427/genesisai-402d",
}: BlogCardType) => {
	const handleBtnClick = () => {
		try {
			window.open(`${linkTo}`, "_blank", "noopener,noreferrer");
		} catch (error) {
			console.error("Error opening link:", error);
		}
	};

	return (
		<div className="ml-[30%]">
			<div className="w-[50%] font-[sans-serif] my-4">
				<div className="mx-auto">
					{/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-md:max-w-lg mx-auto"> */}
					<div className="mt-16 max-md:max-w-lg mx-auto">
						<div className="w-full cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300">
							<Image
								src={img}
								alt="Blog Post 1"
								className="h-60 object-cover"
								width={0}
								height={0}
								sizes="100vw"
								style={{ width: "100%", height: "auto" }}
							/>
							<div className="p-6">
								<span className="text-sm block text-gray-400 mb-2">
									{date} | BY {author.toUpperCase()}
								</span>
								<h3 className="text-xl font-bold text-[#fff]">
									{title}
								</h3>
								<hr className="my-6" />
								<p className="text-gray-400 text-sm">
									{description}
								</p>
								<button
									type="button"
									className="px-6 py-2.5 mt-6 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
									onClick={handleBtnClick}
								>
									Read More
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;

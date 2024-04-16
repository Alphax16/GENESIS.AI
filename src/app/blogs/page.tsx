import React from "react";
import BlogCard from "@/components/BlogCard";

const BlogsPage = () => {
	const blogCardData = [
		{
			// img: "https://readymadeui.com/Imagination.webp",
			img: "/assets/images/Blog-1-Thumbnail.png",
			date: "APRIL, 2024",
			author: "Raj",
			title: "GENESIS",
			description:
				"A generative AI based tool which scans a complete website for potential malacious, unsafe or unethical content.",
			linkTo: "https://dev.to/raj-91427/genesisai-402d",
		},
	];

	return (
		<div className="ml-auto mr-auto">
			<div className="text-center items-center">
				<div>
					<h2 className="text-3xl font-extrabold text-[#fff] inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-pink-400 after:rounded-full">
						LATEST BLOGS
					</h2>
					<p className="text-gray-400 mt-5">
						The latest Dev.to blog of our devloped solution to the
						Workers AI challenge by Cloudflare
					</p>
				</div>
				{/* <div className="flex justify-center items-center"> */}
				<div className="flex justify-center items-center">
					{/* <div className="w-[80%]"> */}

					{blogCardData.map((data, index) => (
						<BlogCard
							key={index + 1}
							title={data.title}
							author={data.author}
							img={data.img}
							date={data.date}
							description={data.description}
							linkTo={data.linkTo}
						/>
					))}
					{/* </div> */}
				</div>
			</div>
		</div>
	);
};

export default BlogsPage;

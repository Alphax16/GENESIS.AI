"use client";
import React from "react";
import ServiceCard from "@/components/ServiceCard";

const servicesData = [
	{
		img: "/assets/images/Website-Analyzer.jpeg",
		title: "Website Content Analyzer",
		description:
			"A Generative AI based tool which scans a complete website for potential malacious, unsafe or unethical content.",
		linkTo: "/content-analyzer",
	},
];

const ServicesPage = () => {
	return (
		<div className="text-center">
			<h2 className="text-3xl font-extrabold text-[#fff] inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-pink-400 after:rounded-full">
				OUR SERVICES
			</h2>
			<div className="mt-20">
				{servicesData.map((data, index) => (
					<ServiceCard
						key={index + 1}
						img={data.img}
						title={data.title}
						description={data.description}
						linkTo={data.linkTo}
					/>
				))}
			</div>
		</div>
	);
};

export default ServicesPage;

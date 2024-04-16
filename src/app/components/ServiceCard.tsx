import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { CardType } from "@/interfaces/CardTypes";
import Image from "next/image";

const ServiceCard = ({ img, title, description, linkTo }: CardType) => {
	const router = useRouter();
	const currentRoute = usePathname();

	const handleBtnClick = () => {
		router.push(`${currentRoute}${linkTo}`);
	};

	return (
		<div>
			<div className="shadow-[0_2px_10px_-3px_rgba(6,81,237,0.8)] w-full max-w-sm rounded-lg overflow-hidden mx-auto font-[sans-serif] ">
				<div
					style={{
						width: "100%",
						height: "100%",
						position: "relative",
					}}
				>
					<Image
						src={img}
						alt="service-image"
						className="w-full"
						width={0}
						height={0}
						sizes="100vw"
						style={{ width: "100%", height: "auto" }}
					/>
				</div>
				<div className="px-4 py-6">
					<h3 className="text-[#fff] text-xl font-bold">{title}</h3>
					<p className="mt-4 text-sm text-gray-500">{description}</p>
					<button
						type="button"
						className="px-6 py-2.5 mt-6 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
						onClick={handleBtnClick}
					>
						Explore
					</button>
				</div>
			</div>
		</div>
	);
};

export default ServiceCard;

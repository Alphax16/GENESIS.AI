"use client";
import React from "react";
import { useNavContext } from "@/contexts/NavContext";
import NavItem from "./NavItem";

const Navbar = () => {
	const navItems = [
		{
			item: "Home",
			linkTo: "/",
		},
		{
			item: "Services",
			linkTo: "/services",
		},
		{
			item: "Blogs",
			linkTo: "/blogs",
		},
		{
			item: "About",
			linkTo: "/about",
		},
	];

	return (
		<div>
			<header className="py-4 px-4 sm:px-10 z-50 min-h-[70px] relative">
				<div className="lg:flex lg:items-center gap-x-2 relative">
					<div className="flex items-center shrink-0">
						{/* <a href="#"> */}
						{/* <img
										// src="https://readymadeui.com/readymadeui-light.svg"
										// src="/assets/images/Logo.png"
                    src="https://png.pngtree.com/png-vector/20211027/ourmid/pngtree-letter-g-logo-png-image_4000891.png"
										alt="logo"
										className="w-40"
									/> */}
						{/* </a> */}
						<button id="toggle" className="lg:hidden ml-auto">
							<svg
								className="w-7 h-7"
								fill="#fff"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
									clipRule="evenodd"
								></path>
							</svg>
						</button>
					</div>
					<div
						id="collapseMenu"
						className="lg:!flex lg:items-center w-full lg:ml-14 max-lg:hidden max-lg:bg-black gap-6 max-lg:fixed max-lg:w-1/2 max-lg:min-w-[250px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto"
					>
						<ul className="lg:flex lg:space-x-6 max-lg:space-y-6 max-lg:w-full">
							{navItems.map((itemData, index) => (
								<NavItem key={index + 1} index={index} linkTo={itemData.linkTo} item={itemData.item} />
							))}
						</ul>
					</div>
				</div>
			</header>
		</div>
	);
};

export default Navbar;

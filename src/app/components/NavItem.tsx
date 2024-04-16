import React from "react";
import { useNavContext } from "@/contexts/NavContext";
import Link from "next/link";
import { NavItemProps } from "@/interfaces/NavItemTypes";

const NavItem: React.FC<NavItemProps> = ({ index, linkTo, item }) => {
	const { navKey, setNavKey } = useNavContext();

	const handleNavItemClick = (index: number) => {
		setNavKey(index);
	};

	return (
		<li
			className="max-lg:border-b max-lg:py-2 px-3"
			onClick={() => handleNavItemClick(index + 1)}
		>
			<Link
				href={linkTo}
				className={`lg:hover:text-blue-600 block transition-all ${
					navKey === index + 1 && "text-blue-600"
				}`}
			>
				{item}
			</Link>
		</li>
	);
};

export default NavItem;

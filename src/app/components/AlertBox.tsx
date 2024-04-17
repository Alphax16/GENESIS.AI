import { AlertBoxProps } from "@/interfaces/AlertBoxTypes";
import React from "react";

const AlertBox: React.FC<AlertBoxProps> = ({ type, title, message }) => {
	let bgColor = "";
	let textColor = "";

	// Determine background color and text color based on message type
	switch (type.toLowerCase()) {
		case "success":
			bgColor = "bg-green-100";
			textColor = "text-green-800";
			break;
		case "warning":
			bgColor = "bg-yellow-100";
			textColor = "text-yellow-800";
			break;
		case "error":
			bgColor = "bg-red-100";
			textColor = "text-red-800";
			break;
		case "info":
			bgColor = "bg-blue-100";
			textColor = "text-blue-800";
			break;
		default:
			bgColor = "bg-gray-100";
			textColor = "text-gray-800";
	}

	return (
		<div
			className={`font-[sans-serif] ${bgColor} ${textColor} px-4 py-4 rounded z-50`}
			role="alert"
		>
			<strong className="font-bold text-base mr-4">{title}</strong>
			<span className="block text-sm sm:inline max-sm:mt-1">
				{message}
			</span>
		</div>
	);
};

export default AlertBox;

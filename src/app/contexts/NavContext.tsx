"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { NavContentType } from "@/interfaces/ContextTypes";
import { NavContextPropType } from "@/interfaces/ContextProviderPropTypes";

const NavContext = createContext<NavContentType | undefined>(undefined);

const NavContextProvider: React.FC<NavContextPropType> = ({ children }) => {
    const [navKey, setNavKey] = useState(1);
    
    useEffect(() => {
        console.log('Nav Link: ', navKey);
    }, [navKey]);

	return (
		<NavContext.Provider value={{ navKey, setNavKey }}>
			{children}
		</NavContext.Provider>
	);
};

const useNavContext = () => {
	const context = useContext(NavContext);
	if (!context) {
		throw new Error("useMyContext must be used within a NavProvider");
	}
	return context;
};

export { NavContextProvider, useNavContext };

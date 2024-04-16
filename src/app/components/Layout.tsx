import { LayoutType } from "@/interfaces/LayoutTypes";
import { NavContextProvider } from "@/contexts/NavContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC<LayoutType> = ({ children }) => {
	return (
		<NavContextProvider>
			<div>
				<Navbar />
				  {children}
				<Footer />
			</div>
		</NavContextProvider>
	);
};

export default Layout;

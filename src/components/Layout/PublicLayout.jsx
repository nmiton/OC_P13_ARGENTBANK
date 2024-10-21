import Footer from "../Footer";
import Navigation from "../Navigation";

// eslint-disable-next-line react/prop-types
export default function PublicLayout({ children }) {
	return (
		<>
			<Navigation />
			{children}
			<Footer />
		</>
	);
}

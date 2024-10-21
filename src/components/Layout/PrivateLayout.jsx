import { useSelector } from "react-redux";
import Footer from "../Footer";
import Navigation from "../Navigation";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const PrivateLayout = ({ children }) => {
	const token = useSelector((state) => state.auth.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate("/sign-in");
		}
	}, [navigate, token]);

	return (
		<>
			<Navigation />
			{children}
			<Footer />
		</>
	);
};

export default PrivateLayout;

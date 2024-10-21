import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/actions";
import { useDispatch } from "react-redux";
export default function Navigation() {
	const navigate = useNavigate();
	const token = useSelector((state) => state.auth?.user?.token);
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	/**
	 * Function ton click to link sign in
	 */
	const handleClickSignIn = () => {
		navigate("/sign-in");
	};
	/**
	 * Function ton click to link icon
	 */
	const handleClickIcon = () => {
		navigate("/");
	};

	/**
	 * Function on click on sign out
	 */
	const handleClickSignOut = () => {
		dispatch(logout());
		navigate("/sign-in");
	};

	return (
		<nav className="main-nav">
			<a className="main-nav-logo" onClick={handleClickIcon}>
				<img className="main-nav-logo-image" src="img/argentBankLogo.png" alt="Argent Bank Logo" />
				<h1 className="sr-only">Argent Bank</h1>
			</a>
			<div>
				{!token ? (
					<a className="main-nav-item" onClick={handleClickSignIn}>
						<i className="fa fa-user-circle"></i>
						Sign In
					</a>
				) : (
					<>
						{/* TODO Manage Name user */}
						<a className="main-nav-item" href="./user.html">
							<i className="fa fa-user-circle"></i>
							{user.firstName}
						</a>
						<a className="main-nav-item" onClick={handleClickSignOut}>
							<i className="fa fa-sign-out"></i>
							Sign Out
						</a>
					</>
				)}
			</div>
		</nav>
	);
}

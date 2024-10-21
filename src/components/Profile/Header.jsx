import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIdentity } from "../../redux/actions";

export default function Header() {
	const [showForm, setShowForm] = useState(false);
	const token = useSelector((state) => state.auth.user.token);
	const user = useSelector((state) => state.auth.user);
	const inputFirstnameRef = useRef();
	const inputLastnameRef = useRef();
	const dispatch = useDispatch();

	/**
	 * UEF to get user profile
	 */
	useEffect(() => {
		getUserProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/**
	 * Function to get user profile
	 */
	const getUserProfile = async () => {
		const response = await fetch("http://localhost:3001/api/v1/user/profile", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});
		const result = await response.json();
		const userInfo = result.body;
		dispatch(updateIdentity(userInfo));
	};

	/**
	 * Function on submit form edit profil
	 * @param {Event} e
	 */
	const handleClickUpdateProfile = async (e) => {
		e.preventDefault();
		const lastname = inputLastnameRef.current.value.trim();
		const firstname = inputFirstnameRef.current.value.trim();

		if (!lastname || lastname.length == 0) {
			alert("Please enter your lastname !");
			return;
		}
		if (!firstname || firstname.length == 0) {
			alert("Please enter your firstname !");
			return;
		}

		const credentials = {
			lastName: lastname,
			firstName: firstname,
		};

		const response = await fetch("http://localhost:3001/api/v1/user/profile", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			body: JSON.stringify(credentials),
		});

		const result = await response.json();

		if (response.status === 200) {
			const updatedUserInfo = result.body;
			dispatch(updateIdentity(updatedUserInfo));
			setShowForm(false);
		}
	};

	return (
		<div className="header">
			{showForm ? (
				<form className="form-edit-profile" onSubmit={handleClickUpdateProfile}>
					<h1>Welcome back</h1>
					<div className="container">
						<input type="text" name="firstname" id="firstname" placeholder={user.firstName} ref={inputFirstnameRef} />
						<input type="text" name="lastname" id="lastname" placeholder={user.lastName} ref={inputLastnameRef} />
					</div>
					<div className="container">
						<button className="edit-button" type="submit">
							Save
						</button>
						<button className="edit-button" onClick={() => setShowForm(!showForm)}>
							Cancel
						</button>
					</div>
				</form>
			) : (
				<>
					<h1>
						Welcome back
						<br />
						{user.firstName} {user.lastName}!
					</h1>
					<button className="edit-button" onClick={() => setShowForm(!showForm)}>
						Edit Name
					</button>
				</>
			)}
		</div>
	);
}

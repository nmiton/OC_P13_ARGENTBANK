import Account from "../Account/Account";
import Header from "./Header";

export default function Profile() {
	return (
		<main className="main bg-dark">
			<Header />
			<Account />
		</main>
	);
}

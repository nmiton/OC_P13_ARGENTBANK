import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";

import Home from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import ErrorPage from "./components/ErrorPage";
import Profile from "./components/Profile/Profile";
import PrivateLayout from "./components/Layout/PrivateLayout";
import PublicLayout from "./components/Layout/PublicLayout";

const path = createBrowserRouter([
	{
		path: "/",
		element: (
			<PublicLayout>
				<Home />
			</PublicLayout>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: "/sign-in",
		element: (
			<PublicLayout>
				<SignIn />
			</PublicLayout>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: "/profile",
		element: (
			<PrivateLayout>
				<Profile />
			</PrivateLayout>
		),
		errorElement: <ErrorPage />,
	},
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<RouterProvider router={path} />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);

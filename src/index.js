import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import Header from "./features/header";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Header />
			<App />
		</Provider>
	</React.StrictMode>
);

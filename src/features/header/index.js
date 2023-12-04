import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import ROUTES from "../../app/routes";
import styles from "./Header.module.css";
import { setFilter } from "../post/postSlice";
import { useDispatch } from "react-redux";

export default function Header() {
	const dispatcher = useDispatch();
	const [search, setSearch] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatcher(setFilter(search));
	};

	return (
		<>
			<header>
				<h1>RedditMinimal</h1>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Search"
						onChange={(e) => setSearch(e.target.value)}
					/>
					<input type="submit" />
				</form>
			</header>
			<Outlet />
		</>
	);
}

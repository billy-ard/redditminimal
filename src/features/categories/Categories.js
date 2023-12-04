import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
	loadAllCategories,
	selectAllCategories,
	setCategories,
	currentCategories,
} from "./categoriesSlice";
import styles from "./Categories.module.css";
import Image from "../../components/Image";

export default function Categories() {
	const dispatch = useDispatch();
	const getSelectedCategory = useSelector(currentCategories);
	const categories = useSelector(selectAllCategories);

	useEffect(() => {
		dispatch(loadAllCategories());
	}, [dispatch]);

	const handleClick = (categories) => {
		dispatch(setCategories(categories));
	};

	const checkCurrent = (selected) => {
		if (getSelectedCategory.toLowerCase() === selected.toLowerCase()) {
			return styles.active;
		}
		return styles.inactive;
	};

	return (
		<>
			<div className={styles.categories}>
				<ul>
					{categories.map((item) => {
						const url = `/categories/${item.name}`;

						return (
							<li className={checkCurrent(item.name)}>
								<button
									className={styles.button}
									href={url}
									onClick={() => handleClick(item.name)}>
									<Image src={item.image} type="categories_icon" alt="ico" />
									{item.name}
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
}

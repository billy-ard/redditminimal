import React from "react";
import styles from "./image.module.css";

export default function Image({ src, alt, type }) {
	const defaultIcon = require("../../assets/grey_icon.png");

	if (src && type === "categories_icon") {
		return <img src={src} alt={alt} className={styles.categories_icon} />;
	} else if (!src && type === "categories_icon") {
		return (
			<img src={defaultIcon} alt={alt} className={styles.categories_icon} />
		);
	} else if (src && type === "post_image") {
		return <img src={src} alt={alt} />;
	} else return "";
}

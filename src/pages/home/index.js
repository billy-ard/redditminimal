import React from "react";
import Post from "../../features/post/Post";
import Categories from "../../features/categories/Categories";
import styles from "./Home.module.css";

export default function Home() {
	return (
		<>
			<div className={styles.content}>
				<main>
					<div className={styles.post}>
						<Post />
					</div>
					<aside>
						<Categories />
					</aside>
				</main>
			</div>
		</>
	);
}

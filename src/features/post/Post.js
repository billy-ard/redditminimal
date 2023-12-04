import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	loadAllPost,
	selectAllPost,
	isLoadingLoadPost,
	currentFilter,
} from "./postSlice";
import { currentCategories } from "../categories/categoriesSlice";
import styles from "./Post.module.css";
import { Code } from "react-content-loader";
import Image from "../../components/Image";
import "./Post.css";

export default function Post() {
	const dispatch = useDispatch();
	let post = useSelector(selectAllPost) ?? [];
	const isLoadingPost = useSelector(isLoadingLoadPost);
	const categories = useSelector(currentCategories);
	const filter = useSelector(currentFilter);

	useEffect(() => {
		dispatch(loadAllPost(categories));
	}, [dispatch, categories]);

	if (isLoadingPost) {
		return <Code />;
	}

	if (categories && filter) {
		//filter
		post = post.filter((item) => {
			const { title } = item;
			return title.includes(filter) === true;
		});
	}

	return (
		<>
			<div className={styles.content}>
				{post.map((item) => (
					<div className={styles.box}>
						<div className={styles.item}>
							<div className={styles.title}>
								<h2>{item.title}</h2>
							</div>
							{item.thumbnail ? (
								<Image
									src={item.thumbnail} // Replace with your actual source value
									alt="image"
									type="post_image"
								/>
							) : (
								""
							)}

							<div className={styles.item_bottom}>
								<div>
									Posted By :
									<span className={styles.author_username}>{item.author}</span>
								</div>
								<div>{item.created} Hrs Ago</div>
								<div>Comment : {item.num_comments}</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

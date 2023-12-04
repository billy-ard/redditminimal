import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";
import categoriesReducer from "../features/categories/categoriesSlice";

export const store = configureStore({
	reducer: {
		post: postReducer,
		categories: categoriesReducer,
	},
});

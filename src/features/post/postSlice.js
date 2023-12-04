import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadAllPost = createAsyncThunk(
	"post/loadAllPost",
	async (category) => {
		const data = await fetch(
			`https://www.reddit.com/r/${category}/top.json?limit=10`
		);
		const json = await data.json();
		let mapJson = json.data.children;

		mapJson = mapJson.map((item) => {
			let currentDate = new Date().getTime();
			let dataDate = new Date(item.data.created).getTime();
			let diff = new Date(currentDate - dataDate).getHours();

			return {
				title: item.data.title,
				author: item.data.author,
				num_comments: item.data.num_comments,
				link: item.data.permalink,
				score: item.data.score,
				thumbnail: item.data.url_overridden_by_dest ?? "",
				created: diff,
			};
		});

		return mapJson;
	}
);

const postSlice = createSlice({
	name: "post",
	initialState: {
		post: [],
		currentSubReddit: "Home",
		currentFilter: "",
		isLoadingLoadPost: false,
		hasErrorLoadPost: false,
	},
	reducers: {
		setFilter: (state, action) => {
			state.currentFilter = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadAllPost.pending, (state) => {
				state.isLoadingLoadPost = true;
				state.hasErrorLoadPost = false;
			})
			.addCase(loadAllPost.fulfilled, (state, action) => {
				state.isLoadingLoadPost = false;
				state.hasErrorLoadPost = false;
				state.post = action.payload;
			})
			.addCase(loadAllPost.rejected, (state) => {
				state.isLoadingLoadPost = false;
				state.hasErrorLoadPost = true;
			});
	},
});

export const selectAllPost = (state) => state.post.post;
export const currentSubReddit = (state) => state.post.currentSubReddit;
export const isLoadingLoadPost = (state) => state.post.isLoadingLoadPost;
export const currentFilter = (state) => state.post.currentFilter;
export const { setFilter } = postSlice.actions;
export default postSlice.reducer;

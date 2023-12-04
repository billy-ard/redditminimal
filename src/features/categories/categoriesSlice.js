import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadAllCategories = createAsyncThunk(
	"categories/loadCategories",
	async () => {
		const data = await fetch("https://www.reddit.com/reddits.json?limit=10");
		const json = await data.json();
		let mapJson = json.data.children;

		mapJson = mapJson.map((item) => {
			return {
				name: item.data.display_name,
				image: item.data.icon_img,
			};
		});

		return mapJson;
	}
);

const categoriesSlice = createSlice({
	name: "categories",
	initialState: {
		categories: [],
		currentCategories: "home",
		isLoadingCategories: false,
		hasErrorCategories: false,
	},
	reducers: {
		setCategories: (state, action) => {
			state.currentCategories = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadAllCategories.pending, (state) => {
				state.isLoadingCategories = false;
				state.hasErrorCategories = false;
			})
			.addCase(loadAllCategories.fulfilled, (state, action) => {
				state.isLoadingCategories = false;
				state.hasErrorCategories = false;
				state.categories = action.payload;
			})
			.addCase(loadAllCategories.rejected, (state) => {
				state.isLoadingCategories = false;
				state.hasErrorCategories = false;
			});
	},
});

export const selectAllCategories = (state) => state.categories.categories;
export const currentCategories = (state) => state.categories.currentCategories;
export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;

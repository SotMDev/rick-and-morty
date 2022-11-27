import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	value: {
		isLoading: false,
		searchParams: {
			query: '',
			next: null,
			prev: null
		},
		pageCount: 1
	}
};

export const DataState = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setIsLoading: (state, action) => {
			state.value.isLoading = action.payload
		},
		setSearchParams: (state, action) => {
			state.value.searchParams = action.payload
		},
		setPageCount: (state, action) => {
			state.value.pageCount = action.payload
		}
	},
})

export const { setIsLoading, setSearchParams, setPageCount } = DataState.actions;

export default DataState.reducer
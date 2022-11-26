import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	value: {
		loading: false,
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
		setLoading: (state, action) => {
			state.value.loading = action.payload
		},
		setSearchParams: (state, action) => {
			state.value.searchParams = action.payload
		},
		setPageCount: (state, action) => {
			state.value.pageCount = action.payload
		}
	},
})

export const { setLoading, setSearchParams, setPageCount } = DataState.actions;

export default DataState.reducer
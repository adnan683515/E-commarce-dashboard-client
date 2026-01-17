import { createSlice } from "@reduxjs/toolkit";
import type { Category } from "./pcet.types";
import { fetchCategories } from "./pcet.thunk";




interface PcetState {
    categories: Category[];
    //   pcet: PcetItem[];
    selectedCategory: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: PcetState = {
    categories: [],
    selectedCategory: null,
    loading: false,
    error: null,
}


const pcetSlice = createSlice({
    name: "pcet",
    initialState,
    reducers: {

        setCategory(state, action) {
            state.selectedCategory = action.payload
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload ?? [];
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Something went wrong";
            });
}
})

export const { setCategory } = pcetSlice.actions;
export default pcetSlice.reducer;
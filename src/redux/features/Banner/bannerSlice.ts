import { createSlice } from "@reduxjs/toolkit";
import { AddNewBannerThunk } from "./banner.thunk";






type IBanner = {
    image: string[];
    loading: boolean;
    error: string | null;
}



const initialState: IBanner = {
    image: [],
    loading: false,
    error: null,
}




const bannerSlice = createSlice({
    name: 'bannerItem',
    initialState,
    reducers: {

        getBanner(state, action) {
            state.image = action.payload
        }
    },
    extraReducers: (builder) => {
        builder

            // add banner
            .addCase(AddNewBannerThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(AddNewBannerThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.image = [...state.image, action.payload]
            })
            .addCase(AddNewBannerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to update category";
            })

    }
})
export const { getBanner } = bannerSlice.actions;
export default bannerSlice.reducer;
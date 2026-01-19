import { createAsyncThunk } from "@reduxjs/toolkit";
import { bannerGetApi } from "./bannerApi";
import axios from "axios";
import type { IAddBanner, IBanner } from "./Banner.type";


// get banner
export const getBannerThunk = createAsyncThunk(
    "banner/getBannerThunk",
    async ({ token }: IBanner, { rejectWithValue }) => {
        try {
            if (token) {
                const response = await bannerGetApi({ token });
                return response;
            }
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch banners");
        }
    }
);





// add banner 


export const AddNewBannerThunk = createAsyncThunk("banner/AddNewBannerThunk", async ({ token, image }: IAddBanner, { rejectWithValue }) => {
    const formData = new FormData()
    try {
        if (token && image) {
            formData.append('image', image)
            console.log("image file", image)

            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}admin/banners`,
                formData,
                {
                    headers:
                    {
                        Authorization: `Bearer ${token}`
                    }
                })
            return res.data
        }
    }
    catch (err: any) {
        console.log(err)
        return rejectWithValue(err.response?.data?.message || "Failed Add Banner!")
    }

})

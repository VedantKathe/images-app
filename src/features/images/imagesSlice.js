import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    images: []
};

const imagesSlice = createSlice({
    name: "images",
    initialState, 
    reducers:{
        addImages: (state, {payload}) =>{
            state.images = payload
        }
    }
});

export const { addImages } = imagesSlice.actions;
export const getAllImages = (state) => state.images.images;
export default imagesSlice.reducer;
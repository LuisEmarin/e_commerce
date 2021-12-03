import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'classic drone',
        description: "redefine what's possible",
        camera_quality: 22.00,
        flight_time: 'Approx 20 mins',
        max_speed: '140kph',
        dimensions: '255 x 312 x 127mm',
        weight: 'approx 795g',
        cost_of_prod: 450.00,
        series: 'DJI FPV Series'
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload },
        // choosePrice: (state, action) => { state.price = action.payload}
    }
})

//Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName } = rootSlice.actions;
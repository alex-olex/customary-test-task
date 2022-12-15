import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instanceAPI from "../../api/instance";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {

});

const initialState = {
    showModal: false,
    modalData: null
};


const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setShowModal(state, action) {
            state.showModal = action.payload.action
            state.modalData = action.payload.data
        }
    },

    extraReducers: {

    }
})


export const modalReducer = modalSlice.reducer

export const { setShowModal } = modalSlice.actions
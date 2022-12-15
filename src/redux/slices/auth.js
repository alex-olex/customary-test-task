import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instanceAPI from "../../api/instance";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
    const { data } = await instanceAPI.post("/auth/", params);
    // axios.post("https://dev-1.dev.customary.io/api/v2/auth/", {
    //     "email": "gracemckenna26@gmail.com",
    //     "password": "mckennagrace26"
    // }).then(res => console.log(res))
    return data;
});

const initialState = {
    data: null,
    isAuth: false,
    status: "loading"
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {

            state.isAuth = false
            state.data = null
            localStorage.removeItem('token')
        }
    },

    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.data = null
            state.status = 'loading'
        },
        [fetchAuth.fulfilled]: (state, action) => {
            localStorage.setItem("token", action.payload.access)
            state.data = action.payload
            state.status = 'loaded'
            state.isAuth = true
        },
        [fetchAuth.rejected]: (state) => {
            alert("Can't login. Please, check email and password and try again.")
            state.data = null
            state.status = 'error'
        }
    }
})


export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions
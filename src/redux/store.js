import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { projectsReducer } from "./slices/projects";
import { tablesReducer } from "./slices/tables";
import { modalReducer } from "./slices/modal";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tables: tablesReducer,
        projects: projectsReducer,
        modal: modalReducer
    }
})

window.store = store
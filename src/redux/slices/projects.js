import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instanceAPI from '../../api/instance'

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (params) => {
    // const { currentProjectIndex } = params
    const { data } = await instanceAPI.get("/projects/")
    if (params) {
        return { data, currentProjectId: params }
    }

    return { data }
})

const initialState = {
    projects: [],
    currentProject: {},
    status: "loading"
}

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        changeCurrentProject(state, action) {
            const currentProject = state.projects.find(el => el.id === action.payload)
            state.currentProject = currentProject
            // state.currentProject.name = action.payload.name
        }
    },
    extraReducers: {
        [fetchProjects.pending]: (state) => {
            state.projects = []
            state.status = 'loading'
        },
        [fetchProjects.fulfilled]: (state, action) => {
            // const index = action.payload.data.data.findIndex(el => el.id === action.payz)
            const index = undefined
            if (index) {
                state.currentProject = action.payload.data.data[index]
            } else {
                state.currentProject = action.payload.data.data[0]
            }

            state.projects = action.payload.data.data
            state.status = 'loaded'
        },
        [fetchProjects.rejected]: (state) => {
            alert("Can't fetch projects.")
            state.projects = []
            state.status = 'error'
        }
    }
})


export const projectsReducer = projectsSlice.reducer

export const { changeCurrentProject } = projectsSlice.actions
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instanceAPI from '../../api/instance'

export const fetchTables = createAsyncThunk('tables/fetchTables', async (params) => {
    const { data } = await instanceAPI.get(`projects/${params}/tables`)

    return data
})

export const fetchCurrentTable = createAsyncThunk('tables/fetchCurrentTable', async (params) => {
    const { data } = await instanceAPI.get(`projects/${params.projectId}/tables/${params.tableId}/`)

    const columns = Object.keys(data.columns)
    const id = await data.id
    const rows = await instanceAPI.get(`projects/${params.projectId}/tables/${params.tableId}/data`).then(res => res.data.data)
    const response = { columns, id, rows }
    return response
})

export const editTable = createAsyncThunk('tables/editTable', async (params) => {
    const { data } = await instanceAPI.put(`/projects/${params.projectId}/tables/${params.tableId}/`, params.body)
    return data
})

export const updateColumn = createAsyncThunk('tables/updateColumn', async (params) => {
    const { projectId, tableId, columnId, body } = params
    console.log("update thunk ids:", { projectId: params.projectId, columnId: params.columnId, tableId: params.tableId })
    const { data } = await instanceAPI.put(`/projects/${projectId}/tables/${tableId}/data/${columnId}/`, body)

    return data
})

const initialState = {
    tables: [],
    currentTable: {},
    status: "loading",
    showSideTables: false
}

export const tablesSlice = createSlice({
    name: "tables",
    initialState,
    reducers: {
        setShowSideTables: (state, action) => {
            state.showSideTables = action.payload
        }
    },
    extraReducers: {
        [fetchTables.pending]: (state) => {
            state.tables = []
            state.status = 'loading'
        },
        [fetchTables.fulfilled]: (state, action) => {
            state.tables = action.payload.data.filter(table => table.created_by !== null)
            state.currentProject = action.payload.data[0]
            state.status = 'loaded'
        },
        [fetchTables.rejected]: (state) => {
            state.tables = []
            state.status = 'error'
        },

        [fetchCurrentTable.pending]: (state) => {
            state.currentTable = {}
            state.status = 'loading'
        },
        [fetchCurrentTable.fulfilled]: (state, action) => {
            state.currentTable = action.payload
            state.status = 'loaded'
        },
        [fetchCurrentTable.rejected]: (state) => {
            state.tables = []
            state.status = 'error'
        },



        [updateColumn.rejected]: (state, error) => {
            console.log(error)
            console.log(error.message)
            state.tables = []
            state.status = 'error'
        },
    }
})


export const tablesReducer = tablesSlice.reducer
export const { setShowSideTables } = tablesSlice.actions


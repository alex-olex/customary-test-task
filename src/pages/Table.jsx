import React, { useEffect, useMemo } from 'react'
import { MainLayout, EditTable } from '../components'
import { useParams } from 'react-router-dom'
import { fetchCurrentTable, updateColumn } from '../redux/slices/tables'
import { useDispatch, useSelector } from 'react-redux'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { setShowModal } from '../redux/slices/modal'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import _ from 'lodash'


function Table() {
    const currentProject = useSelector(state => state.projects.currentProject)
    const { columns, rows } = useSelector(state => state.tables.currentTable)
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCurrentTable({ tableId: id, projectId: currentProject.id }))
    }, [id])

    const defaultColDef = useMemo(() => {
        return {
            editable: true,
            valueSetter: params => {
                dispatch(updateColumn({ projectId: currentProject.id, tableId: id, columnId: params.data.id, body: { [params.colDef.field]: params.newValue } }))
                    .then(res => dispatch(fetchCurrentTable({ projectId: currentProject.id, tableId: id })))
                return true;
            }
        };
    }, []);

    return (
        <MainLayout>

            <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
                <AgGridReact
                    rowData={rows}
                    defaultColDef={defaultColDef}>
                    {
                        columns && columns.map((el, ind) => {
                            return <AgGridColumn key={el + ind} field={el}></AgGridColumn>
                        })
                    }
                </AgGridReact>
                <button className="add__column" onClick={() => dispatch(setShowModal({ action: "addColumnTable" }))}>add new column</button>
            </div>
        </MainLayout>
    )
}

export default Table








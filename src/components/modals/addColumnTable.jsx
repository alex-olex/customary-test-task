import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setShowModal } from '../../redux/slices/modal'
import instanceAPI from '../../api/instance'
import { fetchTables, fetchCurrentTable } from '../../redux/slices/tables'
import { useParams } from 'react-router-dom'

function AddColumnTable() {

    const dispatch = useDispatch()
    // const { currentProject } = useSelector(state => state.projects)
    //doesn't work: 
    // const [values, setValues] = useState({ label: '', type: '', min: '', max: '', description: '' })
    const { currentProject } = useSelector(state => state.projects)
    const { currentTable } = useSelector(state => state.tables)
    const [label, setLabel] = useState('')
    const [type, setType] = useState('')
    const [min, setMin] = useState('')
    const [max, setMax] = useState('')
    const [description, setDescription] = useState('')

    const { id } = useParams()


    const addColumn = async (projectId, tableId) => {
        await instanceAPI.post(`https://dev-1.dev.customary.io/api/v2/projects/${projectId}/tables/${tableId}/columns/`, { "default": "", type: "ShortText", "unique": false, "required": false, description, label, })
        dispatch(fetchCurrentTable(id))
        dispatch(fetchTables(projectId))
        dispatch(setShowModal(false))
    }


    return (
        <div className='modal__wrapper'>
            <div className="m">
                <div className="modal__header">
                    <span className="modal__title">Column Settings: </span>
                    <button className='modal__close' onClick={() => dispatch(setShowModal(false))}>close</button>
                </div>
                <div className="modal__field">
                    <span className="modal__text">Label:</span>
                    <input value={label} onChange={(e) => setLabel(e.target.value)} type="text" className="modal__input" />
                </div>
                <div className="modal__field">
                    <span className="modal__text">Column Type:</span>
                    <input value={type} onChange={(e) => setType(e.target.value)} type="text" className="modal__input" />
                </div>
                <div className="modal__field">
                    <span className="modal__text">Min :</span>
                    <input value={min} onChange={(e) => setMin(e.target.value)} type="number" className="modal__input" />
                </div>
                <div className="modal__field">
                    <span className="modal__text">Max :</span>
                    <input value={max} onChange={(e) => setMax(e.target.value)} type="number" className="modal__input" />
                </div>
                <div className="modal__field">
                    <span className="modal__text">Description :</span>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" className="modal__input" />
                </div>
                <div className="modal__buttons">
                    <button className="modal__cancel" onClick={() => dispatch(setShowModal(false))}>cancel</button>
                    <button className="modal__save" onClick={() => addColumn(currentProject.id, currentTable.id)}>save</button>
                </div>
            </div>
        </div>
    )
}

export default AddColumnTable
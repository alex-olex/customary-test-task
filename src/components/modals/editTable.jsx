import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setShowModal } from '../../redux/slices/modal'
import instanceAPI from '../../api/instance'
import { fetchTables } from '../../redux/slices/tables'

function EditTable() {
    const dispatch = useDispatch()
    const { currentProject } = useSelector(state => state.projects)
    const { currentTable } = useSelector(state => state.tables)
    const { modalData } = useSelector(state => state.modal)
    const [value, setValue] = useState('')

    const onSave = async () => {
        if (value.length === 0) {
            alert("Please, type the table name")
            return
        }

        console.log({ currentProject: currentProject.id, currentTable: currentTable.id })
        const { data } = await instanceAPI.put(`/projects/${currentProject.id}/tables/${modalData.id}/`, { name: value }).then(res => dispatch(fetchTables(currentProject.id)))
        dispatch(setShowModal(false))
    }

    const onChangeValue = (e) => {
        setValue(e.target.value)
    }


    return (
        <div className='modal__wrapper'>
            <div className="m">
                <div className="modal__header">
                    <span className="modal__title">Edit Table</span>
                    <button className='modal__close' onClick={() => dispatch(setShowModal(false))}>close</button>
                </div>
                <div className="modal__field">
                    <span className="modal__text">Name:</span>
                    <input value={value} onChange={onChangeValue} type="text" className="modal__input" />
                </div>
                <div className="modal__buttons">
                    <button className="modal__cancel" onClick={() => dispatch(setShowModal(false))}>cancel</button>
                    <button className="modal__save" onClick={onSave} >save</button>
                </div>
            </div>
        </div>
    )
}


export default EditTable
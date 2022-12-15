import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setShowModal } from '../../redux/slices/modal'
import instanceAPI from '../../api/instance'
import { fetchTables } from '../../redux/slices/tables'

function NewTable() {

    const dispatch = useDispatch()
    const { currentProject } = useSelector(state => state.projects)
    const { currentTable } = useSelector(state => state.tables)
    const [name, setName] = useState('')

    const createTable = async () => {
        if (name.length === 0) {
            alert("Please, type the table name")
            return
        }

        const { data } = await instanceAPI.post(`/projects/${currentProject.id}/tables/`, { name }).then(res => dispatch(fetchTables(currentProject.id)))
        dispatch(setShowModal(false))
    }

    return (
        <div className='modal__wrapper'>
            <div className="m">
                <div className="modal__header">
                    <span className="modal__title">New Table</span>
                    <button className='modal__close' onClick={() => dispatch(setShowModal(false))}>close</button>
                </div>
                <div className="modal__field">
                    <span className="modal__text">Table Name:</span>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="modal__input" />
                </div>
                <div className="modal__buttons">
                    <button className="modal__cancel" onClick={() => dispatch(setShowModal(false))}>cancel</button>
                    <button className="modal__save" onClick={createTable} >save</button>
                </div>
            </div>
        </div>
    )
}

export default NewTable
import React, { useEffect } from 'react'
import Sidebar from './sidebar/Sidebar'
import Menu from './Menu'
import { fetchProjects } from '../redux/slices/projects'
import { fetchTables } from '../redux/slices/tables'
import { useDispatch, useSelector } from 'react-redux'
import { EditTable, NewTable, Add, AddColumnTable } from './modals'
import { useParams } from 'react-router-dom'

function MainLayout({ children }) {
    const { showModal } = useSelector(state => state.modal)
    const { projects } = useSelector(state => state.projects)
    const { projectId } = useParams()

    const dispatch = useDispatch()
    const fetchData = async () => {
        if (projects.length === 0) {
            if (projectId) {

                await dispatch(fetchProjects(projectId)).then(async (res) => {
                    dispatch(fetchTables(projectId))
                })

            } else {
                // here set default current project (init) 
                await dispatch(fetchProjects()).then(async (res) => {
                    dispatch(fetchTables(res.payload.data.data[0].id))
                })

            }
        }



    }


    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            {showModal === "editTable" && <EditTable />}
            {showModal === "newTable" && <NewTable />}
            {showModal === "addColumnTable" && <AddColumnTable />}
            <div className="layout__wrapper">
                <Sidebar />
                <div className='layout'>
                    <Menu />
                    <div className="layout__page">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainLayout
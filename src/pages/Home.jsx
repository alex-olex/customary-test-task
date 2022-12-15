import React from 'react'
import { Sidebar, MainLayout, Project } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom/dist'
import { changeCurrentProject } from '../redux/slices/projects'

function Home() {
    const isAuth = useSelector(state => state.auth.isAuth)
    const { projects, currentProject } = useSelector(state => state.projects)
    const dispatch = useDispatch()

    const changeActiveProject = (id) => {
        dispatch(changeCurrentProject(id))
    }

    if (!isAuth) {
        return <Navigate to="/" />
    }

    return (
        <div>
            <MainLayout>
                {/* <Project /> */}
                <div className="projects__wrapper">
                    {
                        projects.map(({ name, description, id }) => {
                            return (
                                <Link to={`/projects/${id}`}>
                                    <Project onClick={() => changeActiveProject(id)} key={id} name={name} isActive={currentProject.id === id} description={description} />
                                </Link>
                            )
                        })
                    }
                </div>

            </MainLayout>
        </div>
    )
}

export default Home
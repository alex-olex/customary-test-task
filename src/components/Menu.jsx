import React, { useEffect, useState } from 'react'
import Select from "react-select";
import { useSelector, useDispatch } from 'react-redux'
import { changeCurrentProject } from '../redux/slices/projects'
import { fetchTables } from '../redux/slices/tables'
import { logout } from '../redux/slices/auth'
import { useNavigate } from 'react-router-dom'

function Menu() {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const { projects, currentProject } = useSelector(state => state.projects)


    const options = projects.map(({ id, description, name }) => {
        return {
            id, description, value: name, label: name
        }
    })

    const labelCurrentProject = {
        id: currentProject.id,
        value: currentProject.name,
        label: currentProject.name
    }


    const handleChange = async (e, id) => {
        dispatch(changeCurrentProject(id))
        dispatch(fetchTables(id))
        navigate(`/projects/${e.id}`)
    }


    const logoutMe = () => {
        console.log('logout')
        dispatch(logout())
        navigate("/")
    }

    return (
        <div className="menu">
            <span className="menu__title">Dashboard</span>
            <div className="menu__right">
                <span className="menu__text">
                    Selected Project:
                </span>
                <Select defaultValue={{ value: "none", label: "Empty" }} onChange={(e) => handleChange(e, e.id)} value={labelCurrentProject} options={options} />
                <button className="menu__logout" onClick={logoutMe}>logout</button>
                {/* <select name="projects" id="" className="menu__select"></select> */}
            </div>
        </div>
    )
}

export default Menu
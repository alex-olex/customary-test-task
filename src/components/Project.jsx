import React from 'react'


function Project({ name, description, onClick, isActive }) {
    return (
        <div className={`project ${isActive ? 'active' : ""}`} onClick={onClick}>
            <div className="project__title">{name}</div>
            <span className="project__description">{description}</span>
        </div>
    )
}

export default Project
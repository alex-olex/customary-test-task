import React from 'react'
import { Link } from 'react-router-dom'

function SidebarItem({ text, to }) {
    return (
        <Link to={to}>
            <button className='sidebar__button'>{text}</button>
        </Link>
    )
}

export default SidebarItem
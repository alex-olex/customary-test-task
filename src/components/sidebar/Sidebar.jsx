import React, { useState } from 'react'
import SidebarItem from '../SidebarItem'
import SidebarAccordion from './SidebarAccordion'



function Sidebar() {
    const [active, setActive] = useState(true)

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                Customary Test
            </div>
            <div className="sidebar__menu">
                <SidebarItem text="Projects" to={"/projects"} />
            </div>
            <SidebarAccordion active={active} setActive={setActive} />
        </div>
    )
}

export default Sidebar
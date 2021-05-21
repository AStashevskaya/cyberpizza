import React from 'react'
import { Link } from 'react-router-dom'

import './AdminLogBtn.scss'

const AdminLogBtn = () => {
return (
    <div className="admin__log">
        <Link to='/admin'>Admin  page</Link>
    </div>
)
}

export default AdminLogBtn

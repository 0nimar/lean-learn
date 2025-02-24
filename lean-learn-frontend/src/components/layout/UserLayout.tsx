import React from 'react'
import Sidebar from './roles/user/Sidebar'

const UserLayout = () => {
  return (
    <div><Sidebar><div></div></Sidebar>
    <div>user components such that sidebar can also have children</div>
    </div>
  )
}

export default UserLayout
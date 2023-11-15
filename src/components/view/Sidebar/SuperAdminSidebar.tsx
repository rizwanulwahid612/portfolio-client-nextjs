"use client"
import Sidebar from '@/components/ui/Sidebar/Sidebar'
import React from 'react'

const SuperAdminSidebar = ({children}:{children:React.ReactNode}) => {
     const items=[
      {key:"1",label:"super_admin",href:"/super_admin"},
      {key:"2",label:"Profile",href:"/super_admin/my-profile"}
    ]
  return <Sidebar items={items}>
    {children}
  </Sidebar>
  
}

export default SuperAdminSidebar
"use client"
import Sidebar from '@/components/ui/Sidebar/Sidebar'
import React from 'react'

const UserSidebar = ({children}:{children:React.ReactNode}) => {
     const items=[
      // {key:"1",label:"Admins",href:"/admin"},
      {key:"1",label:"Profile",href:"/user/my-profile"},
      {key:"2",label:"Change Password",href:"/user/changepassword"}
      
    ]
  return <Sidebar items={items}>
    {children}
  </Sidebar>
  
}

export default UserSidebar
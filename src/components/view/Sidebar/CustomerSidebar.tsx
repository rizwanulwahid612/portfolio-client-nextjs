"use client"
import Sidebar from '@/components/ui/Sidebar/Sidebar'
import React from 'react'

const CustomerSidebar = ({children}:{children:React.ReactNode}) => {
     const items=[
      {key:"1",label:"Home",href:"/"},
      {key:"2",label:"My-profile",href:"my-profile"},
      {key:"3",label:"Booking",href:"/customer/my-booking"}
    ]
  return <Sidebar items={items}>
    {children}
  </Sidebar>
  
}

export default CustomerSidebar
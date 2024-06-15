"use client"
import UserHeader from "@/components/view/Header/UserHeader"
import UserSidebar from "@/components/view/Sidebar/UserSidebar"
import { isLoggedIn } from "@/services/auth.service"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

 
export default function Adminayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userLoggedIn=isLoggedIn();///mainly used on  group router's layout as admin,user,..
  const router= useRouter();
  const [isLoadding,setLoadding]=useState<boolean>(false)
  useEffect(()=>{
   if(!userLoggedIn){
    router.push("/login")
   }
   setLoadding(true)
  },[router, userLoggedIn]);
  if(!isLoadding){
    return <p>Loading...</p>
  }
  return (
  
       <html lang="en">
      
      <body>
          <UserHeader/>
          <UserSidebar>
               {children}
          </UserSidebar>
       </body>
       </html> 
         
        
    
  )
}

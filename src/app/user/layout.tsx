import UserHeader from "@/components/view/Header/UserHeader"
import UserSidebar from "@/components/view/Sidebar/UserSidebar"
 
export default function Adminayout({
  children,
}: {
  children: React.ReactNode
}) {
  
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

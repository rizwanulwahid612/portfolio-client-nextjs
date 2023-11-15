
import SuperAdminHeader from "@/components/view/Header/SuperAdminHeader"
import SuperAdminSidebar from "@/components/view/Sidebar/SuperAdminSidebar"
 
export default function Adminayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
  
       <html lang="en">
      
      <body>
          <SuperAdminHeader/>
          <SuperAdminSidebar>
               {children}
          </SuperAdminSidebar>
       </body>
       </html> 
         
        
    
  )
}


import AdminHeader from "@/components/view/Header/AdminHeader"
import AdminSidebar from "@/components/view/Sidebar/AdminSidebar"
 
export default function Adminayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
  
       <html lang="en">
      
      <body>
          <AdminHeader/>
          <AdminSidebar>
               {children}
          </AdminSidebar>
       </body>
       </html> 
         
        
    
  )
}

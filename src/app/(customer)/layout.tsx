import CustomerHeader from "@/components/view/Header/CustomerHeader"
import CustomerSidebar from "@/components/view/Sidebar/CustomerSidebar"

 
export default function Customerlayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      
      <body>
        <CustomerHeader/>
        <CustomerSidebar>{children}</CustomerSidebar>
      </body>
      
        
      </html>
  )
}

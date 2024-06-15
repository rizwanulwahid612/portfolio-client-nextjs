import PublicHeader from "@/components/view/Header/PublicHeader"
import styletext from "../../components/styles/textcolor.module.css"
 
export default function Publiclayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      
      <html lang="en">
      
      <body className= {styletext.gradienbg}>
        <PublicHeader/>
        <div style={{margin:"20px"}} className="min-h-[calc(100vh-64px)]">
         {children}
         </div>
      </body>
      </html>
       
  
  )
}

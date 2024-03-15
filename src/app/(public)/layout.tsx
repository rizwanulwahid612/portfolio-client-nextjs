import PublicHeader from "@/components/view/Header/PublicHeader"

 
export default function Publiclayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      
      <html lang="en">
      
      <body>
        <PublicHeader/>
        <div style={{margin:"20px"}} className="min-h-[calc(100vh-64px)]">
         {children}
         </div>
      </body>
      </html>
       
  
  )
}

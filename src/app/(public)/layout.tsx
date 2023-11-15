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
         {children}
      </body>
      </html>
       
  
  )
}

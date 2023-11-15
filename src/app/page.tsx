"use client"
import Form from "@/components/Forms/Form";
import Footer from "@/components/ui/Footer/Footer";
import Carosol from "@/components/view/Carosol/Carosol";
import CategorySteps from "@/components/view/CategorySteps/CategorySteps";
import PublicHeader from "@/components/view/Header/PublicHeader";
import RegisterForm from "@/components/view/RegisterForm/RegisterForm";



// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
 
  return <>
  <PublicHeader/>
  
  <Carosol/>
  <CategorySteps/>
  <RegisterForm/>
  
  
  <Footer/>
  </>
}

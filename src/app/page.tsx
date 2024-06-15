/* eslint-disable @next/next/no-img-element */
"use client"


import PublicHeader from "@/components/view/Header/PublicHeader";


import { Button } from "antd";

import Image from "next/image";
import Link from "next/link";
import { motion, } from "framer-motion";

import { useRef } from "react";

import FooterPage from "@/components/Footer/footer";

import AboutPage from "@/components/view/about/about";
import AchivementPage from "@/components/view/achivement/achivement";
import { useFrameworksQuery } from "@/redux/api/frameworkApi";
import styletext from '../../src/components/styles/textcolor.module.css'
import { useUsersQuery } from "@/redux/api/userApi";

import img1  from "../access/Untitled_design__1_-removebg-preview (1).png"
import { FacebookOutlined, GithubOutlined, HomeOutlined, LinkedinOutlined, MailOutlined, PhoneOutlined, WhatsAppOutlined, YoutubeOutlined, DiscordOutlined, InstagramOutlined, TwitterOutlined, DownloadOutlined } from "@ant-design/icons";
import Framework from "@/components/view/framework/framework";
import Personalinfo from "@/components/view/personalinfo/personalinfo";
import Hireme from "@/components/view/Hireme/Hireme";


// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  const query: Record<string, any> = {};
  const {data ,isLoading}=useFrameworksQuery([])
  const { data:adminsd,isLoading:loading } = useUsersQuery({ ...query });
  


const daterr=adminsd?.users?.map((use:any)=>use?.passingyear).join(' ') as string

 console.log("adminsd",adminsd)
const ref = useRef() as any;

const dateObject = new Date(daterr);
const year = dateObject.getFullYear();
console.log(year)
 
 if(isLoading){
  return <div>Loading...</div>
}
//  if(loading){
//   return <div>Loading...</div>
// }
  return <>
  {/* <div className="bg-gradient-to-r from-purple-300 to-red-300"> */}
  <div className= {styletext.gradienbg}>
  <PublicHeader/>
  
  <div style={{display:"flex",justifyContent:"center",margin:"40px"}}>
         <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-full  flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
       
       
      
        {adminsd?.users?.map((use:any)=>{
return(
  <>
 <div className= "h-1/2 lg:h-full lg:w-1/2 flex flex-col gap-2 items-center justify-center" >
 
          <div className={styletext.boximages}>
            <div className={styletext.content}>
              <Image src={img1} alt=""  width={327} height={500} />
              {/* <h2 style={{position:"relative",fontSize:"1.5em",color:"#fff",fontWeight:"600px",letterSpacing:"0.05em",textTransform:"uppercase"}}>{use?.name}<br/><span style={{fontWeight:"300px", fontSize:"0.75em"}}>UX/UI Designer</span></h2>
              <Link style={{position:"relative", marginTop:"10px", padding:"10pxx 20px",background:"#fff",color:"#070alc",borderRadius:"25px",fontWeight:"500px",textTransform:"uppercase",letterSpacing:"8.05em",textDecoration:"none",transition:"0.5s"}} href="/contact">Hire Me</Link> */}
            </div>
           
          </div>
          
        </div>
   
       
  
        
 <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-col gap-2 items-center justify-center">
          {/* TITLE */}
          <h1 className={styletext.gradienttext}>
            <h1 className="text-3xl md:text-4xl font-bold">
            {use?.name}
            </h1>
          </h1>
          <h2 className={styletext.gradienttext}>
            <h2 className="text-3xl md:text-4xl font-bold">
            {use?.title}
            </h2>
          </h2>
          <h2 className={styletext.gradienttext}>
            <h2 className="text-3xl md:text-4xl font-bold">
            {use?.experience3}
            </h2>
          </h2>
           <h3 style={{display:"flex", justifyContent:"center",alignItems:"center"}} className={styletext.gradienttext}>
            <h3 className="text-2xl md:text-2xl font-bold">

            {use?.degree} {use?.institute} 
            {/* || {use.contact} || {use.github} || {use.linkedin} || {use.website} || {use.whatsapp} */}
            </h3>
          </h3>
           <h3 style={{display:"flex", justifyContent:"center",alignItems:"center"}} className={styletext.gradienttext}>
            <h3 className="text-2xl md:text-2xl font-bold">
            {use?.masters}
            {/* || {use.contact} || {use.github} || {use.linkedin} || {use.website} || {use.whatsapp} */}
            </h3>
            
          </h3>
           <h3 style={{display:"flex", justifyContent:"center",alignItems:"center"}} className={styletext.gradienttext}>
            <h3 className="text-2xl md:text-2xl font-bold">
            {use?.phd}
            {/* || {use.contact} || {use.github} || {use.linkedin} || {use.website} || {use.whatsapp} */}
            </h3>
            
          </h3>
           <h3 style={{display:"flex", justifyContent:"center",alignItems:"center"}} className={styletext.gradienttext}>
            <h3 className="text-2xl md:text-2xl font-bold">
            {use?.email} 
            {/* || {use.contact} || {use.github} || {use.linkedin} || {use.website} || {use.whatsapp} */}
            </h3>
            
          </h3>
           <h3 style={{display:"flex", justifyContent:"center",alignItems:"center"}} className={styletext.gradienttext}>
            <h3 className="text-2xl md:text-2xl font-bold">
            {use?.cantact} {use?.whatsapp}
            {/* || {use.contact} || {use.github} || {use.linkedin} || {use.website} || {use.whatsapp} */}
            </h3>
          </h3>
           <h3 style={{display:"flex", justifyContent:"center",alignItems:"center"}} className={styletext.gradienttext}>
            <h3 className="text-2xl md:text-2xl font-bold">
            {use?.presentaddress} 
            {/* || {use.contact} || {use.github} || {use.linkedin} || {use.website} || {use.whatsapp} */}
            </h3>
          </h3>
       


 {/* BUTTONS */}
<br/>
          <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-row gap-2 items-center justify-center">
             <Link href={`//${use?.cv}`} target="_blank" rel="noopener noreferrer">
            <Button shape="round" style={{cursor:"pointer",height:"150%"}} className="bg-black text-white">
              <DownloadOutlined />
             <h3  className={styletext.gradienttext}>
               My CV 
              </h3>
            </Button>
            </Link>
            <Link href={`//${use?.resume}`} target="_blank" rel="noopener noreferrer">
            <Button shape="round" style={{cursor:"pointer",height:"150%"}} className="bg-black text-white">
             <DownloadOutlined/>
              <h3  className={styletext.gradienttext}>
               Resume 
              </h3>
            </Button>
            </Link>
          </div>







         <div style={{display:"flex",gap:"4px"}}>
           <Link href={`//${use?.website}`} target="_blank" rel="noopener noreferrer">
              <Button type="primary"  shape="round" style={{ backgroundColor:"black",fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px" }}><HomeOutlined /></Button>
          </Link>
           <Link href={`//${use?.github}`} target="_blank" rel="noopener noreferrer">
              <Button  shape="round"  style={{ fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px" }}><GithubOutlined /></Button>
          </Link>
         
          
          
         
          {/* <div >
              <Button style={{ fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px" }}><MailOutlined /></Button>
          </div>
          <div >
              <Button style={{ fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px" }}><PhoneOutlined /></Button>
          </div>
          <div >
              <Button style={{ fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px" }}><WhatsAppOutlined /></Button>
          </div> */}
          
         
       {/* <Link href={`//${admindata?.gitClient}`} target="_blank" rel="noopener noreferrer">
              <Button type="primary" shape="round"  style={{ fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px",backgroundColor:"black" }}><GithubOutlined />Client</Button>
          </Link> */}
           <Link href={`//${use?.linkedin}`} target="_blank" rel="noopener noreferrer">
              <Button  type="primary" shape="round" style={{ fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px" }}><LinkedinOutlined /></Button>
          </Link>
           <Link href={`//${use?.discord}`} target="_blank" rel="noopener noreferrer">
              <Button type="primary" shape="round" style={{backgroundColor:"blue", fontSize: '22px',width:"14px 34px 14px 0px ",height:"44px" }}><DiscordOutlined/></Button>
          </Link>
            <Link href={`//${use?.facebook}`} target="_blank" rel="noopener noreferrer">
              <Button type="primary" shape="round" style={{ fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px" }}><FacebookOutlined /></Button>
          </Link>
            {/* <div >
              <Button type="primary" shape="round"  style={{ fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px" }}><TwitterOutlined /></Button>
          </div> */}
         
             <Link href={`//${use?.youtube}`} target="_blank" rel="noopener noreferrer">
              <Button type="primary" danger shape="round"  style={{backgroundColor:"red", fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px" }}><YoutubeOutlined /></Button>
          </Link>
            
            {/* <div >
              <Button type="primary" danger shape="round"  style={{ fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px" }}><InstagramOutlined /></Button>
          </div> */}
         </div>
         
          <br />
          <br/>
          
          {/* DESC */}
        
          
          {/* BUTTONS */}
         <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-row gap-2 items-center justify-center">
             <Link
            href="/project">
            <Button shape="round" style={{cursor:"pointer",height:"150%"}} className="bg-black text-white">
             <h3 className={styletext.gradienttext}>
              View My Work
              </h3>
            </Button>
            </Link>
            <Link
            href="/contact">
            <Button shape="round" style={{cursor:"pointer",height:"150%"}} >
              <h3  className={styletext.gradienttext}>
               Contact Me
              </h3>
            </Button>
            </Link>
          </div>
          
        </div>

</>
)

        })}


  
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      
        {adminsd?.users?.map((user: any, index: number) => (
  <div key={index}>
    <div className="md:text-xl sm:text-xl lg:text-xl">
      <h1 className={styletext.gradienttext} style={{padding:"20px", display: "flex", justifyItems: "flex-start", textAlign: "start" }}>
        OBJECTIVE
      </h1>
      <br />
      <div style={{padding:"20px",color:"skyblue"}}>
      This is {user?.name}. I want to serve my career in IT and Computer Science and Engineering sectors through a competitive 
      and creative environment. I am {user?.title}. I have completed my degree {user?.degree} from {user?.institute} in {user?.year}.
      I started work with {user?.experience2} till now. Recently, I have {user?.experience1} which I attached into my {user?.features}. 
      I have used some {user?.technologyFor} web development.
      <br/>
      <span>{user?.front}: {user?.frontend}.</span>
      <br/>
      <span>{user?.back}: {user?.backend}.</span>
      <br/>
      <span>{user?.tool}: {user?.tools}.</span>
      <br/>
      <span>Soft Skill: {user?.skills}.</span>
      <br/>
      <span>Extracurricular Activities: {user?.extracurriculam}.</span>
      <br/>
      <span>Language: {user?.language}.</span>
      </div>
    </div>
  </div>
))}




    </motion.div>
  </div>  
   

  <AboutPage/>
 
  
<Framework/>
<AchivementPage/>
<br/>
<Hireme/>



<div>
  
</div>
<FooterPage/>
 </div> 
      
       


        

  
  </>
}

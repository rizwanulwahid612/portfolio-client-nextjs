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
import { FacebookOutlined, GithubOutlined, HomeOutlined, LinkedinOutlined, MailOutlined, PhoneOutlined, WhatsAppOutlined, YoutubeOutlined, DiscordOutlined, InstagramOutlined, TwitterOutlined } from "@ant-design/icons";
import Framework from "@/components/view/framework/framework";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  const query: Record<string, any> = {};
  const {data,isLoading}=useFrameworksQuery([])
  const { data:adminsd } = useUsersQuery({ ...query });
  

const hgmga=adminsd?.users?.map((use:any)=>use?.image).join(' ') as string
const daterr=adminsd?.users?.map((use:any)=>use?.passingyear).join(' ') as string

 console.log("adminsd",adminsd)
const ref = useRef() as any;

const dateObject = new Date(daterr);
const year = dateObject.getFullYear();
console.log(year)
 
 if(isLoading){
  return <div>Loading...</div>
}
  return <>
  {/* <div className="bg-gradient-to-r from-purple-300 to-red-300"> */}
  <div className="bg-gradient-to-r from-blue-300 to-skyblue-600">
  <PublicHeader/>
  
  <div style={{display:"flex",justifyContent:"center",margin:"40px"}}>
         <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
       
       
      
        {adminsd?.users?.map((use:any)=>{
return(
  <>
 <div className="h-1/2 lg:h-full lg:w-1/2 relative" >
          
          <Image src={img1} alt=""  width={385} height={450} />
        </div>

 <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-col gap-2 items-center justify-center">
          {/* TITLE */}
          <h1 className={styletext.gradienttext}>
            <h1 className="text-4xl md:text-8xl font-bold">
            {use?.name}
            </h1>
          </h1>
          <h2 className={styletext.gradienttext}>
            <h2 className="text-4xl md:text-6xl font-bold">
            {use?.title}
            </h2>
          </h2>
           <h3 style={{display:"flex", justifyContent:"center",alignItems:"center"}} className={styletext.gradienttext}>
            <h3 className="text-2xl md:text-2xl font-bold">

            {use?.degree} {use?.institute} {year}
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
         
          
          {/* DESC */}
          <p className="md:text-xl">
I am web developer, I want to build up my career in IT and Computer Science and Engineering sectors. I have used some technology for web development.
            <br/>
           <span>FrontEnd:{use?.frontend}.</span> 
           <br/>
           <span>Backend: {use?.backend}.</span>
           <br/>
           <span>Tools:{use?.tools}</span>
           <br/>
           <span>Soft Skill:{use?.skill}.</span>
           <br/>
            <span>{use?.extracurriculam}.</span>
            <br/>
            <span>Language: {use?.language}.</span>
            
          </p>
          
          {/* BUTTONS */}
          <div className="w-full flex gap-4">
             <Link
            href="/project">
            <Button style={{cursor:"pointer",height:"150%"}} className="bg-black text-white">
             <h3 className={styletext.gradienttext}>
              View My Work
              </h3>
            </Button>
            </Link>
            <Link
            href="/contact">
            <Button style={{cursor:"pointer",height:"150%"}} >
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
    </motion.div>
  </div>  
  <AboutPage/>
  <AchivementPage/>
<Framework/>




<div>
  
</div>
 </div> 
      
       


        
<FooterPage/>
  
  </>
}

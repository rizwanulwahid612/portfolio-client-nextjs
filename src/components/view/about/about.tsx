"use client";
import Brain from "@/components/brain";
import { useExperiancesQuery } from "@/redux/api/experianceApi";
import { useSkillsQuery } from "@/redux/api/skillApi";
import { motion, useInView, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import ExperiancePage from "../experiance/experiance";
import styletext from '../../styles/textcolor.module.css'
import { useUsersQuery } from "@/redux/api/userApi";
import Personalinfo from "../personalinfo/personalinfo";
const AboutPage = () => {
  const { data:adminsd } = useUsersQuery([]);
  

const hgmga=adminsd?.users?.map((use:any)=>use?.image).join(' ') as string
const aboutme=adminsd?.users?.map((use:any)=>use?.aboutme).join(' ') as string
const nameUser=adminsd?.users?.map((use:any)=>use?.name).join(' ') as string
  const containerRef = useRef() as any;

  const { scrollYProgress } = useScroll({ container: containerRef } as {container:any});

  const skillRef = useRef() as any;
  // const isSkillRefInView = useInView(skillRef, {once:true});
  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });

  const experienceRef = useRef() as any;
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });
  const {data}=useSkillsQuery([])
  const {data:exp}=useExperiancesQuery([])
 
  console.log("data:",exp)
  return (
    <div>
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      {/* CONTAINER */}
      <div className="h-full overflow-scroll lg:flex" ref={containerRef}>
        {/* TEXT CONTAINER */}
        <div className="p-4 sm:p-8 md:p-12 lg:p-12 xl:p-12 flex flex-col gap-24 md:gap-24 lg:gap-24 xl:gap-24">
          {/* BIOGRAPHY CONTAINER */}
          <div className="flex flex-col gap-12 justify-center">
            {/* BIOGRAPHY IMAGE */}
            <Image
              src={hgmga}
              alt=""
              width={112}
              height={112}
              className="w-36 h-36 rounded-full object-cover"
            />
            {/* BIOGRAPHY TITLE */}
            <h1 className="font-bold text-2xl">
              <h1 className={styletext.gradienttext}>
              BIOGRAPHY
              </h1>
              </h1>
            {/* BIOGRAPHY DESC */}
            <p className="text-lg">
           {aboutme}
            </p>
            {/* BIOGRAPHY QUOTE */}
            <span className="text-lg  italic">
              I do hereby declare that the above information is true and correct to the Best of my knowledge.
            </span>
            {/* BIOGRAPHY SIGN SVG*/}
            <div className="self-end text-lg ">
              {nameUser}
            </div>
            
            <Personalinfo/>
          
    
            <ExperiancePage/>
            {/* BIOGRAPHY SCROLL SVG */}
            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}
            >
              <path
                d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                stroke="#000000"
                strokeWidth="1"
              ></path>
              <path d="M12 6V14" stroke="#000000" strokeWidth="1"></path>
              <path
                d="M15 11L12 14L9 11"
                stroke="#000000"
                strokeWidth="1"
              ></path>
            </motion.svg>
          </div>
          {/* SKILLS CONTAINER */}
          <div className="flex flex-col gap-12 justify-center" ref={skillRef}>
            {/* SKILL TITLE */}
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-bold text-2xl"
            >
              <h1 className={styletext.gradienttext}>
              SKILLS
              </h1>
            </motion.h1>
            {/* SKILL LIST */}
            <motion.div
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              className="flex gap-4 flex-wrap"
            >
             {data?.skill?.map((p:any) => {
  return (
    <div key={p?._id} className="rounded p-2 text-lg cursor-pointer bg-black text-white hover:bg-white hover:text-black">
      {p?.name}
    </div>
  );
})}
              
            </motion.div>
           {/* SKILL SCROLL SVG */}
            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}
            >
              <path
                d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                stroke="#000000"
                strokeWidth="1"
              ></path>
              <path d="M12 6V14" stroke="#000000" strokeWidth="1"></path>
              <path
                d="M15 11L12 14L9 11"
                stroke="#000000"
                strokeWidth="1"
              ></path>
            </motion.svg>
          </div>
      {/* personal info */}
      
        </div>
       
      </div>
    </motion.div>
    </div>
  );
};

export default AboutPage;
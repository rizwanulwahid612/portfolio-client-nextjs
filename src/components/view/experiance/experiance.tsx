"use client";
import Brain from "@/components/brain";
import { useExperiancesQuery } from "@/redux/api/experianceApi";
import { useSkillsQuery } from "@/redux/api/skillApi";
import { motion, useInView, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import styletext from '../../styles/textcolor.module.css'
const ExperiancePage = () => {
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
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      {/* CONTAINER */}
      <div className="h-full overflow-scroll lg:flex" ref={containerRef}>
        {/* TEXT CONTAINER */}
        <div className=" flex flex-col   lg:w-2/3 lg:pr-0 xl:w-1/2">
     
        
          {/* EXPERIENCE CONTAINER */}
          <div
            className="flex flex-col gap-12 justify-center pb-8 pl-30"
            ref={experienceRef}
          >
            {/* EXPERIENCE TITLE */}
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: "0" } : {}}
              transition={{ delay: 0.2 }}
              className="font-bold text-2xl"
            >
                <h1 className={styletext.gradienttext}>
              EXPERIENCE
              </h1>
            </motion.h1>
            {/* EXPERIENCE LIST */}
            <motion.div
              initial={{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: "0" } : {}}
              className=""
            >
              {/* EXPERIENCE LIST ITEM */}
              {exp?.experiance?.map((exper:any)=>{
                return(
                  <>
                  <div className="flex justify-between h-48">
                {/* LEFT */}
                <div className="w-1/3 ">
                  {/* JOB TITLE */}
                  <div className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                    {exper?.title}
                  </div>
                  {/* JOB DESC */}
                  <div className="p-3 text-sm italic">
                   {exper?.description}.{" "}
                  </div>
                 
                  {/* JOB DATE */}
                  <div className="p-3 text-red-400 text-sm font-semibold">
                    {exper?.startdate} - {exper?.enddate}
                  </div>
                  
                  {/* JOB COMPANY */}
                  <div className="p-1 rounded bg-white text-sm font-semibold w-fit">
                    {exper?.company}
                  </div>
                </div>
                {/* CENTER */}
                <div className="w-1/6 flex justify-center">
                  {/* LINE */}
                  <div className="w-1 h-full bg-gray-600 rounded relative">
                    {/* LINE CIRCLE */}
                    <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
                  </div>
                </div>
                {/* RIGHT */}
                <div className="w-1/3 "></div>
              </div>
              </>
                )
              })}
              
            
            </motion.div>
          </div>
        </div>
        {/* SVG CONTAINER */}
        <div className="hidden lg:block w-1/3 sticky top-0 z-30 xl:w-1/2">
          <Brain scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </motion.div>
  );
};

export default ExperiancePage;
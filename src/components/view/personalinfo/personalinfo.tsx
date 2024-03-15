/* eslint-disable react/jsx-key */
"use client";

import { useAchivementsQuery } from "@/redux/api/achivementApi";
import { useExperiancesQuery } from "@/redux/api/experianceApi";
import { useSkillsQuery } from "@/redux/api/skillApi";
import { motion, useInView, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import styletext from '../../styles/textcolor.module.css'
import { useUsersQuery } from "@/redux/api/userApi";
const Personalinfo = () => {
  const containerRef = useRef() as any;

  const { scrollYProgress } = useScroll({ container: containerRef } as {container:any});

  const skillRef = useRef() as any;
  // const isSkillRefInView = useInView(skillRef, {once:true});
  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });

  const experienceRef = useRef() as any;
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });
  const {data}=useSkillsQuery([])
 const { data:adminsd } = useUsersQuery([]);
  console.log("data:",adminsd)
  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
        <>
      {/* CONTAINER */}
      {/* <div className="h-full overflow-scroll lg:flex" ref={containerRef}> */}
        {/* TEXT CONTAINER */}
        <div className=" p-4 sm:p-8 md:p-8 lg:p-12 xl:p-8 flex flex-col gap-24 md:gap-24 lg:gap-24 xl:gap-24 lg:w-2/3 lg:pr-0 xl:w-1/2">
     
        
          {/* EXPERIENCE CONTAINER */}
          <div
            className="flex flex-col gap-12 justify-center pb-4 pl-30"
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
               PERSONAL <br/><span style={{marginTop:"14px"}}></span>INFO
              </h1>
            </motion.h1>
            {/* EXPERIENCE LIST */}
            <motion.div
              initial={{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: "0" } : {}}
              className=""
            >
       
              {/* EXPERIENCE LIST ITEM */}
              {adminsd?.users?.map((exper:any)=>{
                return(
                  <>
                  <div className="flex justify-between h-44">
                {/* LEFT */}
                <div  className="w-1/3 ">
                  {/* category */}
                   <div style={{marginTop:"14px",width:"120px"}} className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Name:{exper?.name}
                  </div>
                  <div style={{marginTop:"14px",width:"120px"}} className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Fathers Name:{exper?.fathersname}
                  </div>
                  <div style={{marginTop:"14px",width:"120px"}} className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                   Mothers Name: {exper?.mothersname}
                  </div>
                     <div style={{marginTop:"14px",width:"120px"}} className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Birth Date:{exper?.fathersname}
                  </div>
                  <div style={{marginTop:"14px",width:"120px"}} className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                   Blood Group: {exper?.mothersname}
                  </div>
                     <div style={{marginTop:"14px",width:"120px"}} className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Gender:{exper?.gender}
                  </div>
                  <div style={{marginTop:"14px",width:"120px"}} className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                   Height: {exper?.height}
                  </div>
                     <div style={{marginTop:"14px",width:"120px"}} className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                    Weight:{exper?.weight}
                  </div>
                  <div style={{marginTop:"14px",width:"120px"}} className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                   SSC PASS: {exper?.ssc}
                  </div>
                     <div style={{marginTop:"14px",width:"120px"}} className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                  HSC PASS:{exper?.hsc}
                  </div>
                  <div style={{marginTop:"14px",width:"120px"}} className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                  NID: {exper?.nid}
                  </div>
                     <div style={{marginTop:"14px",width:"120px"}} className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                   Married Status:{exper?.marriedstatus}
                  </div>
                  <div style={{marginTop:"14px",width:"120px"}} className="bg-white p-3 font-semibold rounded-b-lg rounded-s-lg">
                   Permanent Address: {exper?.parmanentaddress}
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
    
      {/* </div> */}
      </>
    </motion.div>
  );
};

export default Personalinfo;
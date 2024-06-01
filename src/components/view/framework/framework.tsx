/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { useFrameworksQuery } from "@/redux/api/frameworkApi"
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styletext from '../../styles/textcolor.module.css'
import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";
import AchivementPage from "../achivement/achivement";
const Framework = () => {
  const query: Record<string, any> = {};
  const { data, isLoading } = useFrameworksQuery([])
  const ref = useRef() as any;
  const { scrollYProgress } = useScroll({ target: ref } as { target: any });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div >
      <motion.div
        className="h-full"
        initial={{ y: "-200vh" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1 }}
      >
        <div className="h-[150vh] relative" ref={ref}>
          <div className="w-screen h-[calc(30vh - 1rem)] flex items-center justify-center text-6xl text-center">
            <h4 className={styletext.gradienttext}>
              Frameworks || Libraries
            </h4>

          </div>
          <div className="sticky top-0 flex h-screen gap-4 items-center overflow-hidden">
            <motion.div style={{ x }} className="flex">
              <div className="h-screen w-screen flex items-center justify-center" />
              {data?.frameworks?.map((item: any) => (
                <div
                  className={`h-screen w-screen flex items-center justify-center`}
                  key={item?._id}
                >
                  <div className="flex flex-col gap-2 text-black">
                    <h4 className="text-xl font-bold md:text-6xl lg:text-6xl xl:text-6xl">
                      <h4 className={styletext.gradienttext}>
                        {item?.category}
                      </h4>

                    </h4>
                    <div className="relative w-80 h-56 md:w-96 md:h-64 lg:w-[500px] lg:h-[350px] xl:w-[600px] xl:h-[420px]">
                      <Image src={item.image} alt="" fill />

                    </div>
                    <Link href={`/project/${item?.category}`} className="flex justify-center">
                      <Button style={{ width: "100%" }} type="primary">See Project Details</Button>
                    </Link>
                    <h1 className="w-80 md:w96 lg:w-[500px] lg:text-lg xl:w-[600px]">
                      {item.description}
                    </h1>

                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </motion.div>
    </div>
  )
}

export default Framework
"use client"
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";

import { USER_ROLE } from "@/constants/role";

import { useAddReviewMutation } from "@/redux/api/reviewApi";

import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Button, Card, Col, Row,message } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useFrameworkQuery } from "@/redux/api/frameworkApi";
import { useAchivementQuery } from "@/redux/api/achivementApi";

// eslint-disable-next-line @next/next/no-async-client-component
const SingleAvailableServicePublic =  ({ params }: any) => {
useEffect(()=>{
      const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.USER){
         redirect('/login')
    }
  },[])
const { data, isLoading: loading } = useAchivementQuery(params?.id);


   console.log(data)
 
  return (
<div>
   <EMBreadCrumb
        items={[
          {
            label: "Achivement",
            link: "/user/achivement",
          },
         
         
        ]}
      />

  <Col   xs={24} sm={12} md={24} lg={24} xl={24} key={data?._id} style={{ margin: "0" }}>
  <Card
     hoverable
          style={{ width: "100%", justifyContent: 'center', display: 'block' }}
           cover={<Image alt="example" src={data?.certificate} width={300} height={500} />}
  >
    <div style={{display:'block',justifyContent:'space-between'}}>
    <div style={{ flex: 1 }}> 
   
     </div>
    
    <div style={{ flex: 1,margin:"0" }}> 
    <Meta title={data?.category} />
    <p>Get: {data?.get}</p>
    <p>Description: {data?.description}</p>
    <p>Date: {data?.date}</p>

    </div> 
   </div>
  </Card>
</Col>
 </div>
 
  );
};

export default SingleAvailableServicePublic;



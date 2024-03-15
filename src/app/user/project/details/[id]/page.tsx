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
import { useProjectQuery } from "@/redux/api/projectApi";

// eslint-disable-next-line @next/next/no-async-client-component
const SingleProject =  ({ params }: any) => {
useEffect(()=>{
      const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.USER){
         redirect('/login')
    }
  },[])
const { data, isLoading: loading } = useProjectQuery(params?.id);


   console.log(data)
 
  return (
<div>
   <EMBreadCrumb
        items={[
          {
            label: "Project",
            link: "/user/project",
          },
         
         
        ]}
      />

  <Col   xs={24} sm={12} md={24} lg={24} xl={24} key={data?._id} style={{ margin: "0" }}>
  <Card
     hoverable
          style={{ width: "100%", justifyContent: 'center', display: 'block' }}
           cover={<Image alt="example" src={data?.image} width={300} height={500} />}
  >
    <div style={{display:'block',justifyContent:'space-between'}}>
    <div style={{ flex: 1 }}> 
   
     </div>
    
    <div style={{ flex: 1,margin:"0" }}> 
   
    <Meta title={data?.category} />
     <p>Name: {data?.name}</p>
    <p>Description: {data?.description}</p>
     <p>Title: {data?.title}</p>
    <p>Frontend: {data?.frontend}</p>
    <p>Backend: {data?.backend}</p>
  <p>Techonology: {data?.techonology}</p>
    <p>Ownername: {data?.ownername}</p>
     <p>Git Client: {data?.gitClient}</p>
    <p>Git Server: {data?.gitServer}</p>
    <p>Live Project: {data?.liveproject}</p>
  <p>Live Server: {data?.liveServer}</p>
   <p>VideoLink: {data?.videoLink}</p>
 
    </div> 
   </div>
  </Card>
</Col>
 </div>
 
  );
};

export default SingleProject;



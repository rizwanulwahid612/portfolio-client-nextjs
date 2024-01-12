/* eslint-disable @next/next/no-img-element */
"use client"
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import ReviewTable from "@/components/ui/ReviewTable/ReviewTable";
import { USER_ROLE } from "@/constants/role";
import { useAddBookingDataMutation } from "@/redux/api/bookingApi";
import { useAddReviewMutation } from "@/redux/api/reviewApi";
import { useServiceQuery } from "@/redux/api/serviceApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Button, Card, Col, Row,message } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

// eslint-disable-next-line @next/next/no-async-client-component
const SingleAvailableServicePublic =  ({ params }: any) => {
 useEffect(()=>{
    const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.CUSTOMER){
         redirect('/login')
    }
  },[])
const { data, isLoading: loading } = useServiceQuery(params?.id);


   console.log(data)
  console.log(data)
   console.log(data?.reviewIds)
   const reviewIds=data?.reviewIds?.map((revId: any)=>revId)
   console.log(reviewIds,data?._id)
  
  return (
    <div>
   <EMBreadCrumb
        items={[
          {
            label: "service",
            link: "/customer/category",
          },
        ]}
      />
  <div>
  <Row gutter={6} style={{margin:0}} >
   
  <Col  span={16}  key={data?.id} style={{margin:0}}>
  <Card
    title={''}
    hoverable
     
      cover={<Image alt="example" src={data?.profileImage} width={600} height={400}/>}
  >
    <div style={{display:'block',justifyContent:'space-between'}}>
    <div style={{ flex: 1 }}> 
   
     </div>
    
    <div style={{ flex: 1,margin:"0" }}> 
    <Meta title={data?.name} />
    <p>Description: {data?.details}</p>
    </div> 
   </div>
  </Card>
</Col>
    
  </Row>
 </div>

 <ReviewTable categoryId={data?._id} reviewIds={reviewIds}/>
  </div>
  );
};

export default SingleAvailableServicePublic;



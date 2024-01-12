"use client"
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import ReviewTable from "@/components/ui/ReviewTable/ReviewTable";
import { USER_ROLE } from "@/constants/role";
import { apointmentdaysInWeeks } from "@/constants/selectConstantOptions";
import { useAddBookingDataMutation } from "@/redux/api/bookingApi";
import { useCategoryQuery, useUpdateCategoryMutation } from "@/redux/api/categoryApi";
import { useAddReviewMutation } from "@/redux/api/reviewApi";
import { useServiceQuery, useUpdateServiceMutation } from "@/redux/api/serviceApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Button, Card, Col, Row,message } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

// eslint-disable-next-line @next/next/no-async-client-component
const EditAvailableServicePublic = ({ params }: any) => {
  useEffect(()=>{
      const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.ADMIN){
         redirect('/login')
    }
  },[])
  const { data, isLoading: loading } = useCategoryQuery(params?.id);
 
console.log(data)

const [updateCategory] = useUpdateCategoryMutation();
  const onSubmit = async (values: any) => {
    try {
      const res = await updateCategory({ id: params?.id, body: values }).unwrap();
      // console.log(res);
      if (res?.id) {
        message.success("Successfully Updated!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
 const defaultValues = {
   
    name: data?.name,
    profileImage: data?.profileImage,
    details: data?.details,
    location:data?.location,
    price:data?.price,
    startTime:data?.startTime,
    endTime:data?.endTime,
    apointmentdaysInWeek:data?.apointmentdaysInWeek,
   
  
  };
  console.log(defaultValues)
  return (
    <div>
       <EMBreadCrumb
        items={[
          {
            label: "service",
            link: "/admin/category",
          },

        ]}
      />

      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="name" label="name" />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="profileImage" label="profileImage" />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="details" label="details" />
          </Col>
        </Row>
         <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="location" label="location" />
          </Col>
        </Row>
         <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="price" label="price" />
          </Col>
        </Row>
         <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="startTime" label="startTime" />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="endTime" label="endTime" />
          </Col>
        </Row>
         <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormSelectField name="apointmentdaysInWeek" options={apointmentdaysInWeeks} label="apointmentdaysInWeek" />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
// {/* <div>
  
//   <div style={{display:'flex',justifyContent:'space-between',marginBottom:'20px',width:'100%'}}>
//   <Row gutter={6} style={{margin:0}} >
   
//   <Col  span={16}  key={data?.id} style={{margin:0}}>
//   <Card
//     title={''}
//     hoverable
//      style={{ width:"50vw",justifyContent:'flex-start',display:'flex'}}  
//   >
//     <div style={{display:'block',justifyContent:'space-between'}}>
//     <div style={{ flex: 1 }}> 
//     {/* <Image alt="example" src={data?.profileImage} width={600} height={300}/> */}
//     <Image alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" width={600} height={300}/>
//      </div>
    
//     <div style={{ flex: 1,margin:"0" }}> 
//     <Meta title={data?.name} />
//     <p>Description: {data?.details}</p>
//     </div> 
//    </div>
//   </Card>
// </Col>
    
//   </Row>
//  </div>
//   </div> */}
  );
};

export default EditAvailableServicePublic;



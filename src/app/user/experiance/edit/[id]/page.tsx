"use client"
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
//import ReviewTable from "@/components/ui/ReviewTable/ReviewTable";
import { USER_ROLE } from "@/constants/role";
import { selectorFrameworkOptions } from "@/constants/selectConstantOptions";
import { useExperianceQuery, useUpdateExperianceMutation } from "@/redux/api/experianceApi";
//import { useAddBookingDataMutation } from "@/redux/api/bookingApi";
import { useFrameworkQuery, useUpdateFrameworkMutation } from "@/redux/api/frameworkApi";
import { useAddReviewMutation } from "@/redux/api/reviewApi";
//import { useServiceQuery, useUpdateServiceMutation } from "@/redux/api/projectApi";
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
    if(!isLoggedIn || role !== USER_ROLE.USER){
         redirect('/login')
    }
  },[])
  const { data, isLoading: loading } = useExperianceQuery(params?.id);
 
console.log(data)

const [updateExperiance] = useUpdateExperianceMutation();
  const onSubmit = async (values: any) => {
    try {
      const res = await updateExperiance({ id: params?.id, body: values }).unwrap();
      // console.log(res);
      if (res?.id) {
        message.success("Successfully Updated!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
 const defaultValues = {
   
    title: data?.title,
    startdate: data?.startdate,
    description: data?.description,
    enddate:data?.enddate,
  present:data?.present,
  company:data?.company,
  };
  console.log(defaultValues)
  return (
    <div>
       <EMBreadCrumb
        items={[
          {
            label: "Framework",
            link: "/user/framework",
          },

        ]}
      />

      <Form submitHandler={onSubmit} defaultValues={defaultValues}> 
      
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
               Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Title"
                />
              </Col>
         
            </Row>
          </div>

          {/* basic info */}
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Basic Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        
          
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea
                  
                  name="description"
      
                  label="Description"
                  rows={4}
                />
              </Col>

              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
              
              </Col>
           
             
                <Col span={12} style={{ margin: "10px 0" }}>
                < FormInput
                  name="startdate"
                  label="Start Date"
                  type="text"
                />
              </Col>
              
                <Col span={12} style={{ margin: "10px 0" }}>
                < FormInput
                  name="enddate"
                  label="End Date"
                  type="text"
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                < FormInput
                  name="present"
                  label="Present"
                  type="text"
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                < FormInput
                  name="company"
                  label="Company Name"
                  type="text"
                />
              </Col>
            </Row>
          </div>
       
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>

  );
};

export default EditAvailableServicePublic;



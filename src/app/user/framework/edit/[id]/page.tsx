"use client"
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
//import ReviewTable from "@/components/ui/ReviewTable/ReviewTable";
import { USER_ROLE } from "@/constants/role";
import { selectorFrameworkOptions } from "@/constants/selectConstantOptions";
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
  const { data, isLoading: loading } = useFrameworkQuery(params?.id);
 
console.log(data)

const [updateFramework] = useUpdateFrameworkMutation();
  const onSubmit = async (values: any) => {
    try {
      const res = await updateFramework({ id: params?.id, body: values }).unwrap();
      // console.log(res);
      if (res?.id) {
        message.success("Successfully Updated!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
 const defaultValues = {
   
    image: data?.image,
    category: data?.category,
    description: data?.description,
    rating:data?.rating
  
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
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                
                  name="category"
                  size="large"
                  options={selectorFrameworkOptions}
                  label="Category"
                  
                />
              </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="image" label="Image" />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="description" label="Description" />
          </Col>
        </Row>
         <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="rating" label="Rating" />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>

  );
};

export default EditAvailableServicePublic;



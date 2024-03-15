"use client"
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
//import ReviewTable from "@/components/ui/ReviewTable/ReviewTable";
import { USER_ROLE } from "@/constants/role";
import { selectorFrameworkOptions } from "@/constants/selectConstantOptions";
//import { useAddBookingDataMutation } from "@/redux/api/bookingApi";
import { useFrameworkQuery, useUpdateFrameworkMutation } from "@/redux/api/frameworkApi";
import { useProjectQuery, useUpdateProjectMutation } from "@/redux/api/projectApi";
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
const EditProject = ({ params }: any) => {
  useEffect(()=>{
      const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.USER){
         redirect('/login')
    }
  },[])
  const { data, isLoading: loading } = useProjectQuery(params?.id);
 
console.log(data)

const [updateProject] = useUpdateProjectMutation();
  const onSubmit = async (values: any) => {
    try {
      const res = await updateProject({ id: params?.id, body: values }).unwrap();
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
    name:data?.name,
    title:data?.title,
    category: data?.category,
    frontend:data?.frontend,
    backend:data?.backend,
    description: data?.description,
    techonology: data?.techonology,
    ownername: data?.ownername,
    gitClient:data?.gitClient,
    gitServer:data?.gitServer,
    liveproject:data?.liveproject,
    liveServer:data?.liveServer,
    videoLink:data?.videoLink
  };
  console.log(defaultValues)
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
                  name="image"
                  size="large"
                  label="Image"
                />
              </Col>
               <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="name"
                  size="large"
                  label="Name"
                />
              </Col>
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
               <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="ownername"
                  size="large"
                  label="Owner Name"
                />
              </Col>
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
           <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="frontend"
                  size="large"
                  label="Frontend"
                />
              </Col>
                  <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="backend"
                  size="large"
                  label="Backend"
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
                <FormTextArea
                  
                  name="techonology"
      
                  label="Techonology"
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
                <FormInput
                  type="text"
                  name="gitClient"
                  size="large"
                  label="Git Client"
                />
              </Col>
               <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="gitServer"
                  size="large"
                  label="Git Server"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="liveproject"
                  size="large"
                  label="Live Project"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="liveServer"
                  size="large"
                  label="Live Server"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="videoLink"
                  size="large"
                  label="Video Link"
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
           
      
            </Row>
          </div>
          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </Form>
    </div>

  );
};

export default EditProject;



"use client";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { USER_ROLE } from "@/constants/role";
//import UploadImage from "@/components/ui/UploadImage.tsx/UploadImage";
import { selectBloodGroupOptions, selectorFrameworkOptions, selectorGenderOptions } from "@/constants/selectConstantOptions";
import { useAddAchivementDataMutation } from "@/redux/api/achivementApi";
import { useAddFrameworkMutation } from "@/redux/api/frameworkApi";
//import { useAddCategoryMutation } from "@/redux/api/frameworkApi";
//import { useAddServiceMutation } from "@/redux/api/projectApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";
import { redirect } from "next/navigation";
import { useEffect } from "react";



const CreateServicePage = () => {
useEffect(()=>{
      const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.USER){
         redirect('/login')
    }
  },[])
  const [addAchivementData] = useAddAchivementDataMutation();

  const onSubmit = async (values: any) => {
    // console.log(values)
    // const obj = { values };
    //const file = obj["file"];
    //delete obj["file"];
   // const data = JSON.stringify(obj);
    // const formData = new FormData();
    // console.log(formData)
    //formData.append("file", file as Blob);
    // formData.append("data", data);
     message.loading("Creating...");
    try {
      // await addAdminData(formData);
      // console.log(formData)
      console.log(values)
        await addAchivementData(values);
      //console.log(addService(values))
      message.success(" created successfully!");
    }catch(error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
// //@ts-ignore
//   const defaultValues = {   
// role:"Service",

 
//   };

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
      <h1>Create Achivement</h1>

      <div>
        <Form submitHandler={onSubmit}>
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
                  name="category"
                  size="large"
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
                  name="certificate"
                  size="large"
                  label="Certificate"
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
                  name="date"
                  label="Date"
                  type="text"
                />
              </Col>
                <Col span={12} style={{ margin: "10px 0" }}>
                < FormInput
                  name="get"
                  label="Get"
                  type="text"
                />
              </Col>
            </Row>
          </div>
          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateServicePage;
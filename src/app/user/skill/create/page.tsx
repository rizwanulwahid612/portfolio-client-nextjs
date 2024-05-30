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
import { useAddFrameworkMutation } from "@/redux/api/frameworkApi";
import { useAddSkillDataMutation } from "@/redux/api/skillApi";
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
  const [addSkillData] = useAddSkillDataMutation();

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
        await addSkillData(values);
      //console.log(addService(values))
      message.success("Skill created successfully!");
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
            label: "Skills",
            link: "/user/skill",
          },
          
        ]}
      />
      <h1>Create Skill</h1>

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
             
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
             
              
            <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
               < FormInput
                  name="name"
                  label="Name"
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
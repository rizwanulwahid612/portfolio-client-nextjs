"use client";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { USER_ROLE } from "@/constants/role";
import { selectBloodGroupOptions, selectorGenderOptions } from "@/constants/selectConstantOptions";
import { useAddUserDataMutation } from "@/redux/api/userApi";
//import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { adminSchema } from "@/schemas/admin";

import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const RegistrationPage = () => {
  const [addUserData] =   useAddUserDataMutation();
  //@ts-ignore

  const onSubmit = async (values: any) => {
    console.log(values)
    const obj = { ...values };
     message.loading("Creating...");
    try {
        await addUserData(obj);
      console.log(obj)
      message.success("User created successfully!");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
  
    <div>
      
      <div style={{display:"flex",justifyContent:"center",margin:"20px"}}>
<h1>Registration Here</h1>
      </div>
      

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
              User Information
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
                  type="email"
                  name="email"
                  size="large"
                  label="Email address"
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
                  name="facebook"
                  size="large"
                  label="Facebook"
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
                  name="youtube"
                  size="large"
                  label="YouTube"
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
                  name="discord"
                  size="large"
                  label="Discord"
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
                  name="twitter"
                  size="large"
                  label="Twitter"
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
                  name="instagram"
                  size="large"
                  label="Instagram"
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
                  name="tools"
                  label="Tools"
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
                  name="language"
                  size="large"
                  label="Language"
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
                  name="contact"
                  size="large"
                  label="Contact No."
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
                  type="password"
                  name="password"
                  size="large"
                  label="Password"
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
                  name="image"
                  size="large"
                  label="profileImage"
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
                 <FormTextArea
                  name="skills"
                  label="Skills"
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
                  name="gender"
                  size="large"
                  label="gender"
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
                  name="aboutme"
                  label="About Me"
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
                  name="fathersname"
                  label="Father's Name"
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
                  name="mothersname"
                  label="Mother's Name"
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
                  name="marriedstatus"
                  label="Married Status"
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
                  name="nid"
                  label="NID"
                 rows={1}
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormDatePicker
                  name="birth"
                  label="Date of birth"
                  size="large"
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
                  size="large"
                  name="blood"
                  options={selectBloodGroupOptions}
                  label="Blood group"
                  placeholder="Select"
                />
              </Col>
               <Col  className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormTextArea
                  name="height"
                  label="Height"
                  rows={1}
                />
              </Col>
               <Col  className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormTextArea
                  name="weight"
                  label="Weight"
                  rows={1}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="ssc"
                  label="SSC"
                 rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="hsc"
                  label="HSC"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="institute"
                  label="University Name"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="degree"
                  label="Degree"
                  rows={4}
                />
              </Col>
              <Col className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }} >
                <FormDatePicker
                  name="passingyear"
                  label="Passing Year"
                  size="large"
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="masters"
                  label="Masters"
                  rows={4}
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="phd"
                  label="PHD"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="presentaddress"
                  label="Present address"
                  rows={4}
                />
              </Col>

              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="parmanentaddress"
                  label="Permanent address"
                  rows={4}
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="frontend"
                  label="Frontend"
                  rows={4}
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="backend"
                  label="Backend"
                  rows={4}
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="linkedin"
                  label="LinkedIn"
                  
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="whatsapp"
                  label="Whatsapp"
            
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="github"
                  label="Github"
                  
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="website"
                  label="Website"
                
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience1"
                  label="Experience:1"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience2"
                  label="Experience:2"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience3"
                  label="Experience:3"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience4"
                  label="Experience:4"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience5"
                  label="Experience:5"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience6"
                  label="Experience:6"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience7"
                  label="Experience:7"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience8"
                  label="Experience:8"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience9"
                  label="Experience:9"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="experience10"
                  label="Experience:10"
                  rows={4}
                />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="extracurriculam"
                  label="Extra curriculam"
                  rows={4}
                />
              </Col>
               <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="achivement"
                  label="Achivement"
                  rows={4}
                />
              </Col>
            </Row>
          </div>
          <Button htmlType="submit" type="primary">
            Registration
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationPage;
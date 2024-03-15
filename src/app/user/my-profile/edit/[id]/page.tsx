"use client"
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
//import ReviewTable from "@/components/ui/ReviewTable/ReviewTable";
import { USER_ROLE } from "@/constants/role";
import { selectBloodGroupOptions, selectorFrameworkOptions } from "@/constants/selectConstantOptions";
//import { useAddBookingDataMutation } from "@/redux/api/bookingApi";
import { useFrameworkQuery, useUpdateFrameworkMutation } from "@/redux/api/frameworkApi";
import { useAddReviewMutation } from "@/redux/api/reviewApi";
import { useUpdateUserMutation, useUserQuery } from "@/redux/api/userApi";
//import { useServiceQuery, useUpdateServiceMutation } from "@/redux/api/projectApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Button, Card, Col, Row,message } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

// eslint-disable-next-line @next/next/no-async-client-component
const EditMyProfile = ({ params }: any) => {
  useEffect(()=>{
      const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.USER){
         redirect('/login')
    }
  },[])
  const { data, isLoading: loading } = useUserQuery(params?.id);
 
console.log(data)

const [updateUser] = useUpdateUserMutation();
  const onSubmit = async (values: any) => {
    try {
      const res = await updateUser({ id: params?.id, body: values }).unwrap();
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
  email: data?.email,
  facebook:data?.facebook,
  youtube:data?.youtube,
  instagram:data?.instagram,
  tools:data?.tools,
  discord:data?.discord,
  language: data?.language,
  gender: data?.gender,
  contact: data?.contact,
  image: data?.image,
  title: data?.title,
  skills: data?.skills,
  aboutme: data?.aboutme,
  fathersname: data?.fathersname,
  mothersname: data?.mothersname,
  marriedstatus: data?.marriedstatus,
  nid: data?.nid,
  birth:data?.birth,
  blood: data?.blood,
  height: data?.height,
  weigth: data?.weigth,
  ssc: data?.ssc,
  hsc: data?.hsc,
  institute:data?.institute,
  degree:data?.degree,
  passingyear: data?.passingyear,
  masters:data?.masters,
  phd: data?.phd,
  presentaddress: data?.presentaddress,
  parmanentaddress: data?.parmanentaddress,
  frontend: data?.frontend,
  backend: data?.backend,
  linkedin: data?.linkedin,
  whatsapp: data?.whatsapp,
  github: data?.github,
  website: data?.website,
  twitter:data?.twitter,
  experience1: data?.experience1,
  experience2: data?.experience2,
  experience3: data?.experience3,
  experience4:data?.experience4,
  experience5: data?.experience5,
  experience6: data?.experience6,
  experience7: data?.experience7,
  experience8:data?.experience8,
  experience9: data?.experience9,
  experience10: data?.experience10,
  extracurriculam: data?.extracurriculam,
  achivement:data?.achivement,
  
  };
  console.log(defaultValues)
  return (
   <div>
      
      <div style={{display:"flex",justifyContent:"center",margin:"20px"}}>
<h1>User Update Form</h1>
      </div>
      

      <div>
         <EMBreadCrumb
        items={[
          {
            label: "User",
            link: "/user/my-profile",
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
          <Button type="primary" htmlType="submit">
          Update
        </Button>
        </Form>
      </div>
    </div>

  );
};

export default EditMyProfile;



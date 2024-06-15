"use client"

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { USER_ROLE } from "@/constants/role";
import { selectBloodGroupOptions, selectorGenderOptions } from "@/constants/selectConstantOptions";
import {  useAddContactMutation, useAddUserDataMutation } from "@/redux/api/userApi";
//import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { adminSchema } from "@/schemas/admin";
import { motion } from "framer-motion";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

import styletext from "../../styles/textcolor.module.css"

const ContactPage = () => {
  const [addContact] =   useAddContactMutation();
  //@ts-ignore
const text = "Say Hello";
  const onSubmit = async (values: any) => {
    console.log(values)
    const obj = { ...values };
     message.loading("Sending...");
    try {
        await addContact(obj);
      console.log(obj)
      message.success("Message Send successfully!");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
  
    <div className= {styletext.gradienbg}>
      
      <div style={{color:"white",display:"flex",justifyContent:"flex-start",margin:"20px"}}>
      
<h3 className="text-4xl">
   <h3 className={styletext.gradienttext}>
  Contact Form
  </h3>
  </h3>
      </div>
       <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
        {/* TEXT CONTAINER */}
        <div className="h-1/2 lg:h-full lg:w-1/2 flex items-center justify-center text-4xl">
          <div style={{color:"white"}}>
            {text.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}
              >
                {letter}
              </motion.span>
            ))}
             😊
          </div>
         </div>
         {/* FORM CONTAINER */}
  
       </div>
     </motion.div>
      <div style={{color:"white"}}>
        <Form submitHandler={onSubmit}>
          <div
          
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
              justifyContent:"center"
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
              Description
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 32, lg: 32 }}>
             
            
             <Col
                className="gutter-row"
                span={16}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea
                  name="description"
                  label="Please write your comments"
                  rows={4}
                />
              </Col>
            
          
            </Row>
          </div>
          <Button style={{width:"100%",height:"50px",marginTop:"50px"}} htmlType="submit" type="primary">
            Send
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ContactPage;









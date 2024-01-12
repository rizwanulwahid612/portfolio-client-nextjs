"use client";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { USER_ROLE } from "@/constants/role";
//import UploadImage from "@/components/ui/UploadImage.tsx/UploadImage";
import { apointmentdaysInWeeks, selectBloodGroupOptions, selectorGenderOptions } from "@/constants/selectConstantOptions";
import { useAddCategoryMutation } from "@/redux/api/categoryApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const CreateCategoryPage = () => {
useEffect(()=>{
      const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.ADMIN){
         redirect('/login')
    }
  },[])
  const [categoryIds, setCategoryIds] = useState([""]);
  const addCategoryId = () => {
    setCategoryIds([...categoryIds, ""]);
  };
  const [addCategory] = useAddCategoryMutation();

  const onSubmit = async (values: any) => {
    console.log(values)
    const obj = { ...values };
   
     message.loading("Creating...");
    try {
      // await addAdminData(formData);
      // console.log(formData)
      console.log(obj)
        await addCategory(obj);
      //console.log(addCategory(obj))
      message.success(" created successfully!");
    }catch(error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
//@ts-ignore
  const defaultValues = {   
role:"service",
categoryIds:['']
 
  };
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
      <h1>Create Service</h1>

      <div>
        <Form submitHandler={onSubmit}defaultValues={defaultValues} >
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
                  name="name"
                  size="large"
                  label="Name"
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
           {categoryIds.map((categoryId, index) => (
              <Col span={24} style={{ margin: "0" }} key={index}>
                <FormInput
                  name={`categoryIds[${index}]`}
                  size="large"
                  label={`Category ID ${index + 1}`}
                />
              </Col>
            ))}
            <Col span={24} style={{ margin: "0" }}>
              <Button type='primary' onClick={addCategoryId}>
                Add Category ID
              </Button>
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
                  name="price"
                  size="large"
                  label="Price"
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
                  name="profileImage"
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
                <FormSelectField
                  options={apointmentdaysInWeeks}
                  name="apointmentdaysInWeek"
                  size="large"
                  label="apointmentdaysInWeek"
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
                  name="location"
                  label="Location"
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
                  name="startTime"
                  size="large"
                  label="Start Time"
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
                  name="endTime"
                  size="large"
                  label="End Time"
                />
              </Col>
                <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="details"
                  label="Details"
                  rows={4}
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

export default CreateCategoryPage;
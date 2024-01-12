"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { USER_ROLE } from "@/constants/role";
import { selectBloodGroupOptions, selectorGenderOptions } from "@/constants/selectConstantOptions";
import { useAdminQuery, useUpdateAdminMutation } from "@/redux/api/adminApi";
import { useBlogQuery, useUpdateBlogMutation } from "@/redux/api/blogApi";
import { useCustomerQuery, useUpdateCustomerMutation } from "@/redux/api/customerApi";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { IDepartment } from "@/types";

import { Button, Col, Row, message } from "antd";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const EditBlogPage = ({ params }: any) => {
  useEffect(()=>{
      const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.ADMIN){
         redirect('/login')
    }
  },[])
  const { data: cData, isLoading: loading } = useBlogQuery(params?.id);
     console.log(cData);
  const [updateBlog] = useUpdateBlogMutation();

  const onSubmit = async (values: any) => {
    try {
      const res = await updateBlog({ id: params?.id, body: values }).unwrap();
       message.success(" Successfully Updated!");
      if (res?.id) {
        message.success(" Successfully Updated!");
      }
    } catch (err: any) {
      console.error(err.message);
      message.error("Not Updated!");
    }
  };

 const defaultValues = {
    
    imagepost:cData?.imagepost || "",
    comment:cData?.comment || "",
    }
  
  return (
    
    <div>
      <EMBreadCrumb
        items={[
          {
            label: "blogPage",
            link: "/admin/blogPage",
          },
       
        ]}
      />
      <h1>Edit Blog {params?.id}</h1>

      <div>
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
                  name="imagepost"
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
                  name="comment"
                  size="large"
                  label="Comment"
                />
              </Col>
           
            </Row>
          </div>

          
          <Button htmlType="submit" type="primary">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditBlogPage;
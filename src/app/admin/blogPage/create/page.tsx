"use client";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { USER_ROLE } from "@/constants/role";
//import UploadImage from "@/components/ui/UploadImage.tsx/UploadImage";
import { selectBloodGroupOptions, selectorGenderOptions } from "@/constants/selectConstantOptions";
import { useAdminsQuery } from "@/redux/api/adminApi";
import { useAddBlogMutation } from "@/redux/api/blogApi";
import { useAddCategoryMutation } from "@/redux/api/categoryApi";
import { useAddServiceMutation } from "@/redux/api/serviceApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";
import { useEffect } from "react";
import { redirect } from "next/navigation";


const CreateBlogPage = () => {

  const [addBlog] = useAddBlogMutation();
useEffect(()=>{
    const {role,userId}=getUserInfo() as any;
    if(!isLoggedIn || role !== USER_ROLE.ADMIN){
         redirect('/login')
    }
  },[])
  
  const query: Record<string, any> = {};
  const { data, isLoading } = useAdminsQuery({ ...query });
  
  const admins:any = data?.admins.map(dam=>dam?.id);
    console.log(admins)
  const {role,userId}=getUserInfo() as any;

const adminsd: any = data?.admins?.map(dam => {
  if (dam?.id === userId) {
    return dam;
  }
}).filter(Boolean);

const adminID=adminsd?.map((adId:any)=>adId._id).join(' ');
  const onSubmit = async (values: any) => {
    
     message.loading("Creating...");
    try {
      
      console.log(values)
        await addBlog(values);
      //console.log(addBlog(values))
      message.success("Blog created successfully!");
    }catch(error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
// //@ts-ignore
//   const defaultValues = {   
// role:"Service",
const defaultValues = {
    adminId:adminID
    }
 
//   };
  return (
    <div>
      <EMBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin/my-profile",
          },
          {
            label: "blog",
            link: "/admin/blogPage",
          },
         
        ]}
      />
      <h1>Create Blog</h1>

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
              Blog Information
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
                  name="adminId"
                  size="large"
                  label="adminId"
                  
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
                <FormInput
                  type="text"
                  name="imagepost"
                  size="large"
                  label="imagepost"
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
                <FormTextArea
                  name="comment"
                  label="Details Post"
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

export default CreateBlogPage;
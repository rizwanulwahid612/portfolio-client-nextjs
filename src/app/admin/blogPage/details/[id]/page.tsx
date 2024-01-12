/* eslint-disable @next/next/no-img-element */
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
import { useBlogQuery } from "@/redux/api/blogApi";
import { useCustomerQuery, useUpdateCustomerMutation } from "@/redux/api/customerApi";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { IDepartment } from "@/types";

import { Button, Card, Col, Row, message } from "antd";
import Meta from "antd/es/card/Meta";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const BlogDetailsPage = ({ params }: any) => {
  useEffect(()=>{
      const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.ADMIN){
         redirect('/login')
    }
  },[])
  const { data: cData, isLoading: loading } = useBlogQuery(params?.id);
  
  console.log(cData)
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
     
    <div>
       <h1>Blog Details</h1>
       
            <Col span={8} key={cData?.adminId?.id} style={{ margin: 0 }}>
              <Card
                
                hoverable
                style={{ width: 700, justifyContent: 'center', display: 'flex' }}
              >
                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" width={400} height={300} />

                <Meta title=" Information" /> 
                <div style={{display:'flex',justifyContent:'flex-end',margin:"10px"}} ></div> 
               
        
{ ` `}
{` `}  
                <p>Admin Name: {` `}{cData?.adminId?.name.firstName}{` `}{cData?.adminId?.name?.middleName}{` `}{cData?.adminId?.name.lastName}</p>
                <p>imagepost: {` `}{cData?.imagepost}</p>
                <p>comment:{` `} {cData?.comment}</p>
                
                


              </Card>
            </Col>
         
    
      </div>
      
       <div>
     
      </div>
      
      
    </div>
  );
};

export default BlogDetailsPage;
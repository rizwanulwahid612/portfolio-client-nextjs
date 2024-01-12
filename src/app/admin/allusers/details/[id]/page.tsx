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
import { useCustomerQuery, useUpdateCustomerMutation } from "@/redux/api/customerApi";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { IDepartment } from "@/types";

import { Button, Card, Col, Row, message } from "antd";
import Meta from "antd/es/card/Meta";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const EditCustomerPage = ({ params }: any) => {
  useEffect(()=>{
      const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.ADMIN){
         redirect('/login')
    }
  },[])
  const { data: cData, isLoading: loading } = useCustomerQuery(params?.id);
  
  console.log(cData)
  return (
    
    <div>
      <EMBreadCrumb
        items={[
          {
            label: "allusers",
            link: "/admin/allusers",
          },
        ]}
      />
     
    <div>
       <h1>Customer Profile</h1>
        
            <Col span={8} key={cData?.id} style={{ margin: 0 }}>
              <Card
                
                hoverable
                style={{ width: 700, justifyContent: 'center', display: 'flex' }}
              >
                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" width={400} height={300} />

                <Meta title="Profile Information" /> 
                <div style={{display:'flex',justifyContent:'flex-end',margin:"10px"}} ><Link href={`/customer/my-profile/edit/${cData?.id}`}><Button type="primary">Edit</Button></Link></div> 
               
        
{ ` `}
{` `}
                <p>User Name: {` `}{cData?.name.firstName}{` `}{cData?.name.middleName}{` `}{cData?.name.lastName}</p>
                <p>Date Of Birth: {` `}{cData?.dateOfBirth}</p>
                <p>Gender:{` `} {cData?.gender}</p>
                <p>Blood Group: {` `}{cData?.bloodGroup}</p>
                <p>Email: {` `}{cData?.email}</p>
                <p>Contact No: {` `}{cData?.contactNo}</p>
                <p>Emer.Contact: {` `}{cData?.emergencyContactNo}</p>
                <p>Present Address: {` `}{cData?.presentAddress}</p>
                <p>Permanent Address: {` `}{cData?.permanentAddress}</p>
                


              </Card>
            </Col>
         
    
      </div>
      
       <div>
     
      </div>
      
      
    </div>
  );
};

export default EditCustomerPage;
"use client"
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { USER_ROLE } from "@/constants/role";
import { useAdminQuery } from "@/redux/api/adminApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Card, Col } from 'antd';
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const { Meta } = Card;
const AdminDetailsPage = ({ params }: any) => {
   useEffect(()=>{
    const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.SUPER_ADMIN){
         redirect('/login')
    }
  },[])
  const { data: adminData, isLoading: loading } = useAdminQuery(params?.id);
     console.log(adminData)
  
  return (
    <div>
      <EMBreadCrumb
        items={[
          {
            label: "All admin",
            link: "/super_admin",
          },
        ]}
      />
     
    <div>
       <h1>Admin Details</h1>
          
             <Col span={8} key={adminData?.id} style={{ margin: 0 }}>
              <Card
                
                hoverable
                style={{ width: 700, justifyContent: 'center', display: 'flex' }}
                cover={<Image alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" width={300} height={300} />}
              >
                <Meta title="Profile Information" /> 
                <div style={{display:'flex',justifyContent:'flex-end',margin:"10px"}} ></div> 
               
        
{ ` `}
{` `}
                <p>User Name: {` `}{adminData?.name.firstName}{` `}{adminData?.name.middleName}{` `}{adminData?.name.lastName}</p>
                <p>Date Of Birth: {` `}{adminData?.dateOfBirth}</p>
                <p>Gender:{` `} {adminData?.gender}</p>
                <p>Blood Group: {` `}{adminData?.bloodGroup}</p>
                <p>Email: {` `}{adminData?.email}</p>
                <p>Contact No: {` `}{adminData?.contactNo}</p>
                <p>Emer.Contact: {` `}{adminData?.emergencyContactNo}</p>
                <p>Present Address: {` `}{adminData?.presentAddress}</p>
                <p>Permanent Address: {` `}{adminData?.permanentAddress}</p>
                <p>Management Department: {` `}{adminData?.managementDepartment.title}</p>
                <p>Description: {` `}{adminData?.description}</p>
              </Card>
            </Col>
         
     
      </div>
      
      
       <div>
     
      </div>
      
      
    </div>
  );
};

export default AdminDetailsPage;

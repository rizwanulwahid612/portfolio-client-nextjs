"use client";
import { Button, Card, Col} from "antd";
import { useEffect } from "react";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { USER_ROLE } from "@/constants/role";
import { redirect } from "next/navigation";
import Meta from "antd/es/card/Meta";
import Image from "next/image";

import { useCustomersQuery} from "@/redux/api/customerApi";

import Link from "next/link";

const CustomerProfilePage =  () => {


  useEffect(()=>{
    const {role,userId}=getUserInfo() as any;
    if(!isLoggedIn || role !== USER_ROLE.CUSTOMER){
         redirect('/login')
    }
  },[])
  
  const query: Record<string, any> = {};
  const { data, isLoading } = useCustomersQuery({ ...query });
  
  const customers:any = data?.customer?.map((dam:any)=>dam?.id);
    console.log(customers)
  const {role,userId}=getUserInfo() as any;

const customersd: any = data?.customer?.map((dam:any) => {
  if (dam?.id === userId) {
    return dam;
  }
}).filter(Boolean);
console.log(customersd)
console.log(customersd?.map((vf:any)=>vf?.id));
 const customerNotification= customersd?.map((notif: { notification: any[]; })=>notif?.notification?.map(not=>not?.message))
 console.log(customerNotification)
 const deleteBookingHandler = async (id: string) => {
    console.log(id)
   
  };
 

  return (
    <div>
      <EMBreadCrumb
        items={[
          {
            label: "profile",
            link: "/customer/my-profile",
          },
        ]}
      />
     
    <div>
       <h1>Customer Profile</h1>
          {customersd?.map((admindata: any) => (
            <Col span={8} key={admindata?.id} style={{ margin: 0 }}>
              <Card
                
                hoverable
                style={{ width: 390, justifyContent: 'center', display: 'block' }}
                cover={<Image alt="example" src={admindata?.profileImage} width={300} height={300} />}
              >
                <Meta title="Profile Information" /> 
                <div style={{display:'flex',justifyContent:'flex-end',margin:"10px"}} ><Link href={`/customer/my-profile/edit/${admindata?.id}`}><Button type="primary">Edit</Button></Link></div> 
               
        
{ ` `}
{` `}
                <p>User Name: {` `}{admindata?.name.firstName}{` `}{admindata?.name.middleName}{` `}{admindata?.name.lastName}</p>
                <p>Date Of Birth: {` `}{admindata?.dateOfBirth}</p>
                <p>Gender:{` `} {admindata?.gender}</p>
                <p>Blood Group: {` `}{admindata?.bloodGroup}</p>
                <p>Email: {` `}{admindata?.email}</p>
                <p>Contact No: {` `}{admindata?.contactNo}</p>
                <p>Emer.Contact: {` `}{admindata?.emergencyContactNo}</p>
                <p>Present Address: {` `}{admindata?.presentAddress}</p>
                <p>Permanent Address: {` `}{admindata?.permanentAddress}</p>
                


              </Card>
            </Col>
          ))}
    
      </div>
      
       <div>
     
      </div>
      
      
    </div>
  );
 };

export default CustomerProfilePage;
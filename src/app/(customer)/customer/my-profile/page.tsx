"use client";
import { Button, Card, Col, Input, Row, message } from "antd";
import { Key, useEffect, useReducer, useState } from "react";
import { useAdminsQuery, useDeleteAdminMutation} from "@/redux/api/adminApi";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { USER_ROLE } from "@/constants/role";
import { redirect, useRouter } from "next/navigation";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import AdminNotification from "@/components/view/AdminNotification/AdminNotificaton";
import { useCustomersQuery } from "@/redux/api/customerApi";
import CustomerBookingCart from "@/components/view/CustomerBookingCart/CustomerBookingCart";

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

  return (
    <div>
      <EMBreadCrumb
        items={[
          {
            label: "customer",
            link: "/customer",
          },
        ]}
      />
     
    <div>
       <h1>Customer Profile</h1>
          {customersd?.map((admindata: any) => (
            <Col span={8} key={admindata?.id} style={{ margin: 0 }}>
              <Card
                title={admindata?.id}
                hoverable
                style={{ width: 450, justifyContent: 'center', display: 'flex' }}
                cover={<Image alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" width={300} height={300} />}
              >
                <Meta title="Europe Street beat" description="www.instagram.com" />
                <p>{admindata?.id}</p>
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
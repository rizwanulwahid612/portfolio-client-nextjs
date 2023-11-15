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

const AdminProfilePage =  () => {

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

console.log(adminsd);
const adminNotification= adminsd?.map((notif: { notification: any[]; })=>notif?.notification.map(not=>not?.message))
console.log(adminNotification)

  return (
    <div>
      <EMBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
        ]}
      />
     
    <div>
       <h1>Admin Profile</h1>
          {adminsd?.map((admindata: any) => (
            <Col span={8} key={admindata?.id} style={{ margin: 0 }}>
              <Card
                title={admindata?.id}
                hoverable
                style={{ width: 450, justifyContent: 'center', display: 'flex' }}
                cover={<Image alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" width={300} height={300} />}
              >
                <Meta title="Europe Street beat" description="www.instagram.com" />
                <p>{admindata?.id}</p>
                 <p>{admindata?._id}</p>
              </Card>
            </Col>
          ))}
     
      </div>
      
      
       <div>
     
      </div>
      
      
    </div>
  );
};

export default AdminProfilePage;
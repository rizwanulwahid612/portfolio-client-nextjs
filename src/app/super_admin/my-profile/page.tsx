"use client";
import { Button, Card, Col} from "antd";
import { useEffect } from "react";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { USER_ROLE } from "@/constants/role";
import { redirect } from "next/navigation";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";
import { useAdminsQuery } from "@/redux/api/adminApi";

const AdminProfilePage =  () => {

  useEffect(()=>{
    const {role,userId}=getUserInfo() as any;
    if(!isLoggedIn || role !== USER_ROLE.SUPER_ADMIN){
         redirect('/login')
    }
  },[])
  
  const query: Record<string, any> = {};
  const { data, isLoading } = useAdminsQuery({ ...query });
  
 // const admins:any = data?.admins.map(dam=>dam?.id);
  //  console.log(admins)
  const {role,userId}=getUserInfo() as any;
console.log(userId)
const adminsd: any = data?.admins?.map(dam => {
  if (userId) {
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
            label: "super_admin/my-profile",
            link: "/super_admin/my-profile",
          },
        ]}
      />
     
    <div>
       <h1>All Admin Profile</h1>
          {adminsd?.map((admindata: any) => (
             <Col span={8} key={admindata?.id} style={{ margin: 0 }}>
              <Card
                
                hoverable
                 style={{ width: 390, justifyContent: 'center', display: 'block' }}
                 cover={ <Image alt="example" src={admindata?.profileImage} width={300} height={300} />}
              >
               
                <Meta title="Profile Information" /> 
                <div  ><Link href={`/super_admin/my-profile/edit/${admindata?.id}`}><Button type="primary">Edit</Button></Link></div> 
               
        
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
                <p>Management Department: {` `}{admindata?.managementDepartment.title}</p>
                <p>Description: {` `}{admindata?.description}</p>
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
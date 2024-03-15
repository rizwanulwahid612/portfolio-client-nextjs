"use client";
import { Button, Card, Col,Typography } from "antd";
import { useEffect } from "react";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { USER_ROLE } from "@/constants/role";
import { redirect } from "next/navigation";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
const { Text } = Typography;


import Link from "next/link";
import { useUsersQuery } from "@/redux/api/userApi";
//import { useAdminsQuery } from "@/redux/api/adminApi";

const ProfilePage =  () => {

  useEffect(()=>{
    const {role,userEmail}=getUserInfo() as any;
    if(!isLoggedIn || role !== USER_ROLE.USER){
         redirect('/login')
    }
  },[])
  
  const query: Record<string, any> = {};
  const { data, isLoading } = useUsersQuery({ ...query });
  
 
  const {role,userEmail}=getUserInfo() as any;

const adminsd: any = data?.users?.map((dam:any) => {
  if (dam?.email === userEmail) {
    return dam;
  }
}).filter(Boolean);

console.log(adminsd);


  return (
   <div>
  <EMBreadCrumb
    items={[
      {
        label: "User",
        link: "/user/my-profile",
      },
    ]}
  />
  <h1 style={{ margin: "0px" }}>User Profile</h1>
  <div style={{display:"flex",justifyContent:"flex-end",marginBottom:"20px"}}>
 <Link href="/user/my-profile/create">
            <Button type="primary">Create User</Button>
          </Link>
  </div>
   
  <div style={{ display: "flex", flexWrap: "wrap" }}>
    {adminsd?.map((admindata: any) => (
      <Col xs={24} sm={12} md={24} lg={24} xl={24} key={admindata?._id} style={{ margin: "0" }}>
        <Card
          hoverable
          style={{ width: "100%", justifyContent: 'center', display: 'block' }}
          cover={<Image alt="example" src={admindata?.image} width={300} height={600} />}
        >
       
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link href={`/user/my-profile/edit/${admindata?._id}`}>
              <Button type="primary">Edit</Button>
            </Link>
          </div>
                <h3>Name:{` `} {admindata?.name}</h3>
                <h3>Title:{` `} {admindata?.title}</h3>
                <h3>Email:{` `} {admindata?.email}</h3>
                <h3>Skills:{` `} {admindata?.skills}</h3>
                <h3>Date Of Birth: {` `}{admindata?.birth}</h3>
                <h3>Gender:{` `} {admindata?.gender}</h3>
                <h3>Blood Group: {` `}{admindata?.blood}</h3>
                <h3>Email: {` `}{admindata?.email}</h3>
                <h3>Twitter: {` `}{admindata?.twitter}</h3>
                <h3>Contact No: {` `}{admindata?.contact}</h3>
                <h3>Present Address: {` `}{admindata?.presentaddress}</h3>
                <h3>Permanent Address: {` `}{admindata?.parmanentaddress}</h3>
                <h3>Language: {` `}{admindata?.language}</h3>
                <h3>NID:{` `}{admindata?.nid}</h3>
                <h3>Fathers Name:{` `}{admindata?.fathersname}</h3>
                <h3>Mothers Name:{` `}{admindata?.mothersname}</h3>
                <h3>Height:{` `}{admindata?.height}</h3>
                <h3>Weigth:{` `}{admindata?.weight}</h3>
                <h3>Married Status:{` `}{admindata?.marriedstatus}</h3>
                <h3>About Me:{` `}{admindata?.aboutme}</h3>
                <h3>Frontend :{` `}{admindata?.frontend}</h3>
                <h3>Backend :{` `}{admindata?.backend}</h3>
                <h3>LinkedIn :{` `}{admindata?.linkedin}</h3>
                <h3>Whats App:{` `}{admindata?.whatsapp} </h3>
                <h3>Github:{` `}{admindata?.github}</h3>
                <h3>Website:{` `}{admindata?.website}</h3>
                <h3>Facebook:{` `}{admindata?.facebook}</h3>
                <h3>Youtube:{` `}{admindata?.youtube}</h3>
                <h3>Instagram:{` `}{admindata?.instagram}</h3>
                <h3>Tools:{` `}{admindata?.tools}</h3>
                <h3>Discord:{` `}{admindata?.discord}</h3>
                <h3>Achivement:{` `}{admindata?.achivement}</h3>
                <h3>SSC:{` `}{admindata?.ssc}</h3>
                <h3>HSC:{` `}{admindata?.hsc}</h3>
                <h3>Institute:{` `}{admindata?.institute}</h3>
                <h3>Degree:{` `}{admindata?.degree}</h3>
                <h3>Passing Year:{` `}{admindata?.passingyear}</h3>
                <h3>Masters:{` `}{admindata?.masters}</h3>
                <h3>PHD:{` `}{admindata?.phd}</h3>
                <h3>Extracurriculam:{` `}{admindata?.extracurriculam}</h3>
                <h3>Experience1:{` `}{admindata?.experience1}</h3>
                <h3>Experience2:{` `}{admindata?.experience2}</h3>
                <h3>Experience3:{` `}{admindata?.experience3}</h3>
                <h3>Experience4:{` `}{admindata?.experience4}</h3>
                <h3>Experience5:{` `}{admindata?.experience5}</h3>
                <h3>Experience6:{` `}{admindata?.experience6}</h3>
                <h3>Experience7:{` `}{admindata?.experience7}</h3>
                <h3>Experience8:{` `}{admindata?.experience8}</h3>
                <h3>Experience9:{` `}{admindata?.experience9}</h3>
                <h3>Experience10:{` `}{admindata?.experience10}</h3>
              </Card>
            </Col>
          ))}
     
      </div>
    </div>
  );
};

export default ProfilePage;



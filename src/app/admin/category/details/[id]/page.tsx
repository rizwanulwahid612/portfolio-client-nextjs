"use client"
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import ReviewTable from "@/components/ui/ReviewTable/ReviewTable";
import { USER_ROLE } from "@/constants/role";
import { useAddBookingDataMutation } from "@/redux/api/bookingApi";
import { useCategoryQuery } from "@/redux/api/categoryApi";
import { useAddReviewMutation } from "@/redux/api/reviewApi";
import { useServiceQuery } from "@/redux/api/serviceApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Button, Card, Col, Row,message } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

// eslint-disable-next-line @next/next/no-async-client-component
const EditCategoryPublic = ({ params }: any) => {
  useEffect(()=>{
      const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.ADMIN){
         redirect('/login')
    }
  },[])
  const { data, isLoading: loading } = useCategoryQuery(params?.id);
 
console.log(data)
  
  return (
   
 <div>
  <EMBreadCrumb
        items={[
          {
            label: "service",
            link: "/admin/category",
          },
        ]}
      />
  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'20px',width:'100%'}}>
  <Row gutter={6} style={{margin:0}} >
   
  <Col  span={16}  key={data?.id} style={{margin:0}}>
  <Card
    title={''}
    hoverable
     style={{ width:"50vw",justifyContent:'flex-start',display:'flex'}}  
  >
    <div style={{display:'block',justifyContent:'space-between'}}>
    <div style={{ flex: 1 }}> 
    {/* <Image alt="example" src={data?.profileImage} width={600} height={300}/> */}
    <Image alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" width={600} height={300}/>
     </div>
    
    <div style={{ flex: 1,margin:"0" }}> 
    <Meta title={data?.name} />
    <p>Location:{` `} {data?.location}</p>
    <p>ProfileImage:{` `} {data?.profileImage}</p>
    <p>Price: {` `}{data?.price}</p>
    <p>Details:{` `} {data?.details}</p>
    <p>Start Time:{` `} {data?.startTime}</p>
    <p>End Time:{` `} {data?.endTime}</p>
    <p>Apointment Days In Week:{` `} {data?.apointmentdaysInWeek}</p>
    
    </div> 
   </div>
  </Card>
</Col>
    
  </Row>
 </div>
  </div> 
  );
};

export default EditCategoryPublic;



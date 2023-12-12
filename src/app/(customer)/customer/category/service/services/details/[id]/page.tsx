
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ReviewTable from "@/components/ui/ReviewTable/ReviewTable";
import { useAddBookingDataMutation } from "@/redux/api/bookingApi";
import { useAddReviewMutation } from "@/redux/api/reviewApi";
import { Button, Card, Col, Row,message } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";

// eslint-disable-next-line @next/next/no-async-client-component
const SingleAvailableServicePublic = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  const availableServices = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/${id}`,
    {
      // next: {
      //  // revalidate: 24 * 60 * 60, // time based revalidation
      //   //on demand revalidation
      //   tags: ["single-available-services"],
      // },
       cache: "no-cache",
    }
  );
  
 
  const { data } = await availableServices.json();
  console.log(data)
   console.log(data?.reviewIds)
   const reviewIds=data?.reviewIds?.map((revId: any)=>revId)
   console.log(reviewIds,data._id)
  
  return (
    <div>
  
  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'20px',width:'100%'}}>
  <Row gutter={6} style={{margin:0}} >
   
  <Col  span={16}  key={data?.id} style={{margin:0}}>
  <Card
    title={''}
    hoverable
     style={{ width:"100vw",justifyContent:'space-between',display:'flex'}}  
  >
    <div style={{display:'flex',justifyContent:'space-between'}}>
    <div style={{ flex: 1 }}> 
   <Image alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" width={600} height={300}/>
     </div>
    
    <div style={{ flex: 1 }}> 
    <Meta title="Europe Street beat" description="www.instagram.com" />
    <p>{data?.name}</p>
    </div> 
   </div>
  </Card>
</Col>
    
  </Row>
 </div>

 <ReviewTable categoryId={data?._id} reviewIds={reviewIds}/>
  </div>
  );
};

export default SingleAvailableServicePublic;



/* eslint-disable @next/next/no-img-element */
"use client"
import Form from "@/components/Forms/Form";
import Footer from "@/components/ui/Footer/Footer";
import Carosol from "@/components/view/Carosol/Carosol";
import CategorySteps from "@/components/view/CategorySteps/CategorySteps";
import PublicHeader from "@/components/view/Header/PublicHeader";
import RegisterForm from "@/components/view/RegisterForm/RegisterForm";
import { useBlogsQuery } from "@/redux/api/blogApi";
import { Button, Card, Col, Rate, Row } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";
import CreateCustomerPage from "./admin/allusers/create/page";
import RegistrationPage from "@/components/registration/registration";
import FooterPage from "@/components/Footer/footer";
import ServicePage from "@/components/servicepage/servicepage";
import { useFeedbacksQuery } from "@/redux/api/feedbackApi";
import unhh from '../components/styles/singleproduct.module.css'


// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  const query: Record<string, any> = {};
 const {data,isLoading}=useBlogsQuery({ ...query })
  const {data:feedback,isLoading:loading}=useFeedbacksQuery({  })
 const feedbacks=feedback?.feedbacks
 console.log(feedbacks)
 console.log(data?.blogs)
  return <>
  <PublicHeader/>
  
  <Carosol/>
  <div style={{display:"flex",justifyContent:"center",margin:"40px"}}>
     <h1 >Importent Announcemrnt</h1>
  </div>
         
          {data?.blogs?.map((categorydata:any ,i) => (
           
              <Card key={i}
              
                 cover={""}
              >
                <div style={{gap:"50px"}} className={unhh.container}>
              <img alt="example" src={categorydata?.imagepost} width={"100%"} height={300} />
                <p>{categorydata?.comment}</p>
               </div> 
              </Card>
           
          ))}
        {/* </Row> */}
        <ServicePage/>

<RegistrationPage/>
<div style={{display:"flex",justifyItems:"center",textAlign:"center",alignItems:"center",justifyContent:"center",margin:"40px"}}>
     <h1 >User Feedback</h1>
  </div>
           <Row gutter={6} style={{ margin: 0 }}>
          {feedbacks?.slice(0, 3).map((categorydata:any ,i) => (
            <Col xs={24} sm={24} md={12} lg={8}  span={8} key={categorydata?.d} style={{ marginBottom: "20px" }}>
              <Card key={i}
               hoverable
                 cover={""}
              >
                <div style={{display:"flex",width:"50%",gap:"50px"}}>
              <img alt="example" src={categorydata?.customerImage} width={100} height={100} />
              
                <p>{categorydata?.comment}</p>
                 
               </div> 
               <p>{categorydata?.customerName}</p>
               <div style={{display:"flex",justifyContent:"flex-end"}}>
                 <Rate allowHalf defaultValue={categorydata?.rating} />
               </div>
               
              </Card>
           </Col>
          ))}
          </Row>
<FooterPage/>
  
  </>
}

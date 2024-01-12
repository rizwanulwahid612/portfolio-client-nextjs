"use client";
import { Button, Card, Col, Row, message} from "antd";
import { useEffect } from "react";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { USER_ROLE } from "@/constants/role";
import { redirect } from "next/navigation";
import Meta from "antd/es/card/Meta";
import Image from "next/image";

import { useCustomersQuery} from "@/redux/api/customerApi";

import Link from "next/link";
import { useAddFeedbackMutation } from "@/redux/api/feedbackApi";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";

const CustomerFeedbackForm =  () => {


  useEffect(()=>{
    const {role,userId}=getUserInfo() as any;
    if(!isLoggedIn || role !== USER_ROLE.CUSTOMER){
         redirect('/login')
    }
  },[])
  
  const query: Record<string, any> = {};
   const [addFeedback] = useAddFeedbackMutation();
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
const custName=customersd?.map((vf:any)=>vf?.name?.firstName).join(', ')
console.log(custName)

//const custNameString = custName.join(', ');


const custID= customersd?.map((vf:any)=>vf?._id)
const profileImage= customersd?.map((vf:any)=>vf?.profileImage).join(', ')
//console.log(custName,custID,profileImage)
const onSubmit = async (values: any) => {
    console.log(values)
    const obj = { ...values };
   
     message.loading("Creating...");
    try {
     
        await addFeedback(obj);
      console.log(obj)
      message.success("Feedback created successfully!");
    } catch (err: any) {
      console.error(err.message);
    }
  };

const defaultValues = {
  customerName: custName || "",
  customerImage: profileImage || "",
 
  };

console.log(defaultValues)
 
  return (
    <div>
     
    <h1>Create Feedback</h1>

      <div>
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Form Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
             

               <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="customerName"
                  size="large"
                  label="customer Name"
                  
                />
              </Col>
          
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="comment"
                  size="large"
                  label="comment"
                />
              </Col>
 <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="rating"
                  size="large"
                  label="rating"
                />
              </Col>

              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="customerImage"
                  size="large"
                  label="profileImage"
                 
                />
              </Col>
           
              
              
             
            </Row>
          </div>

          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </Form>
      </div>
      
    </div>
  );
 };

export default CustomerFeedbackForm;
"use client";
import { USER_ROLE } from "@/constants/role";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Button, Col, Form, Input, Row, message } from "antd";
//import Link from "next/link";

import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";


type FieldType = {
   email:string,
   oldPassword: string,
   newPassword: string,
};

const ChangePassword = ({posts}:{posts:any}) => {

 useEffect(()=>{
    const {role,userEmail}=getUserInfo() as any;
    if(!isLoggedIn || role !== USER_ROLE.USER){
         redirect('/login')
    }
  },[])
  
  // const query: Record<string, any> = {};
  // const { data, isLoading } = useUsersQuery({ ...query });
  
 
  const {role,userEmail}=getUserInfo() as any;

// const adminsd: any = data?.users?.map((dam:any) => {
//   if (dam?.email === userEmail) {
//     return dam;
//   }
// }).filter(Boolean);

// console.log(adminsd);


const userdata: any = posts?.data?.map((dam:any) => {
  if (dam?.email === userEmail) {
    return dam;
  }
}).filter(Boolean);
console.log(userdata)

const validEmail= userdata?.map((emaildata:any)=>(emaildata.email)).join(' ')
console.log("validEmail:",validEmail)

 const initialValue: {
    validEmail: string | string[] | undefined;

  } = {
    validEmail,
    
  };

  const router = useRouter();
  const onFinish = async (values: any) => {
    console.log(values)
    try {
      //http://localhost:5000/api/v1
      const response = await fetch(`http://localhost:3002/api/v1/auth/change-password`, {
      //const response = await fetch(`https://donation-server-opal.vercel.app/api/v1/users/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        message.error("password change SuccessFully")
        throw new Error('Failed to change password form');
      }else{
        router.refresh();
      //router.push("/login");
      message.success("password change SuccessFully")
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
     <Row
    className={''}
      justify="space-between"
      align="middle"
      style={{
        marginTop:"40px",
        minHeight: "10vh",
        alignItems:"center",
        justifyItems:"center",
        justifyContent:"center",
        display:"flex",
        textAlign:"center"
      }}
    >
      <Col>
        <h1
          style={{
            margin: "0px 0px",
            display:"flex",
            textAlign:"center",
            marginBottom:"40px"
          }}
        >
          Change Your Password
        </h1>
     <div style={{display:"block",alignItems:"center",textAlign:"center"}}>
     
    <Form
    
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      
    >
        <Form.Item<FieldType>
        label="Email"
        name="email"
        initialValue={initialValue.validEmail}
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Old Password"
        name="oldPassword"
        rules={[{ required: true, message: "Please input your Old Password!" }]}
      >
         <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        label="New Password"
        name="newPassword"
        rules={[{ required: true, message: "Please input your New Password!" }]}
      >
        <Input.Password />
      </Form.Item>
     <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    
    </div>
    </Col>
    </Row>
  );
};

export default ChangePassword;
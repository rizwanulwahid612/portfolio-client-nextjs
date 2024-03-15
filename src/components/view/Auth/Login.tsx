"use client";
import { Button, Col, Row, message } from "antd";
//import loginImage from "../../assets/Privacy policy-rafiki.png";
import Image from "next/image";
import Form from "@/components/Forms/Form";
//import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
//import { useUserLoginMutation } from "@/redux/api/authApi";
import { getUserInfo, storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
//import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/login";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "@/components/Forms/FormInput";
import { useUserLoginMutation } from "@/redux/api/authApi";
import logi from '../../../../public/Security On-cuate.svg';
import conte from '../../styles/singleproduct.module.css'
import Link from "next/link";
type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();

  // console.log(isLoggedIn());

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      // console.log(res);
      if (res?.accessToken) {
         storeUserInfo({ accessToken: res?.accessToken });
         const {role} = getUserInfo()as any
        router.push(`${role}/my-profile`);
        message.success("User logged in successfully!");
      }
      if (!res?.accessToken) {
        message.error("User did not logged in!");
      }
     // message.error("User did not logged in!")
      // storeUserInfo({ accessToken: res?.accessToken });
      // console.log(res);
    } catch (err: any) {
      console.error(err.message);
      
    }
  };

  return (
    <Row
    className={conte.container}
      justify="space-between"
      align="middle"
      style={{
        minHeight: "10vh",
      }}
    >
      <Col sm={12} md={16} lg={10}>
         <Image src={logi} width={400} height={300} alt="login image" /> 
      </Col>
      <Col>
        <h1
          style={{
            margin: "0px 0px",
          }}
        >
          First login your account
        </h1>
        <div>
          <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
            <div>
              <FormInput name="email" type="email" size="large" label="User Email" required />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="User Password"
                required
              />
            </div>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end"}}>
           <Link href={"/forgot-password"}> Forgot Password!</Link>
        </div>
        
      </Col>
    </Row>
  );
};

export default LoginPage;

















// "use client"
// import React from 'react';
// import { Button, Checkbox, Form, Input } from 'antd';
// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';



// type FieldType = {
//   //email?: string;
//   id?:string;
//   password?: string;
// };

// const Login = () => {
//     const router =useRouter();
//     const onFinish = async(values: any) => {
//   console.log('Success:', values);
//   const result =await signIn("event-management-backend",{
//     id:values.id,
//     password:values.password,
//     //callbackUrl:"/",
//     redirect:false
//   })
//  // console.log(result)
//   if(result?.ok && !result.error ){
//     router.push("/")
//    // router.refresh()
//   }
// };

// const onFinishFailed = (errorInfo: any) => {
//   console.log('Failed:', errorInfo);
// };
// return(
//     <Form
//     name="basic"
//     labelCol={{ span: 8 }}
//     wrapperCol={{ span: 16 }}
//     style={{ maxWidth: 600 }}
//     initialValues={{ remember: true }}
//     onFinish={onFinish}
//     onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
//     <Form.Item<FieldType>
//     //   label="Email"
//     //   name="email"
//       label="User Id"
//       name="id"
//       rules={[{ required: true, message: 'Please input your user Id!' }]}
//     >
//       {/* <Input type='email'/> */}
//     <Input/>
//     </Form.Item>

//     <Form.Item<FieldType>
//       label="Password"
//       name="password"
//       rules={[{ required: true, message: 'Please input your password!' }]}
//     >
//       <Input.Password />
//     </Form.Item>

//     <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
// )
  
// };

// export default Login;
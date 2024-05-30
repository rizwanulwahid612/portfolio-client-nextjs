"use client";
import React from "react";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { Button } from "antd";
 import { useRouter } from "next/navigation";

type FormData = {
  email: string | string[] | undefined;
  newPassword: string;
};

function ResetPassword({ searchParams }: any) {
  const { email, token } = searchParams;

  // useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
    }
  // }, [token]);

  console.log("token=", token);
  const [resetPassword] = useResetPasswordMutation();
   const router = useRouter();

  if (!email && !token) return null;

  const defaultValues: FormData = {
    email,
    newPassword: "",
  };

  const onSubmit = async (values: FormData) => {
    console.log(values);
    try {
      const res = await resetPassword(values);
      console.log(res);
       router.push("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div
      style={{ margin: "100px 0", display: "flex", justifyContent: "center" }}
    >
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <h3>Reset Password</h3>
        <div style={{ margin: "5px 0" }}>
          <FormInput type="email" name="email" label="User Email" />
        </div>
        <div style={{ margin: "5px 0" }}>
          <FormInput type="password" name="newPassword" label="New password" />
        </div>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ResetPassword;

























// "use client";
// //import Form from "@/components/ui/Forms/Form";
// //import FormInput from "@/components/ui/Forms/FormInput";
// import { Button, Form, Input, message } from "antd";
// import { useRouter } from "next/navigation";

// import React from "react";

// type FormData = {
//   email: string | string[] | undefined;
//   //token: string | string[] | undefined;
// };
// type FieldType = {
//   email?: string;
//   newPassword?: string;
// };
// function ResetPassword({ searchParams }: any) {
//   const { email } = searchParams;
// //const { email, token } = searchParams;
//   const router = useRouter();
// //console.log("email,token",email,token)
//   if (!email) return null;
//   //if (!email && !token) return null;

//   const initialValue: {
//     email: string | string[] | undefined;
//     newPassword: string;
//   } = {
//     email,
//     newPassword: "",
//   };

//   const onFinish = async (values: FormData) => {
//     console.log(values)
//     try {
//       // const response = await fetch(`https://portfolio-server-ebon-rho.vercel.app/api/v1/auth/reset-password`, {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//       });

//       if (!response.ok) {
//         message.error("did not Reset Password")
        
//       }else{
       
//       message.success("Password Reset Successfully")
//       }

//       const responseData = await response.json();
//       console.log(responseData);
//       router.push("/login");
//     } catch (error) {}
//   };
// const onFinishFailed = (errorInfo: any) => {
//     console.log("Failed:", errorInfo);
//   };
//   return (
//     <>
//     <h1 style={{margin:"30px",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",}}>Reset Password</h1>
    
//    <div style={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",marginTop:"40px"}}>
      
//     <Form
//       name="basic"
//       labelCol={{ span: 8 }}
//       wrapperCol={{ span: 16 }}
//       style={{ maxWidth: 600 }}
//       initialValues={{ remember: true }}
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//       autoComplete="off"
//     >
//       <Form.Item<FieldType>
//         label="Email"
//         name="email"
//         initialValue={initialValue.email}
//         rules={[{ required: true, message: "Please input your email!" }]}
//       >
//         <Input type="email" />
//       </Form.Item>
//       <Form.Item<FieldType>
//         label="New Password"
//         name="newPassword"
//         initialValue={initialValue.newPassword}
//         rules={[{ required: true, message: "Please input your password!" }]}
//       >
//         <Input.Password />
//       </Form.Item>
//       <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//     </div>
//     </>
//   );
// }

// export default ResetPassword;


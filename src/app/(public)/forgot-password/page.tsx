"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { Button, message } from "antd";

// import Form from "@/components/Forms/Form";
// import FormInput from "@/components/Forms/FormInput";
// import { useForgotPasswordMutation } from "@/redux/api/authApi";
// import { Button, message } from "antd";

function ForgotPasswordPage() {
  const [forgotPassword] = useForgotPasswordMutation();
  const onSubmit = async (values: { email: string }) => {
    try {
      await forgotPassword(values);
      message.success("Reset link has been sent to your email");
    } catch (error) {}
  };
  return (
    <>
      <div
        style={{ margin: "100px 0", display: "flex", justifyContent: "center" }}
      >
        <Form submitHandler={onSubmit}>
          <h3 style={{ margin: "5px 0" }}>Forget Password</h3>
          <div style={{ margin: "5px 0" }}>
            <FormInput name="email" placeholder="Enter Your User Email" />
          </div>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default ForgotPasswordPage;















// // forgot-password.tsx
// "use client"
// import { useState } from 'react';
// import { Button, Form, Input, message } from 'antd';
// //import { useSession } from 'next-auth/react';

// function ForgotPasswordPage() {
//   //const [session] = useSession();
//   const [loading, setLoading] = useState(false);

//   const onFinish = async (values: { email: string }) => {
//     setLoading(true);
//     try {
//       await sendPasswordRecoveryEmail(values.email);
//       message.success('Password recovery email sent. Please check your inbox.');
//     } catch (error) {
//       message.error('Failed to send password recovery email.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sendPasswordRecoveryEmail = async (email: string) => {
//     // await fetch('https://portfolio-server-ebon-rho.vercel.app/api/v1/auth/forgot-password', {
//       await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`, {
      
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email }),
//     });
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <Form
//         style={{ width: '300px' }}
//         name="basic"
//         initialValues={{ remember: true }}
//         onFinish={onFinish}
//       >
//         <h1>Forgot Password</h1>
//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[{ required: true, message: 'Please input your email!' }]}
//         >
//           <Input type="email" />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" loading={loading}>
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }

// export default ForgotPasswordPage;





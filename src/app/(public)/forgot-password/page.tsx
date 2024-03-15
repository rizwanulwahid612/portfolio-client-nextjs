// forgot-password.tsx
"use client"
import { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
//import { useSession } from 'next-auth/react';

function ForgotPasswordPage() {
  //const [session] = useSession();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    try {
      await sendPasswordRecoveryEmail(values.email);
      message.success('Password recovery email sent. Please check your inbox.');
    } catch (error) {
      message.error('Failed to send password recovery email.');
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordRecoveryEmail = async (email: string) => {
    await fetch('http://localhost:3002/api/v1/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form
        style={{ width: '300px' }}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h1>Forgot Password</h1>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ForgotPasswordPage;





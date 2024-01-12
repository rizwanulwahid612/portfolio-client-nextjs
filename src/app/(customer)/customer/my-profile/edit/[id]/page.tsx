"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { USER_ROLE } from "@/constants/role";
import { selectBloodGroupOptions, selectorGenderOptions } from "@/constants/selectConstantOptions";
import { useAdminQuery, useUpdateAdminMutation } from "@/redux/api/adminApi";
import { useCustomerQuery, useUpdateCustomerMutation } from "@/redux/api/customerApi";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { IDepartment } from "@/types";

import { Button, Col, Row, message } from "antd";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const EditProfilePage = ({ params }: any) => {
   useEffect(()=>{
    const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.CUSTOMER){
         redirect('/login')
    }
  },[])
  const { data: customerData, isLoading: loading } = useCustomerQuery(params?.id);
  //   console.log(adminData);
   const [updateCustomer] = useUpdateCustomerMutation();

 
  const onSubmit = async (values: any) => {
    try {
      const res = await updateCustomer({ id: params?.id, body: values }).unwrap();
      // console.log(res);
      if (res?.id) {
        message.success("Customer Successfully Updated!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const defaultValues = {
    name: {
      firstName: customerData?.name?.firstName || "",
      lastName: customerData?.name?.lastName || "",
      middleName: customerData?.name?.middleName || "",
    },
    dateOfBirth: customerData?.dateOfBirth || "",
    email: customerData?.email || "",
    contactNo: customerData?.contactNo || "",
    emergencyContactNo: customerData?.emergencyContactNo || "",
    permanentAddress: customerData?.permanentAddress || "",
    presentAddress: customerData?.presentAddress || "",
    bloodGroup: customerData?.bloodGroup || "",
    gender: customerData?.gender || "",
  
  };
  
  return (
    <div>
      <EMBreadCrumb
        items={[
          {
            label: "profile",
            link: "/customer/my-profile",
          },
         
        ]}
      />
      <h1>Edit User Profile {params?.id}</h1>

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
              Customer Information
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
                  name="name.firstName"
                  size="large"
                  label="First Name"
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
                  name="name.middleName"
                  size="large"
                  label="Middle Name"
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
                  name="name.lastName"
                  size="large"
                  label="Last Name"
                />
              </Col>

              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="gender"
                  options={selectorGenderOptions}
                  label="Gender"
                  placeholder="Select"
                />
              </Col>
              
              
            </Row>
          </div>

          {/* basic info */}
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
              Basic Information
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
                  type="email"
                  name="email"
                  size="large"
                  label="Email address"
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
                  name="contactNo"
                  size="large"
                  label="Contact No."
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
                  name="emergencyContactNo"
                  size="large"
                  label="Emergency Contact No."
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormDatePicker
                  name="dateOfBirth"
                  label="Date of birth"
                  size="large"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="bloodGroup"
                  options={selectBloodGroupOptions}
                  label="Blood group"
                  placeholder="Select"
                />
              </Col>
             
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="presentAddress"
                  label="Present address"
                  rows={4}
                />
              </Col>

              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="permanentAddress"
                  label="Permanent address"
                  rows={4}
                />
              </Col>
            </Row>
          </div>
          <Button htmlType="submit" type="primary">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditProfilePage;
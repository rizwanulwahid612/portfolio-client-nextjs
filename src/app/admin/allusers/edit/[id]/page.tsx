"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { selectBloodGroupOptions, selectorGenderOptions } from "@/constants/selectConstantOptions";
import { useAdminQuery, useUpdateAdminMutation } from "@/redux/api/adminApi";
import { useCustomerQuery, useUpdateCustomerMutation } from "@/redux/api/customerApi";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { IDepartment } from "@/types";

import { Button, Col, Row, message } from "antd";

const EditCustomerPage = ({ params }: any) => {
  const { data: cData, isLoading: loading } = useCustomerQuery(params?.id);
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
      firstName: cData?.name?.firstName || "",
      lastName: cData?.name?.lastName || "",
      middleName: cData?.name?.middleName || "",
    },
    dateOfBirth: cData?.dateOfBirth || "",
    email: cData?.email || "",
    contactNo: cData?.contactNo || "",
    emergencyContactNo: cData?.emergencyContactNo || "",
    permanentAddress: cData?.permanentAddress || "",
    presentAddress: cData?.presentAddress || "",
    bloodGroup: cData?.bloodGroup || "",
    gender: cData?.gender || "",

  
  };
  
  return (
    <div>
      <EMBreadCrumb
        items={[
          {
            label: "allusers",
            link: "/admin/allusers",
          },
       
        ]}
      />
      <h1>Edit Customer {params?.id}</h1>

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

export default EditCustomerPage;
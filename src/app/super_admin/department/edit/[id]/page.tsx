"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { USER_ROLE } from "@/constants/role";
// import ActionBar from "@/components/ui/ActionBar";
// import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  useDepartmentQuery,
  useUpdateDepartmentMutation,
} from "@/redux/api/departmentApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";
import { redirect } from "next/navigation";
import { useEffect } from "react";

type IDProps = {
  params: any;
};

const EditDepartmentPage = ({ params }: IDProps) => {
   useEffect(()=>{
    const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.SUPER_ADMIN){
         redirect('/login')
    }
  },[])
  const { id } = params;

  const { data, isLoading } = useDepartmentQuery(id);
  const [updateDepartment] = useUpdateDepartmentMutation();

  const onSubmit = async (values: { title: string }) => {
    message.loading("Updating.....");
    try {
      //   console.log(data);
      await updateDepartment({ id, body: values });
      message.success("Department updated successfully");
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  // @ts-ignore
  const defaultValues = {
    title: data?.title || "",
  };

  return (
    <div>
      <EMBreadCrumb
        items={[
          
          {
            label: "department",
            link: "/super_admin/department",
          },
        ]}
      />

      <ActionBar title="Update Department"> </ActionBar>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="title" label="Title" />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditDepartmentPage;
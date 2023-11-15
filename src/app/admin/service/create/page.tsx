"use client";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
//import UploadImage from "@/components/ui/UploadImage.tsx/UploadImage";
import { selectBloodGroupOptions, selectorGenderOptions } from "@/constants/selectConstantOptions";
import { useAddCategoryMutation } from "@/redux/api/categoryApi";
import { useAddServiceMutation } from "@/redux/api/serviceApi";
import { Button, Col, Row, message } from "antd";



const CreateServicePage = () => {

  const [addService] = useAddServiceMutation();

  const onSubmit = async (values: any) => {
    // console.log(values)
    // const obj = { values };
    //const file = obj["file"];
    //delete obj["file"];
   // const data = JSON.stringify(obj);
    // const formData = new FormData();
    // console.log(formData)
    //formData.append("file", file as Blob);
    // formData.append("data", data);
     message.loading("Creating...");
    try {
      // await addAdminData(formData);
      // console.log(formData)
      console.log(values)
        await addService(values);
      console.log(addService(values))
      message.success("Service created successfully!");
    }catch(error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
// //@ts-ignore
//   const defaultValues = {   
// role:"Service",

 
//   };
  return (
    <div>
      <EMBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "service",
            link: "/admin/service",
          },
           {
            label: "category",
            link: "/admin/category",
          },
        ]}
      />
      <h1>Create Service</h1>

      <div>
        <Form submitHandler={onSubmit} >
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
              Service Information
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
                  name="name"
                  size="large"
                  label="Name"
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
                  name="role"
                  size="large"
                  label="Role"
                />
              </Col>
              {/* <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <UploadImage name="file" />
              </Col> */}
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
                  type="text"
                  name="profileImage"
                  size="large"
                  label="profileImage"
                />
              </Col>

              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                {/* <FormSelectField
                  size="large"
                  name="admin.bloodGroup"
                  options={selectBloodGroupOptions}
                  label="Blood group"
                  placeholder="Select"
                /> */}
              </Col>
           
             
                <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="details"
                  label="Details"
                  rows={4}
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

export default CreateServicePage;
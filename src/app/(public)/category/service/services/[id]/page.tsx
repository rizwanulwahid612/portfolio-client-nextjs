"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";

import ActionBar from "@/components/ui/ActionBar/ActionBar";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import CopyLink from "@/components/ui/LinkCopy/LinkCopy";
import { apointmentdaysInWeeks } from "@/constants/selectConstantOptions";
import { useCategoryQuery } from "@/redux/api/categoryApi";
import { useDebounced } from "@/redux/hooks";
import { ReloadOutlined } from "@ant-design/icons";

import { Button, Card, Col, Input, Row, message } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

const ServicePage = ({ params }: any) => {

  const fetchData = async (data: any) => {
    try {
      const response = await fetch("https://backend-for-event-b03i2adhl-rizwanulwahid612-gmailcom.vercel.app/api/v1/bookings/create-Booking", {
        cache:'no-store',
        method: "POST", // Specify the HTTP method as POST
        headers: {
          "Content-Type": "application/json", // Set the content type
        },
        body: JSON.stringify(data), // Convert your data to JSON
});

      if (!response.ok) {
        window.location.reload();
        throw new Error("Booking is not created");
        
      }

      const responseData = await response.json();
     return responseData;
    } catch (error) {
      
      console.error("Error fetching data:", error);
      throw error;
    }
  };

 

  const onSubmit = async (values: any) => {
    const object = { ...values };
    message.loading("Creating.....");
    try {
      console.log(object);
        await fetchData(object);
       console.log("fetchdata(obj):",fetchData(object))
      message.success("Booking added successfully");
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };
/////////////

const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [categoryId, setcategoryId] = useState<string>("");
 const query: Record<string, any> = {};
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data: serviceData, isLoading: loading } = useCategoryQuery(params?.id,query);
     const categoryIds=serviceData?.categoryIds?.map((cdfd: any)=>cdfd?._id);
console.log(serviceData)

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };
 //@ts-ignore
  const defaultValues = {   
role:"booking",
customerID:"652ebf15e0e2a758bf569c1d",
serviceIDs:[{
//categoryId:categoryIds,
categoryId:'',
  startTime:serviceData?.startTime,
  endTime: serviceData?.endTime,
  apointmentdaysInWeek:serviceData?.apointmentdaysInWeek,
  isDeleted: false
  }],
  isConfirm: false
  };
  return (
    <div style={{margin:'10px'}}>
      <EMBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
        ]}
      />
     <ActionBar title="Service List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          {/* <Link href="/admin/booking/create">
            <Button type="primary">Category</Button>
          </Link> */}
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: "0px 5px" }}
              type="primary"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
        <div>
   
        </div>
      </ActionBar>
      <div style={{display:"flex"}}>
  
<div style={{display:'flex',justifyContent:'space-between',marginBottom:'20px',}}>
  <Row gutter={6} style={{margin:0}} >
   
{serviceData?.categoryIds?.map((data: any) => (
  <Col span={16}  key={data?.id} style={{margin:0}}>
  <Card
    title={''}
    hoverable
     style={{ width: 450,justifyContent:'center',display:'flex'}}
    cover={<Image alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" width={300} height={300}/>}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
    <p>{data?.name}</p>
    <CopyLink  textToCopy={`${data?._id}`}/>
    <Link key={''} href={`details/${data?._id}`}>
    <Button>Service details</Button>
    </Link>
  </Card>
</Col>
    
))}
 
  </Row>
 </div>

 {/* </div><div style={{ boxShadow: '20px 20px 50px rgba(0, 0, 0, 0.2)',border:'radius',padding:'40px',margin:'10px' }} > */}
<div>
      <h1>Create Booking</h1>

      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
         
          {/* <Col span={12} style={{ margin: "10px 0"}}>
            <FormInput name="role" label="Role" />
          </Col> */}
          <Col span={12} style={{ margin: "10px 0" }}>
            <FormInput name="customerID" label="customerID" />
          </Col>
         
       
           {defaultValues.serviceIDs.map((service, index) => (
          <div key={index} style={{display:"grid",gridTemplateColumns:"repeat(2,400px)"}}>
            <Col span={12} style={{ margin: "10px 0" }}>
              <FormInput name={`serviceIDs[${index}].categoryId`} label="Category ID" />
            </Col>
            <Col span={12} style={{ margin: "10px 0" }}>
              <FormInput name={`serviceIDs[${index}].startTime`} label="Start Time" />
            </Col>
            <Col span={12} style={{ margin: "10px 0" }}>
              <FormInput name={`serviceIDs[${index}].endTime`} label="End Time" />
            </Col>
            <Col span={12} style={{ margin: "10px 0" }}>
              <FormSelectField
                  size="large"
                  name={`serviceIDs[${index}].apointmentdaysInWeek`} label="Appointment Days"
                  options={apointmentdaysInWeeks}
                  placeholder="Select"
                />

              {/* <FormInput name={`serviceIDs[${index}].apointmentdaysInWeek`} label="Appointment Days" /> */}
            </Col>
            
          </div>
        ))}
        
        </Row>
        <Button type="primary" htmlType="submit">
          Booking
        </Button>
      </Form>
    </div>
    {/* ////// */}
    </div>
    </div>
  );
};

export default ServicePage;







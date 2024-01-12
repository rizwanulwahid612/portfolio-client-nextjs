"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { USER_ROLE } from "@/constants/role";
import { apointmentdaysInWeeks } from "@/constants/selectConstantOptions";
import { useBookingQuery, useUpdateBookingMutation } from "@/redux/api/bookingApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";


import { Button, Col, Row, message } from "antd";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const EditBookingPage = ({ params }: any) => {
  useEffect(()=>{
      const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.ADMIN){
         redirect('/login')
    }
  },[])
  console.log(params)
 const { data: cData, isLoading: loading } = useBookingQuery(params?.id);
     console.log(cData);
  const [updateBooking] =   useUpdateBookingMutation();

  const onSubmit = async (values: any) => {
    console.log(values)
    try {
      const res = await updateBooking({ id: params?.id, body: values }).unwrap();
       console.log(res);
      if (res?.id) {
        message.success("Booking Successfully Updated!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const appointmentWeek= cData?.serviceIDs?.map((s:any)=>s?.apointmentdaysInWeek).join(', ')
  const startTime = cData?.serviceIDs?.map((s:any)=>s?.startTime).join(', ')
  const endTime= cData?.serviceIDs?.map((s:any)=>s?.endTime).join(', ')
  

 //@ts-ignore
const defaultValues = {   

  serviceIDs:[{
  startTime:startTime,
  endTime:endTime,
  apointmentdaysInWeek:appointmentWeek,
  }],
  
  };
  console.log(defaultValues)
  //const startTimeValue = data[0].serviceIDs[0].startTime;
  return (
    <div>
      <EMBreadCrumb
        items={[
          {
            label: "booking",
            link: "/admin/booking/",
          },
        
        ]}
      />
      <h1>Edit Customers {params?.id}</h1>

      <div>
       {!loading && (
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
           {defaultValues.serviceIDs.map((service, index) => (
          <div key={index} style={{display:"grid",gridTemplateColumns:"repeat(2,400px)"}}>
           
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

             
            </Col>
            
          </div>
        ))}
        
        </Row>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
      )}
      </div>
    </div>
  );
};

export default EditBookingPage;






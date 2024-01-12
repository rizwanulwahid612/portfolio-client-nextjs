/* eslint-disable @next/next/no-img-element */
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
import { useBookingQuery } from "@/redux/api/bookingApi";
import { useCustomerQuery, useUpdateCustomerMutation } from "@/redux/api/customerApi";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { IDepartment } from "@/types";

import { Button, Card, Col, Row, message } from "antd";
import Meta from "antd/es/card/Meta";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const BookingDetailsPage = ({ params }: any) => {
  useEffect(()=>{
      const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.ADMIN){
         redirect('/login')
    }
  },[])
  const { data: cData, isLoading: loading } = useBookingQuery(params?.id);
  
  console.log(cData)

  const custId =cData?.customerID?._id
  const custName=cData?.customerID?.name?.firstName
  const custEmail=cData?.customerID?.email
  const cont= cData?.customerID?.contactNo
   const bookingname=cData?.serviceIDs?.map((s:any)=>s?.categoryId?.name)
    const bookingDetails= cData?.serviceIDs?.map((s:any)=>s?.categoryId?.details)
   const createAt=cData?.createdAt
  const confirm= cData?.isConfirm
  const appointmentWeek= cData?.serviceIDs?.map((s:any)=>s?.apointmentdaysInWeek)
  //const  cData?.serviceIDs?.map((s:any)=>s?.apointmentdaysInWeek))
  const startTime = cData?.serviceIDs?.map((s:any)=>s?.startTime)
  const endTime= cData?.serviceIDs?.map((s:any)=>s?.endTime)
  return (
    
    <div>
      <EMBreadCrumb
        items={[
          {
            label: "Bookings",
            link: "/admin/booking",
          },
        ]}
      />
     
    <div>
       <h1>Booking Details</h1>
        
            <Col span={8} key={cData?._id} style={{ margin: 0 }}>
              <Card
                
                hoverable
                style={{ width: 700, justifyContent: 'center', display: 'flex' }}
              >
                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" width={400} height={300} />

                <Meta title="Booking Information" /> 
                <div style={{display:'flex',justifyContent:'flex-end',margin:"10px"}}></div> 
               
        
{ ` `}
{` `}
               
                
                <p>Customer Id:{` `}{custId}</p>
                <p>Customer Name:{` `}{custName}</p>
                <p>Customer Email:{` `}{custEmail}</p>
                <p>ContactNumber:{` `}{cont}</p>
                <p>BookingName:{` `}{bookingname}</p>
                <p>BookingDetails:{` `}{bookingDetails}</p>
                <p>BookingConfirmation:{` `}{confirm===true?"true":"false"}</p>
                <p>AppointWeek:{` `}{appointmentWeek}</p>
                <p>StartTime:{` `}{startTime}</p>
                <p>EndTime:{` `}{endTime}</p>
                <p>Booking Created:{` `}{createAt}</p>

              </Card>
            </Col>
         
    
      </div>
      
       <div>
     
      </div>
      
      
    </div>
  );
};

export default BookingDetailsPage;
/* eslint-disable @next/next/no-img-element */
"use client"
import { useAdminsQuery } from '@/redux/api/adminApi';
import { getUserInfo, isLoggedIn } from '@/services/auth.service';
import { Button, Card, Col, Drawer, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useState } from 'react';
import { ChildProcess } from 'child_process';
import { useCustomersQuery } from '@/redux/api/customerApi';
import { useBookingsQuery } from '@/redux/api/bookingApi';
import { USER_ROLE } from '@/constants/role';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import styleCom from './booking.module.css'

const CustomerBooking = () => {
  
  useEffect(()=>{
    const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.CUSTOMER){
         redirect('/login')
    }
  },[])
  const [open, setOpen] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);


  const query: Record<string, any> = {};
  const { data, isLoading } = useCustomersQuery({ ...query });
  const {data:cartData,isLoading:loading}=useBookingsQuery({...query})
  //@ts-ignore
  console.log(cartData?.bookings?.map((fr:any)=>fr?.customerID?.id))
  console.log(cartData)

  //const customers: any = data?.customer?.map(dam => dam);
  //console.log(customers)

  const { userId,role } = getUserInfo() as any;
  console.log(userId)

  const customersd: any = data?.customer?.map((dam:any) => {
    if (dam?.id === userId) {
      return dam;
    }
  }).filter(Boolean);
//@ts-ignore
const customerBookingreq: any = cartData?.bookings?.map((fr:any)=> {
    if (fr?.customerID?.id === userId) {
      return fr;
    }
  }).filter(Boolean);



  const customersBooking: any = customersd?.map((bok:any)=>bok?.booking.map((fggw:any)=>fggw?.isConfirm))
  console.log("customersBookings:",customersBooking)

 const bookingStartTime: any = customersd?.map((bok:any)=>bok?.booking?.map((fggw:any)=>fggw.serviceIDs.map((s:any)=>s?.startTime)))
  console.log("customersBookings:",bookingStartTime)
 const bookingendTime: any = customersd?.map((bok:any)=>bok?.booking?.map((fggw:any)=>fggw.serviceIDs.map((s:any)=>s?.endTime)))
  console.log("customersBookings:",bookingendTime)
  const bookingengApointment: any = customersd?.map((bok:any)=>bok?.booking?.map((fggw:any)=>fggw.serviceIDs.map((s:any)=>s?.apointmentdaysInWeek)))
  console.log("customersBookings:",bookingengApointment)
// const bookingImage: any =cartData?.bookings?.map((s:any)=>s?.serviceIDs.map((p:any)=>p?.categoryId?.profileImage))
//   console.log("customersBookings:",bookingImage)

const bookingImage: any = cartData?.bookings
  ?.flatMap((s: any) =>
    s?.serviceIDs?.map((p: any) => p?.categoryId?.profileImage)
  )
  .filter((image: any) => image !== undefined);

console.log(bookingImage)

  let customerNotifications = customersd?.map((notif: { notification: any[]; }) => notif?.notification?.map(u=>u));
  console.log("notifiObjects",customerNotifications)

return(
  <div>
       {/* <div className={styleCom.main} style={{ marginBottom: '20px' }}> */}
       <div  style={{ marginBottom: '20px' }}>
        <Row gutter={6} style={{ margin: 0 }}>
          {customersd?.map((bok:any)=>bok?.booking.map((fggw:any)=> (
            <Col  xs={24} sm={24} md={12} lg={8} span={8} key={fggw?.id} style={{ marginBottom: "20px" }}>
              <Card
                title={''}
                hoverable
                //  style={{ width: 450, justifyContent: 'center', }}
                cover={<Image alt="example" src={bookingImage} width={300} height={300} />}
              >
                
                <p>Booking Id: {` `}{fggw?._id}</p>
                <p>Confirm: {` `}{customersBooking === false ? "false" : "true"}</p>
                <p>Booking Start:{` `}{bookingStartTime}</p>
                <p>Booking End:{` `}{bookingendTime}</p>
                <p>Booking Apointment Day:{` `}{bookingengApointment}</p>
                
              </Card>
            </Col>
          )))}
        </Row>
      </div>
  </div>
)

}
export default CustomerBooking;
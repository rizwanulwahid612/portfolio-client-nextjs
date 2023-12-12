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

  let customerNotifications = customersd?.map((notif: { notification: any[]; }) => notif?.notification?.map(u=>u));
  console.log("notifiObjects",customerNotifications)

return(
  <div>
       <div style={{ marginBottom: '20px' }}>
        <Row gutter={6} style={{ margin: 0 }}>
          {customersd?.map((bok:any)=>bok?.booking.map((fggw:any)=> (
            <Col span={8} key={fggw?.id} style={{ marginBottom: "20px" }}>
              <Card
                title={''}
                hoverable
                 style={{ width: 450, justifyContent: 'center', display: 'flex' }}
                cover={<Image alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" width={300} height={300} />}
              >
                <Meta title="Europe Street beat" description="www.instagram.com" />
                <p>{fggw?._id}</p>
                {/* <Link key={''} href={`category/service/services/${categorydata?.id}`}>
                  <Button>Go to Service</Button>
                </Link> */}
              </Card>
            </Col>
          )))}
        </Row>
      </div>
  </div>
)

}
export default CustomerBooking;
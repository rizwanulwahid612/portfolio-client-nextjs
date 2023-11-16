"use client"
import { useAdminsQuery } from '@/redux/api/adminApi';
import { getUserInfo, isLoggedIn } from '@/services/auth.service';
import { Button, Card, Col, Drawer } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useState } from 'react';
import Badges from '../Badge/Badge';
import { ChildProcess } from 'child_process';
import { useCustomersQuery } from '@/redux/api/customerApi';
import { useBookingsQuery } from '@/redux/api/bookingApi';
import CartBadges from '../CartBadge/CartBadge';

import { USER_ROLE } from '@/constants/role';
import { redirect } from 'next/navigation';

const CustomerBookingCart = () => {
  useEffect(()=>{
    const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.CUSTOMER){
         redirect('/login')
    }
  },[])
  const [open, setOpen] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);

  const showDrawer = () => {
    setOpen(true);
    setBookingCount(0);
  };

  const onClose = () => {
    setOpen(false);
  };

  const query: Record<string, any> = {};
  const { data, isLoading } = useCustomersQuery({ ...query });
  const {data:cartData,isLoading:loading}=useBookingsQuery({...query})
  console.log(cartData?.bookings?.map((fr:any)=>fr?.customerID?.id))

  //const customers: any = data?.customer?.map(dam => dam);
  //console.log(customers)

  const { userId,role } = getUserInfo() as any;
  console.log(userId)

  const customersd: any = data?.customer?.map((dam:any) => {
    if (dam?.id === userId) {
      return dam;
    }
  }).filter(Boolean);

const customerBookingreq: any = cartData?.bookings?.map((fr:any)=> {
    if (fr?.customerID?.id === userId) {
      return fr;
    }
  }).filter(Boolean);



//   const customersBooking: any = customersd?.map((bok:any)=>bok.booking)
//   console.log("customersBookings:",customersBooking)

//   let customerNotifications = customersd?.map((notif: { notification: any[]; }) => notif?.notification?.map(u=>u));
//   console.log("notifiObjects",customerNotifications)
 


  const customerBookingInCard=customerBookingreq?.map((fdff:any)=>fdff)
console.log("CustomerBookingInCard:",customerBookingInCard)

const customerBookingInCardLength=customerBookingreq?.length
console.log("customerBookingInCardLength:",customerBookingInCardLength)
  useEffect(() => {
    if (!open) {
      setBookingCount(customerBookingInCardLength);
    } else {
      setBookingCount(0);
    }
  }, [open, customerBookingInCardLength]);


  useEffect(() => {
    if (!open) {
      setBookingCount(0);
    }
  }, [open]);
   useEffect(() => {
     if(isLoggedIn() || !isLoggedIn || role === USER_ROLE.CUSTOMER){
         setBookingCount(customerBookingInCardLength);
    }
  }, [customerBookingInCardLength, role]);

  return (
    <div>
      <p onClick={showDrawer}><CartBadges messageCount={bookingCount} /></p>
      <Drawer title="Cart Items" placement="right" onClose={onClose} open={open}>
        {customerBookingInCard?.map((cartbok:any) =>(
          <Col span={8} key={cartbok?.id} style={{ margin: 0 }}>
            <Card
              title={cartbok?.id}
              hoverable
              style={{ width: 320, justifyContent: 'center', display: 'flex' }}
            >
              <Meta title="Europe Street beat" description="www.instagram.com" />
              <p>{cartbok?.role}</p>
              {/* <p>{open ? 0 : messageCount}</p> */}
            </Card>
          </Col>
        ))}
      </Drawer>
    </div>
  );
}

export default CustomerBookingCart;




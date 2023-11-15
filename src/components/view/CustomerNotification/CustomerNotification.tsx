"use client"
import { useAdminsQuery } from '@/redux/api/adminApi';
import { getUserInfo, isLoggedIn } from '@/services/auth.service';
import { Button, Card, Col, Drawer } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useState } from 'react';
import Badges from '../Badge/Badge';
import { ChildProcess } from 'child_process';
import { useCustomersQuery } from '@/redux/api/customerApi';
import { USER_ROLE } from '@/constants/role';

const CustomerNotification = () => {

  const [open, setOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  const showDrawer = () => {
    setOpen(true);
    setMessageCount(0);
  };

  const onClose = () => {
    setOpen(false);
  };

  const query: Record<string, any> = {};
  const { data, isLoading } = useCustomersQuery({ ...query });

  const customers: any = data?.customer?.map(dam => dam?.id);

  const { userId,role } = getUserInfo() as any;

  const customersd: any = data?.customer?.map(dam => {
    if (dam?.id === userId) {
      return dam;
    }
  }).filter(Boolean);
 

  const customerNotifications = customersd?.map((notif: { notification: any[]; }) => notif?.notification?.length);
  console.log("notifiObjects",customerNotifications)
 
  const customerNotification = customersd?.map((notif: { notification: any[]; }) => notif?.notification?.map(not => not?.message));
  
  console.log(customerNotification)
  useEffect(() => {
    if (!open) {
      setMessageCount(customerNotification ? customerNotification.reduce((count: any, messages: string | any[]) => count + messages.length, 0) : 0);
    } else {
      setMessageCount(0);
    }
  }, [open, customerNotification]);


  useEffect(() => {
    if (!open) {
      setMessageCount(0);
    }
  }, [open]);
useEffect(() => {
     if(isLoggedIn() || !isLoggedIn || role === USER_ROLE.CUSTOMER){
         setMessageCount(customerNotification);
         isLoading
    }
  }, [isLoading, role]);
  return (
    <div>
      <p onClick={showDrawer}><Badges messageCount={messageCount} /></p>
      <Drawer title="Admin Notifications" placement="right" onClose={onClose} open={open}>
        {customersd?.map((notif: { notification: any[]; }) => notif?.notification?.map(not => (
          <Col span={8} key={not?.id} style={{ margin: 0 }}>
            <Card
              title={not?.id}
              hoverable
              style={{ width: 320, justifyContent: 'center', display: 'flex' }}
            >
              <Meta title="Europe Street beat" description="www.instagram.com" />
              <p>{not?.message}</p>
              {/* <p>{open ? 0 : messageCount}</p> */}
            </Card>
          </Col>
        )))}
      </Drawer>
    </div>
  );
}

export default CustomerNotification;




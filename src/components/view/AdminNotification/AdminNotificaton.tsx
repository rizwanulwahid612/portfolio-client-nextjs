"use client"

// import { useAdminsQuery } from '@/redux/api/adminApi';
// import { getUserInfo } from '@/services/auth.service';
// import { Button, Card, Col, Drawer } from 'antd';
// import Meta from 'antd/es/card/Meta';
// import React, { useEffect, useState } from 'react';
// import Badges from '../Badge/Badge';

// const AdminNotification = () => {
//   const [open, setOpen] = useState(false);
//   const [messageCount, setMessageCount] = useState(0);

//   const showDrawer = () => {
//     setOpen(true);
//     setMessageCount(0);
//   };

//   const onClose = () => {
//     setOpen(false);
//   };

//   const query: Record<string, any> = {};
//   const { data, isLoading } = useAdminsQuery({ ...query });

//   const admins: any = data?.admins.map(dam => dam?.id);

//   const { userId } = getUserInfo() as any;

//   const adminsd: any = data?.admins?.map(dam => {
//     if (dam?.id === userId) {
//       return dam;
//     }
//   }).filter(Boolean);
//   const adminNotifications = adminsd?.map((notif: { notification: any[]; }) => notif?.notification.map(not=>not?._id))

//   console.log(adminNotifications)

//   const adminNotification = adminsd?.map((notif: { notification: any[]; }) => notif?.notification.map(not => not?.message));
// console.log(adminNotification)
//   useEffect(() => {
//     if (!open) {
//       setMessageCount(adminNotification ? adminNotification.reduce((count: any, messages: string | any[]) => count + messages.length, 0) : 0);
//     } else {
//       setMessageCount(0);
//     }
//   }, [open, adminNotification]);


//   useEffect(() => {
//     if (!open) {
//      setMessageCount(0);
//     }
//   }, [open]);

//   return (
//     <div>
//       <p onClick={showDrawer}><Badges messageCount={messageCount} /></p>
//       <Drawer title="Admin Notifications" placement="right" onClose={onClose} open={open}>
//         {adminsd?.map((notif: { notification: any[]; }) => notif?.notification?.map(not => (
//           <Col span={8} key={not?.id} style={{ margin: 0 }}>
//             <Card
//               title={not?.id}
//               hoverable
//               style={{ width: 320, justifyContent: 'center', display: 'flex' }}
//             >
//               <Meta title="Europe Street beat" description="www.instagram.com" />
//               <p>{not?.message}</p>
//               <p>{open ? 0 : messageCount}</p>
//             </Card>
//           </Col>
//         )))}
//       </Drawer>
//     </div>
//   );
// }

// export default AdminNotification;



import { useAdminsQuery } from '@/redux/api/adminApi';
import { getUserInfo } from '@/services/auth.service';
import { Button, Card, Col, Drawer } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useState } from 'react';
import Badges from '../Badge/Badge';
import { ChildProcess } from 'child_process';

const AdminNotification = () => {

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
  const { data, isLoading } = useAdminsQuery({ ...query });

  const admins: any = data?.admins.map(dam => dam?.id);

  const { userId } = getUserInfo() as any;

  const adminsd: any = data?.admins?.map(dam => {
    if (dam?.id === userId) {
      return dam;
    }
  }).filter(Boolean);
 

  let adminNotifications = adminsd?.map((notif: { notification: any[]; }) => notif?.notification?.map(u=>u));
  console.log("notifiObjects",adminNotifications)
 
  const adminNotification = adminsd?.map((notif: { notification: any[]; }) => notif?.notification?.map(not => not?.message));
  
  console.log(adminNotification)
  useEffect(() => {
    if (!open) {
      setMessageCount(adminNotification ? adminNotification.reduce((count: any, messages: string | any[]) => count + messages.length, 0) : 0);
    } else {
      setMessageCount(0);
    }
  }, [open, adminNotification]);


  useEffect(() => {
    if (!open) {
      setMessageCount(0);
    }
  }, [open]);

  return (
    <div>
      <p onClick={showDrawer}><Badges messageCount={messageCount} /></p>
      <Drawer title="Notifications" placement="right" onClose={onClose} open={open}>
        {adminsd?.map((notif: { notification: any[]; }) => notif?.notification?.map(not => (
          <Col span={8} key={not?.id} style={{ margin: 0 }}>
            <Card
              title={not?.id}
              hoverable
              style={{ width: 320, justifyContent: 'center', display: 'flex' }}
            >
              <Meta title="Europe Street beat" description="www.instagram.com" />
              <p>{not?.message}</p>
              <p>{open ? 0 : messageCount}</p>
            </Card>
          </Col>
        )))}
      </Drawer>
    </div>
  );
}

export default AdminNotification;




"use client"
import { Button, Card, Col, Drawer, Menu, type MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
import { getUserInfo } from "@/services/auth.service";


export const sidebarItems = (role: string) => {
  

    const publicSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={'/'}>Home</Link>,
      key: "home",
      icon: <ProfileOutlined />,
    },
   
     {
      label: <Link href={`/contact`}>Contact</Link>,
      icon: <TableOutlined />,
      key: `/contact`,
    },
  
  ];
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}/my-profile`}>Account Profile</Link>,
          key: `/${role}/my-profile`,
        },
        {
          label: <Link href={`/${role}/changepassword`}>Change Password</Link>,
          key: `/${role}/changepassword`,
        },
      ],
    },
  ];

  const commonUserSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/framework`}>All Framework</Link>,
      icon: <TableOutlined />,
      key: `/${role}/all-framework`,
    },
     {
      label: <Link href={`/${role}/project`}>All project</Link>,
      icon: <TableOutlined />,
      key: `/${role}/all-project`,
    },
   
  ];

  const userSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonUserSidebarItems,
  
  ];

 const { role:roles } = getUserInfo() as any;
 if(!roles){

 }
  if (role === USER_ROLE.USER) return userSidebarItems;
    return publicSidebarItems;
};

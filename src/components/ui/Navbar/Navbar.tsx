"use client";
import { sidebarItems } from "@/constants/sidebarItems";
import { authKey } from "@/constants/storageKey";
import { useAppDispatch } from "@/redux/hooks";
import { showSidebarDrawer } from "@/redux/slices/sidebarSlice";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Layout, Menu, Typography } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styletext from "../../styles/textcolor.module.css"
const { Header, Content } = Layout;
const { Title } = Typography;

const Navbar = ({

  hasSider,

}: {

  hasSider?: boolean;
}) => {
  
  const { role } = getUserInfo() as any;

  const pathname = usePathname();
  
   const router=useRouter();
    const logOut=()=>{
        removeUserInfo(authKey)
        router.push("/login")
    }

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const dispatch = useAppDispatch();




  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout className="layout">
      <Header className="flex items-center w-screen">
        {hasSider && (
          <Button
            type="primary"
            className="lg:hidden"
            onClick={() => {
              dispatch(showSidebarDrawer());
            }}
          >
            <MenuOutlined />
          </Button>
        )}
        <Content>
          <Link href="/">
          <h2 className="text-4xl">
             <h2 className={styletext.gradienttext}>
               Portfolio
              </h2>
              </h2>
          </Link>
            {/* <Title
              className={`m-0 text-6xl ${
                hasSider && "text-center sm:text-left"
              }`}
            >
            
              
            
            </Title> */}
          
         
        </Content>
        
        <Menu
          className="lg:block hidden"
          disabledOverflow
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname]}
          items={sidebarItems(role)}
        />
      
     <div className="lg:block hidden">
  {role ? (
            <Button
              type="primary"
              onClick={logOut}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => {
               router.push("/login");
              }}
            >
              Sign In
            </Button>
          )} 
        </div>
        <>
        <Button type="primary" className="lg:hidden" onClick={showDrawer}>
          <MenuOutlined />
        </Button>
        <Drawer width={250} title="Menu" placement="right" onClose={onClose} open={open}>
          <Menu
            theme="light"
            mode="vertical"
            selectedKeys={[pathname]}
            style={{ borderRight: 0 }}
            disabledOverflow
             items={sidebarItems(role)} 
            
          >
              
          </Menu>
            {role ? (
            <Button
              type="primary"
              onClick={logOut}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => {
               router.push("/login");
              }}
            >
              Sign In
            </Button>
          )} 
        </Drawer>
        </>
      </Header>
    </Layout>
  );
};

export default Navbar;
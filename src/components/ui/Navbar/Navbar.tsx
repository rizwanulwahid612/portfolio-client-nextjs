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
      <Header className="flex items-center">
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
            <Title
              className={`m-0 text-white ${
                hasSider && "text-center sm:text-left"
              }`}
            >
              Events
            
            </Title>
          </Link>
         
        </Content>
        
        <Menu
          className="lg:block hidden"
          disabledOverflow
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname]}
          items={sidebarItems(role)}
        />
      
     <>
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
        </>
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
        </Drawer>
        </>
      </Header>
    </Layout>
  );
};

export default Navbar;
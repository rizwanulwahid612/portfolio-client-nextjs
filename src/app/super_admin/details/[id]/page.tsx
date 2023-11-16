"use client"
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { useAdminQuery } from "@/redux/api/adminApi";
import { Card } from 'antd';
import Image from "next/image";

const { Meta } = Card;
const AdminDetailsPage = ({ params }: any) => {
  const { data: adminData, isLoading: loading } = useAdminQuery(params?.id);
     console.log(adminData)
  
  return (
    <div>
      <EMBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
        ]}
      />
      <h1>Edit Admin {params?.id}</h1>

      <div>
 <Card
    hoverable
    style={{ width: 240 }}
    cover={<Image alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
      </div>
    </div>
  );
};

export default AdminDetailsPage;

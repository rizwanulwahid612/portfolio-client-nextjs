"use client"
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
//import { useAdminQuery } from "@/redux/api/adminApi";
import { useCustomerQuery } from "@/redux/api/customerApi";
import { Card } from 'antd';
import Image from "next/image";

const { Meta } = Card;
const customerDetailsPage = ({ params }: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: cData, isLoading: loading } = useCustomerQuery(params?.id);
     console.log(cData)
  
  return (
    <div>
      <EMBreadCrumb
        items={[
          {
            label: "customer",
            link: "/customer",
          },
        ]}
      />
      <h1>Edit Customer {params?.id}</h1>

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

export default customerDetailsPage;

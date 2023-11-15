"use client";

import { Button, Input, message } from "antd";
import Link from "next/link";
import {
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useEffect, useReducer, useState } from "react";
import { useDebounced } from "@/redux/hooks";
//import UMTable from "@/components/ui/UMTable";
import { useAdminsQuery, useDeleteAdminMutation} from "@/redux/api/adminApi";
import { IDepartment } from "@/types";
import dayjs from "dayjs";
//import UMModal from "@/components/ui/UMModal";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import EMTable from "@/components/ui/EMTable/EMTable";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import EMModal from "@/components/ui/EMModel/EMModel";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { USER_ROLE } from "@/constants/role";
import { redirect, useRouter } from "next/navigation";
import { useCustomersQuery, useDeleteCustomerMutation } from "@/redux/api/customerApi";


const CustomerPage = () => {
//const router = useRouter();
  useEffect(()=>{
    const {role}=getUserInfo() as any;
    if(!isLoggedIn || role !== USER_ROLE.CUSTOMER){
         redirect('/login')
    }
  },[])
  const query: Record<string, any> = {};
  const [deleteCustomer] = useDeleteCustomerMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [customerId, setCustomerId] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = useCustomersQuery({ ...query });
//  const session:any=getSession()
//  console.log(session?.accessToken)
  const customers = data?.customer;
  const meta = data?.meta;

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: function (data: Record<string, string>) {
        const fullName = `${data?.firstName} ${data?.middleName} ${data?.lastName}`;
        return <>{fullName}</>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    // {
    //   title: "Department",
    //   dataIndex: "managementDepartment",
    //   render: function (data: IDepartment) {
    //     return <>{data?.title}</>;
    //   },
    // },
    
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Contact no.",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        // console.log(data);
        return (
          <>
            <Link href={`/customer/details/${data}`}>
              <Button onClick={() => console.log(data)} type="primary">
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/customer/edit/${data}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setCustomerId(data);
              }}
              danger
              style={{ marginLeft: "3px" }}
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  const deleteCustomerHandler = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteCustomer(id);
      if (res) {
        message.success("Customer Successfully Deleted!");

        setOpen(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

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
      <ActionBar title="Customer List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          <Link href="/customer/create">
            <Button type="primary">Create Customer</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: "0px 5px" }}
              type="primary"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <EMTable
        loading={isLoading}
        columns={columns}
        dataSource={customers}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <EMModal
        title="Remove customer"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteCustomerHandler(customerId)}
      >
        <p className="my-5">Do you want to remove this Customer?</p>
      </EMModal>
    </div>
  );
};

export default CustomerPage;




















// const AdminPage= async ()=>{
//   const res= await fetch ("http://localhost:3005/api/v1/admins",{
//     cache:"no-store",
//   });
//   const {data}= await res.json();
//   console.log(data)
//   return <div key={data}> {data}</div>
// }
// export default AdminPage


// "use client";

// import { useAdminsQuery } from "@/redux/api/adminApi";
 
// function AdminList() {
//   const { data, error, isLoading } = useAdminsQuery("");
//   console.log(data)

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
//    if(error){
//     return <div>error is happning.....</div>;
//    }
//   if (!data) {
//     return <div>No data available.</div>;
//   }

//     return (
//     <div>
//       <h1>Admin List</h1>
//       {data?.data?.map((addata:any)=>{
//         return <p key={addata.id}>{addata.gender}</p>
//       })}
//     </div>
//   );
 
// }

// export default AdminList;













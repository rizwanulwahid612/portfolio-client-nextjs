"use client";
import { Button, Card, Col, Input, Pagination, Row, message } from "antd";
import Link from "next/link";
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {  useState } from "react";
import { useDebounced } from "@/redux/hooks";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { useCategoriesQuery, useDeleteCategoryMutation } from "@/redux/api/categoryApi";
import Image from "next/image";
import dayjs from "dayjs";
import { useDeleteServiceMutation, useServicesQuery } from "@/redux/api/serviceApi";
import EMTable from "@/components/ui/EMTable/EMTable";
import EMModal from "@/components/ui/EMModel/EMModel";
const { Meta } = Card;


const ServicePage = () => {
  const query: Record<string, any> = {};
  const [deleteService] = useDeleteServiceMutation();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [serviceId, setserviceId] = useState<string>("");

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
  
  const { data, isLoading } = useServicesQuery({ ...query });
  const services = data?.services;
  const meta = data?.meta;
  const limit = data?.meta?.limit;
  const pagesize = data?.meta?.page;
  const total = data?.meta?.total;
  console.log(data);


    const columns = [
         {
      title: "id",
      dataIndex: "_id",
    },
    {
      title: "Id",
      dataIndex: "id",
      sorter: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
     {
      title: "Details",
      dataIndex: "details",
      sorter: true,
    },
    
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
   
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        // console.log(data);
        return (
          <>
            <Link href={`/admin/details/${data}`}>
              <Button onClick={() => console.log(data)} type="primary">
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/admin/edit/${data}`}>
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
                setserviceId(data);
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
  const deleteServiceHandler = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteService(id);
      if (res) {
        message.success("Service Successfully Deleted!");

        setOpen(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };
  return (
    <div style={{ margin: '10px' }}>
      <EMBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
        ]}
      />
      <ActionBar title="Service List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          <Link href="/admin/service/create">
            <Button type="primary">Create Service</Button>
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
        dataSource={services}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <EMModal
        title="Remove admin"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteServiceHandler(serviceId)}
      >
        <p className="my-5">Do you want to remove this Service?</p>
      </EMModal>
    </div>
  );
};

export default ServicePage;

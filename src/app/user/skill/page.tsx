"use client";
import { Button, Card, Col, Input, Pagination, Row, message } from "antd";
import Link from "next/link";
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {  useEffect, useState } from "react";
import { useDebounced } from "@/redux/hooks";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
//import { useCategoriesQuery, useDeleteCategoryMutation } from "@/redux/api/frameworkApi";
import Image from "next/image";
import dayjs from "dayjs";
//import { useDeleteServiceMutation, useServicesQuery } from "@/redux/api/projectApi";
import EMTable from "@/components/ui/EMTable/EMTable";
import EMModal from "@/components/ui/EMModel/EMModel";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { USER_ROLE } from "@/constants/role";
import { redirect } from "next/navigation";
import { useDeleteFrameworkMutation, useFrameworksQuery } from "@/redux/api/frameworkApi";
import { useDeleteProjectMutation, useProjectsQuery } from "@/redux/api/projectApi";
import { useDeleteSkillMutation, useSkillsQuery } from "@/redux/api/skillApi";
const { Meta } = Card;


const ServicePage = () => {
  useEffect(()=>{
      const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.USER){
         redirect('/login')
    }
  },[])
  const query: Record<string, any> = {};
  const [deleteSkill] = useDeleteSkillMutation();
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
  
  const { data, isLoading } = useSkillsQuery({ ...query });
  const services = data?.skill;
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
      title: "Name",
      dataIndex: "name",
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
      title: "Updated at",
      dataIndex: "updatedAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: function (data: any) {
        // console.log(data);
        return (
          <>
          
            <Link href={`/user/skill/edit/${data}`}>
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
     console.log(id);
    try {
      const res = await deleteSkill(id);
      if (res) {
        message.success(" Successfully Deleted!");

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
            label: "User",
            link: "/user/skill",
          },
        ]}
      />
      <ActionBar title="Skill List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          <Link href="/user/skill/create">
            <Button type="primary">Create Skill</Button>
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
        title="Remove Skill"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteServiceHandler(serviceId)}
      >
        <p className="my-5">Do you want to remove this Skill?</p>
      </EMModal>
    </div>
  );
};

export default ServicePage;

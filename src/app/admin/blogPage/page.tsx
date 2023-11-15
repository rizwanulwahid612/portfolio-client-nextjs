"use client";
// import ActionBar from "@/components/ui/ActionBar";
// import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
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
import { IAdmin, IDepartment, IPost } from "@/types";
import dayjs from "dayjs";
//import UMModal from "@/components/ui/UMModal";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import EMTable from "@/components/ui/EMTable/EMTable";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import EMModal from "@/components/ui/EMModel/EMModel";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { USER_ROLE } from "@/constants/role";
import { redirect, useRouter } from "next/navigation";
import { useBlogsQuery, useDeleteBlogMutation } from "@/redux/api/blogApi";


const BlogPage = () => {
//const router = useRouter();
  useEffect(()=>{
    const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.ADMIN){
         redirect('/login')
    }
  },[])
  const {userId}=getUserInfo() as any;
  console.log(userId)
  const query: Record<string, any> = {};
  const [deleteBlog] = useDeleteBlogMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [blogId, setBlogId] = useState<string>("");

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
  const { data, isLoading } = useBlogsQuery({ ...query });
 
//  const session:any=getSession()
//  console.log(session?.accessToken)
  const blogs:IPost[] | undefined = data?.blogs;
  const blog=blogs?.map((blog:any)=>blog)
  console.log(blog)
  const meta = data?.meta;

  const columns = [
    {
      title: "Blog Id",
      dataIndex: "_id",
      sorter: true,
    },
    {
      title: "Admin Id",
      dataIndex: "adminId",
     
    },
    {
      title: "Post Blog",
      dataIndex: "comment",
    },
    {
      title: "Image",
      dataIndex: "imagepost",
      render: function (data: IDepartment) {
        return <>{data?.title}</>;
      },
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
                setBlogId(data);
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

  const deleteBlogHandler = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteBlog(id);
      if (res) {
        message.success("Blog Successfully Deleted!");

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
            label: "admin",
            link: "/admin",
          },
        ]}
      />
      <ActionBar title="Blog List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          <Link href="/admin/blogPage/create">
            <Button type="primary">Create Blog</Button>
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
        dataSource={blogs}
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
        handleOk={() => deleteBlogHandler(blogId)}
      >
        <p className="my-5">Do you want to remove this blog?</p>
      </EMModal>
    </div>
  );
};

export default BlogPage;
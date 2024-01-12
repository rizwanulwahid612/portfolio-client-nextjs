
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
import { useAdminsQuery, useDeleteAdminMutation} from "@/redux/api/adminApi";
import { IBooking, IBookingRequest, IDepartment } from "@/types";
import dayjs from "dayjs";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import EMTable from "@/components/ui/EMTable/EMTable";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import EMModal from "@/components/ui/EMModel/EMModel";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { USER_ROLE } from "@/constants/role";
import { redirect, useRouter } from "next/navigation";

import { useBookingsQuery, useConfirmBookingMutation, useDeleteBookingMutation } from "@/redux/api/bookingApi";
import { ChildProcess } from "child_process";


const BookingPage = () => {
const router = useRouter();
  useEffect(()=>{
    const {role}=getUserInfo() as any;
    if(!isLoggedIn || role !== USER_ROLE.ADMIN){
         router.push('/login')
    }
  },[router])


 const [bookData, setBookData] = useState({ data: [], meta:{
    total:0,page:0,limit:0
  } });

  const query: Record<string, any> = {};
  const [deleteBooking] = useDeleteBookingMutation();
  const [confirmBooking]=useConfirmBookingMutation();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [bookingId, setbookingId] = useState<string>("");

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
  const { data, isLoading } = useBookingsQuery({ ...query });
//@ts-ignore
  const bookings = data?.bookings;
  console.log(bookings)
  //@ts-ignore
   const meta = data?.meta;
  //console.log("bookingisConfirm:",data?.bookings.map(book=>book.isConfirm))
  //@ts-ignore
 const confa:any=data?.bookings?.map((book:any)=>book.isConfirm)
 console.log(confa)
 //@ts-ignore
  const bookId=data?.bookings?.map((books:any)=>books?._id)
  console.log("bookId:",bookId)
  //@ts-ignore
  console.log("bookingId:",data?.bookings?.map((books:any)=>books?._id))
  //@ts-ignore
   console.log("serviceName:",data?.bookings?.map((book:any)=>book?.serviceIDs))
   //@ts-ignore
  const sername= data?.bookings?.map((book:any)=>book?.serviceIDs?.map((fdr:any)=>fdr?.categoryId?.name))
  console.log("ServiceName:",sername)
  //@ts-ignore
   const sernaId= data?.bookings?.map((book:any)=>book?.serviceIDs?.map((fdr:any)=>fdr?.categoryId?._id))
   console.log("serviceId:",sernaId)
   //@ts-ignore
   const customerid=data?.bookings?.map((book:any)=>book?.customerID?._id)
   console.log("customrtId:",customerid)
   //@ts-ignore
   const appweek=data?.bookings?.map((book:any)=>book?.serviceIDs?.map((fdr:any)=>fdr?.apointmentdaysInWeek))
   console.log("appweek:",appweek)
   //@ts-ignore
   const stTime=data?.bookings?.map((book:any)=>book?.serviceIDs?.map((fdr:any)=>fdr?.startTime))
   console.log("appweek:",stTime)
   //@ts-ignore
   const edTime=data?.bookings?.map((book:any)=>book?.serviceIDs?.map((fdr:any)=>fdr?.endTime))
   console.log("appweek:",edTime)
   
 const confirmBookingHandler = async (id: string) => {
    try {
      const res = await confirmBooking(id);
      if (res) {
        message.success("Booking Successfully confirmed!");

        setOpen(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };
  const columns = [
      {
      title: "CustomerID",
      dataIndex: "customerID",
       render: function (data: Record<string, string>) {
        const customerId = `${data?.id}`;
       
        return <>{customerId}</>;
      },
      
    },
    {
      title: "BookingId",
      dataIndex: "id",
      sorter: true,
    },
  {
  title: "Service Name",
  dataIndex: "serviceIDs",
  sorter: true,
  render: function (data: Record<string, string>) {
    if (Array.isArray(data)) {
      const serviceName = data.map((fdr: any) => fdr?.categoryId?.name); // Use join to convert the array to a comma-separated string
      return <>{serviceName}</>;
    } else {
      return null; // Handle the case when data is not an array
    }
  },
},

    {
      title: "Appointment Day",
      dataIndex: "serviceIDs",
       sorter: true,
      render: function (data: Record<string, string>) {
        
       if (Array.isArray(data)) {
      const appointmentday = data.map((fdr: any) => fdr?.apointmentdaysInWeek).join(', '); // Use join to convert the array to a comma-separated string
      return <>{appointmentday}</>;
    } else {
      return null; // Handle the case when data is not an array
    }
      },
    },
     {
      title: "Start Times",
      dataIndex: "serviceIDs",
       sorter: true,
      render: function (data: Record<string, string>) {

      if (Array.isArray(data)) {
      const servicTimestart = data.map((fdr: any) => fdr?.startTime).join(', '); // Use join to convert the array to a comma-separated string
      return <>{servicTimestart}</>;
    } else {
      return null; // Handle the case when data is not an array
    }
      },
    },
    {
      title: "End Times",
      dataIndex: "serviceIDs",
       sorter: true,
      render: function (data: Record<string, string>) {


           if (Array.isArray(data)) {
      const servicTimeend = data.map((fdr: any) => fdr?.endTime).join(', '); // Use join to convert the array to a comma-separated string
      return <>{servicTimeend}</>;
    } else {
      return null; // Handle the case when data is not an array
    }
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
      title: "Confirmation",
      dataIndex: "isConfirm",
       render: function (data:boolean) {
        const isConfirm =data;
        if(isConfirm!==true){
          return<p>NotConfirmed</p>
        }else{
          return<p>Confirmed</p>
        }
      
      },
    },
      {
      title: "Booking button",
      dataIndex: "_id",
       render: function (data:any) {
        console.log(data)
    //@ts-ignore
      return <Button onClick={() => confirmBookingHandler(data)}>Confirmation Click</Button>;
    
      },
    },
 
    
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        // console.log(data);
        return (
          <>
            <Link href={`/admin/booking/details/${data}`}>
              <Button onClick={() => console.log(data)} type="primary">
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/admin/booking/edit/${data}`}>
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
                setbookingId(data);
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

  const deleteBookingHandler = async (id: string) => {
    try {
      const res = await deleteBooking(id);
      if (res) {
        message.success("Booking Successfully deleted!");

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
            link: "/admin/my-profile",
          },
        ]}
      />
      <ActionBar title="Booking List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          
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
        dataSource={bookings}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
       onPaginationChange={onPaginationChange}
       onTableChange={onTableChange}
        showPagination={true}
      />

      <EMModal
        title="Confirm booking"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteBookingHandler(bookingId)}
      >
        <p className="my-5">Do you want to Delete this Booking?</p>
      </EMModal>
    </div>
  );
};

export default BookingPage;



























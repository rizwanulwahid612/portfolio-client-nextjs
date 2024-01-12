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
import { useCategoriesQuery, useDeleteCategoryMutation } from "@/redux/api/categoryApi";
import Image from "next/image";
import dayjs from "dayjs";
import { useDeleteServiceMutation, useServicesQuery } from "@/redux/api/serviceApi";
import EMTable from "@/components/ui/EMTable/EMTable";
import EMModal from "@/components/ui/EMModel/EMModel";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { USER_ROLE } from "@/constants/role";
import { redirect } from "next/navigation";

const { Meta } = Card;


const CategoryPage = () => {
  useEffect(()=>{
      const {role,userId}=getUserInfo() as any;
    console.log(role)
    if(!isLoggedIn || role !== USER_ROLE.ADMIN){
         redirect('/login')
    }
  },[])
  const query: Record<string, any> = {};
  const [deleteCategory] = useDeleteCategoryMutation();


  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>("");

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
  
  const { data, isLoading } = useCategoriesQuery({ ...query });
  const catagories = data?.categories;
  const meta = data?.meta;
  const limit = data?.meta?.limit;
  const pagesize = data?.meta?.page;
  const total = data?.meta?.total;
  console.log(catagories);


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
      dataIndex: "_id",
      render: function (data: any) {
        // console.log(data);
        return (
          <>
            <Link href={`/admin/category/details/${data}`}>
              <Button onClick={() => console.log(data)} type="primary">
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/admin/category/edit/${data}`}>
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
                setCategoryId(data);
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
      const res = await deleteCategory(id);
      if (res) {
        message.success("Category Successfully Deleted!");

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
            link: "/admin/my-profile",
          },
           {
            label: "service",
            link: "/admin/category",
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
          <Link href="/admin/category/create">
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
        dataSource={catagories}
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
        handleOk={() => deleteServiceHandler(categoryId)}
      >
        <p className="my-5">Do you want to remove this Service?</p>
      </EMModal>
    </div>
  );
};

export default CategoryPage;






// "use client";
// import { Button, Card, Col, Input, InputNumber, Pagination, Row, Slider } from "antd";
// import Link from "next/link";
// import {
//   ReloadOutlined,
// } from "@ant-design/icons";
// import {  useEffect, useState } from "react";
// import { useDebounced } from "@/redux/hooks";
// import ActionBar from "@/components/ui/ActionBar/ActionBar";
// import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
// import { useCategoriesQuery, useDeleteCategoryMutation } from "@/redux/api/categoryApi";
// import Image from "next/image";
// import EMPaginationAdmin from "@/components/ui/EMTable/EMPaginationAdmin";
// const { Meta } = Card;


// const CategoryPage = ({
//   searchParams,
// }:{
//   searchParams:{[key:string]:string | string[] | undefined}
// }) => {
//   const query: Record<string, any> = {};
//   const [toggleOrder, setToggleOrder] = useState<boolean>(false);
//    const [inputValue, setInputValue] = useState(0);
//   const [deleteCategory] = useDeleteCategoryMutation();
//  // const [page, setPage] = useState<number>(1);
//   const [size, setSize] = useState<number>(10);
//   const [sortBy, setSortBy] = useState<string>("");
//   const [sortOrder, setSortOrder] = useState<string>("");
//   const [filteredData, setFilteredData] = useState<any[]>([]); // Initialize with an empty array
//   const [filteredData2, setFilteredData2] = useState<any[]>([]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [open, setOpen] = useState<boolean>(false);
//   const [categoryId, setcategoryId] = useState<string>("");
//  const [productPriceRangeData, setProductPriceRangeData] = useState<any>([]);
  
//  // query["limit"] = size;
//  // query["page"] = page;
//   query["sortBy"] = sortBy;
//   query["sortOrder"] = sortOrder;
  
//  // console.log(name)
// //console.log(query)
//   const debouncedSearchTerm = useDebounced({
//     searchQuery: searchTerm,
//     delay: 600,
//   });

//   if (!!debouncedSearchTerm) {
//     query["searchTerm"] = debouncedSearchTerm;
//   }
  
//   const { data, isLoading } = useCategoriesQuery({ ...query });
//   const [item,setItem]=useState(data?.categories)

//    const categoties = data?.categories?.map((p:any)=>p?.name);
//    //console.log(categoties)
//    const uniqueCategorySet = new Set(data?.categories?.map((p:any) => p?.name));
// const uniqueCategoryNames = Array.from(uniqueCategorySet);

//   const meta = data?.meta;
//   const limit = data?.meta?.limit;
//   const pagesize = data?.meta?.page;
//   const total = data?.meta?.total;
//   //console.log(data);

//   const catData = filteredData2?.map((d:any)=>d)
//   console.log("gfsghfppppp",catData)

//   const page = searchParams['page'] ?? '1'
//   const per_page = searchParams['per_page'] ?? '10'
//  // const name=searchParams['name'] ?? ''

//   const start =(Number(page)-1)*Number(per_page)
//   const end = start + Number(per_page)
//   const entries= catData?.slice(start,end)
// //console.log("Price range: ",priceData?.map((p:any)=>p?.price))
  
// const toggleSortOrder = () => {
//   setToggleOrder((prev) => !prev); // Toggling the state between true and false
//   setSortOrder(toggleOrder ? "asc" : "desc"); // Setting sortOrder based on toggle state
// };

//   // const onPaginationChange = (page: number, pageSize: number) => {
//   //   //console.log("Page:", page, "PageSize:", pageSize);
//   //   setPage(page);
//   //   setSize(pageSize);
//   // };



// //const priceData2 = data?.categories?.map((p:any)=>p?.price)
// const priceData2 = data?.categories?.map((p: any) => parseFloat(p?.price));

// // Check if priceData2 is not empty and contains valid prices
// if (priceData2 && priceData2.length > 0) {
//   var maxPrice = Math.max(...priceData2);
//  // console.log('Max Price:', maxPrice);
// }

// // Check if priceData2 is not empty and contains valid prices
// if (priceData2 && priceData2.length > 0) {
//   var minPrice = Math.min(...priceData2);
//   //console.log('Min Price:', minPrice);
// }



// //console.log("maxPrice",maxPrice as number)
//  const onChange = (newValue: number) => {
//     setInputValue(newValue);
//   };

//   const resetFilters = () => {
//     setSortBy("");
//     setSortOrder("");
//     setSearchTerm("");
//   };


// const handleCheckboxChange = (categoryName: string) => {
//   const index = selectedCategories.indexOf(categoryName);
//   let newSelectedCategories: string[] = [];

//   if (index === -1) {
//     newSelectedCategories = [...selectedCategories, categoryName];
//   } else {
//     newSelectedCategories = selectedCategories.filter((name) => name !== categoryName);
//   }

//   setSelectedCategories(newSelectedCategories);

//   let updatedFilteredData = [] as any;
//   let productPriceRangeData = data?.categories || []; // Initialize with all data
//   const minValue = minPrice; // Replace with your minimum price value
//   const maxValue = maxPrice; // Replace with your maximum price value

//   if (newSelectedCategories.length > 0) {
//     updatedFilteredData = data?.categories?.filter((p: any) => {
//       return newSelectedCategories.includes(p.name);
//     });
//   } else {
//     updatedFilteredData = data?.categories || []; // Show all if no category selected
//   }

//   if (inputValue > 1) {
//     productPriceRangeData = data?.categories?.filter((p: any) => parseFloat(p?.price) < inputValue) || [];
//     console.log(productPriceRangeData)
//   }

//   // Filter by price range
//   const filteredByPrice = productPriceRangeData.filter((item: any) => {
 
//     return parseFloat(item.price) >= minValue && parseFloat(item.price) <= maxValue;
//   });

//   //Filter the selected categories by price range
//   updatedFilteredData = updatedFilteredData.filter((category: any) => {
//     return filteredByPrice.some((item: any) => item.name === category.name);
//   });

// console.log("Filtered Data:", updatedFilteredData.map((f:any)=>f?.price));

//   setFilteredData(updatedFilteredData);
  
// };
// console.log("ghdghff:",filteredData)

// useEffect(()=>{
// let filteredData2;
// filteredData2=  filteredData?.filter((p:any)=>parseFloat(p?.price) < inputValue)
// console.log("proRange:",filteredData2)
// if(inputValue >1){
//   filteredData2=  filteredData?.filter((p:any)=>parseFloat(p?.price) < inputValue)
// }
// else{
//  filteredData2= filteredData
// }
// setFilteredData2(filteredData2)
// console.log("fshhgdas22",filteredData2)
// },[filteredData, inputValue])
// console.log("fgsdga7:",typeof(filteredData2.length))

// useEffect(() => {
//   if (selectedCategories.length === 0) {
//     let updatedFilteredData = [];
//     let productPriceRangeData;
// //console.log(productPriceRangeData)
// productPriceRangeData=  data?.categories?.filter((p:any)=>parseFloat(p?.price) < inputValue)
// //console.log("proRange:",productPriceRangeData)
// //@ts-ignore
// if(inputValue >1){
//   productPriceRangeData=data?.categories?.filter((p:any)=>parseFloat(p?.price) < inputValue)
// }
// else{
//  productPriceRangeData= data?.categories
// }
//     if (productPriceRangeData && productPriceRangeData?.length > -1) {
//       updatedFilteredData = productPriceRangeData;
//     } else {
//       updatedFilteredData = data?.categories || [];
//     }

//     setFilteredData(updatedFilteredData);
//    // console.log("Filtered Data:", updatedFilteredData);
//   }
// }, [data?.categories, selectedCategories.length, inputValue]);

//   return (
//     <div style={{ margin: '10px' }}>
//       <EMBreadCrumb
//         items={[
//           {
//             label: "admin",
//             link: "/admin",
//           },
//         ]}
//       />
     
//        <ActionBar title="Category List">
//         <Input
//           size="large"
//           placeholder="Search"
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{
//             width: "20%",
//           }}
//         />
       
//          <Button onClick={toggleSortOrder}>
//       {toggleOrder ? "Ascending" : "Descending"}
//   </Button>
 
  
//         <div>
//           <Link href="/admin/category/create">
//             <Button type="primary">Create Category</Button>
//           </Link>
//           {(!!sortBy || !!sortOrder || !!searchTerm) && (
//             <Button
//               style={{ margin: "0px 5px" }}
//               type="primary"
//               onClick={resetFilters}
//             >
//               <ReloadOutlined />
//             </Button>
//           )}
//         </div>
          
//       </ActionBar>
//      <div>
 
//   {uniqueCategoryNames?.map((categoryName, index) => (
//           <label key={index} style={{ marginRight: '10px' }}>
//             <input
//               type="checkbox"
//               checked={selectedCategories.includes(categoryName)}
//               onChange={() => handleCheckboxChange(categoryName)}
//             />
//             {categoryName}
//           </label>
//         ))}
      

// </div>
//        <>
  
//    <Row>
//       <Col span={12}>
//         <Slider
//         //@ts-ignore
//           min={0}
//         //@ts-ignore  
//           max={maxPrice+10}
//           onChange={onChange}
//           value={typeof inputValue === 'number' ? inputValue : 0}
//         />
//       </Col>
//       <Col span={4}>
//         <InputNumber
//           min={0}
//           //@ts-ignore
//           max={maxPrice+10}
//           style={{ margin: '0 16px' }}
//           value={inputValue}
//           //@ts-ignore
//           onChange={onChange}
//         />
//       </Col>
//     </Row>
// </>

//       <div>
//         <Row gutter={6} style={{ margin: 10 }}>
//           {entries?.map((categorydata) => (
//             <Col span={8} key={categorydata?.x} style={{ margin: 0 }}>
//               <Card
//                 title={''}
//                 hoverable
//                 style={{ width:'' }}
//                 cover={<Image alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" width={300} height={300} />}
//               >
//                 <Meta title="Europe Street beat" description="www.instagram.com" />
//                 <p>{categorydata?.name}</p>
//                 {/* <Link key={''} href={`category/service/services/${categorydata?.id}`}>
//                   <Button>Go to Service</Button>
//                 </Link> */}
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </div>
//       <EMPaginationAdmin
//       //@ts-ignore
//         hasNextPage={end < filteredData2?.length}
//         hasPrevPage={start > 0}
//         total={total as number}
//       />
     
//     </div>
//   );
// };

// export default CategoryPage;




















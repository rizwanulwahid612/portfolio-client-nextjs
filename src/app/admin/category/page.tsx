"use client";
import { Button, Card, Col, Input, InputNumber, Pagination, Row, Slider } from "antd";
import Link from "next/link";
import {
  ReloadOutlined,
} from "@ant-design/icons";
import {  useEffect, useState } from "react";
import { useDebounced } from "@/redux/hooks";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { useCategoriesQuery, useDeleteCategoryMutation } from "@/redux/api/categoryApi";
import Image from "next/image";
import EMPaginationAdmin from "@/components/ui/EMTable/EMPaginationAdmin";
const { Meta } = Card;


const CategoryPage = ({
  searchParams,
}:{
  searchParams:{[key:string]:string | string[] | undefined}
}) => {
  const query: Record<string, any> = {};
  const [toggleOrder, setToggleOrder] = useState<boolean>(false);
   const [inputValue, setInputValue] = useState(0);
  const [deleteCategory] = useDeleteCategoryMutation();
 // const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]); // Initialize with an empty array
  const [filteredData2, setFilteredData2] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [categoryId, setcategoryId] = useState<string>("");
 const [productPriceRangeData, setProductPriceRangeData] = useState<any>([]);
  
 // query["limit"] = size;
 // query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  
 // console.log(name)
//console.log(query)
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  
  const { data, isLoading } = useCategoriesQuery({ ...query });
  const [item,setItem]=useState(data?.categories)

   const categoties = data?.categories?.map((p:any)=>p?.name);
   //console.log(categoties)
   const uniqueCategorySet = new Set(data?.categories?.map((p:any) => p?.name));
const uniqueCategoryNames = Array.from(uniqueCategorySet);

  const meta = data?.meta;
  const limit = data?.meta?.limit;
  const pagesize = data?.meta?.page;
  const total = data?.meta?.total;
  //console.log(data);

  const catData = filteredData2?.map((d:any)=>d)
  console.log("gfsghfppppp",catData)

  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? '10'
 // const name=searchParams['name'] ?? ''

  const start =(Number(page)-1)*Number(per_page)
  const end = start + Number(per_page)
  const entries= catData?.slice(start,end)
//console.log("Price range: ",priceData?.map((p:any)=>p?.price))
  
const toggleSortOrder = () => {
  setToggleOrder((prev) => !prev); // Toggling the state between true and false
  setSortOrder(toggleOrder ? "asc" : "desc"); // Setting sortOrder based on toggle state
};

  // const onPaginationChange = (page: number, pageSize: number) => {
  //   //console.log("Page:", page, "PageSize:", pageSize);
  //   setPage(page);
  //   setSize(pageSize);
  // };



//const priceData2 = data?.categories?.map((p:any)=>p?.price)
const priceData2 = data?.categories?.map((p: any) => parseFloat(p?.price));

// Check if priceData2 is not empty and contains valid prices
if (priceData2 && priceData2.length > 0) {
  var maxPrice = Math.max(...priceData2);
 // console.log('Max Price:', maxPrice);
}

// Check if priceData2 is not empty and contains valid prices
if (priceData2 && priceData2.length > 0) {
  var minPrice = Math.min(...priceData2);
  //console.log('Min Price:', minPrice);
}



//console.log("maxPrice",maxPrice as number)
 const onChange = (newValue: number) => {
    setInputValue(newValue);
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };


const handleCheckboxChange = (categoryName: string) => {
  const index = selectedCategories.indexOf(categoryName);
  let newSelectedCategories: string[] = [];

  if (index === -1) {
    newSelectedCategories = [...selectedCategories, categoryName];
  } else {
    newSelectedCategories = selectedCategories.filter((name) => name !== categoryName);
  }

  setSelectedCategories(newSelectedCategories);

  let updatedFilteredData = [] as any;
  let productPriceRangeData = data?.categories || []; // Initialize with all data
  const minValue = minPrice; // Replace with your minimum price value
  const maxValue = maxPrice; // Replace with your maximum price value

  if (newSelectedCategories.length > 0) {
    updatedFilteredData = data?.categories?.filter((p: any) => {
      return newSelectedCategories.includes(p.name);
    });
  } else {
    updatedFilteredData = data?.categories || []; // Show all if no category selected
  }

  if (inputValue > 1) {
    productPriceRangeData = data?.categories?.filter((p: any) => parseFloat(p?.price) < inputValue) || [];
    console.log(productPriceRangeData)
  }

  // Filter by price range
  const filteredByPrice = productPriceRangeData.filter((item: any) => {
 
    return parseFloat(item.price) >= minValue && parseFloat(item.price) <= maxValue;
  });

  //Filter the selected categories by price range
  updatedFilteredData = updatedFilteredData.filter((category: any) => {
    return filteredByPrice.some((item: any) => item.name === category.name);
  });

console.log("Filtered Data:", updatedFilteredData.map((f:any)=>f?.price));

  setFilteredData(updatedFilteredData);
  
};
console.log("ghdghff:",filteredData)
useEffect(()=>{
let filteredData2;
filteredData2=  filteredData?.filter((p:any)=>parseFloat(p?.price) < inputValue)
console.log("proRange:",filteredData2)
if(inputValue >1){
  filteredData2=  filteredData?.filter((p:any)=>parseFloat(p?.price) < inputValue)
}
else{
 filteredData2= filteredData
}
setFilteredData2(filteredData2)
console.log("fshhgdas22",filteredData2)
},[filteredData, inputValue])
console.log("fgsdga7:",typeof(filteredData2.length))

useEffect(() => {
  if (selectedCategories.length === 0) {
    let updatedFilteredData = [];
    let productPriceRangeData;
//console.log(productPriceRangeData)
productPriceRangeData=  data?.categories?.filter((p:any)=>parseFloat(p?.price) < inputValue)
//console.log("proRange:",productPriceRangeData)
//@ts-ignore
if(inputValue >1){
  productPriceRangeData=data?.categories?.filter((p:any)=>parseFloat(p?.price) < inputValue)
}
else{
 productPriceRangeData= data?.categories
}
    if (productPriceRangeData && productPriceRangeData?.length > -1) {
      updatedFilteredData = productPriceRangeData;
    } else {
      updatedFilteredData = data?.categories || [];
    }

    setFilteredData(updatedFilteredData);
   // console.log("Filtered Data:", updatedFilteredData);
  }
}, [data?.categories, selectedCategories.length, inputValue]);

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
     
       <ActionBar title="Category List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
       
         <Button onClick={toggleSortOrder}>
      {toggleOrder ? "Ascending" : "Descending"}
  </Button>
 
  
        <div>
          <Link href="/admin/category/create">
            <Button type="primary">Create Category</Button>
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
     <div>
 
  {uniqueCategoryNames?.map((categoryName, index) => (
          <label key={index} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(categoryName)}
              onChange={() => handleCheckboxChange(categoryName)}
            />
            {categoryName}
          </label>
        ))}
      

</div>
       <>
  
   <Row>
      <Col span={12}>
        <Slider
        //@ts-ignore
          min={0}
        //@ts-ignore  
          max={maxPrice+10}
          onChange={onChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={0}
          //@ts-ignore
          max={maxPrice+10}
          style={{ margin: '0 16px' }}
          value={inputValue}
          //@ts-ignore
          onChange={onChange}
        />
      </Col>
    </Row>
</>

      <div>
        <Row gutter={6} style={{ margin: 10 }}>
          {entries?.map((categorydata) => (
            <Col span={8} key={categorydata?.x} style={{ margin: 0 }}>
              <Card
                title={''}
                hoverable
                style={{ width:'' }}
                cover={<Image alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" width={300} height={300} />}
              >
                <Meta title="Europe Street beat" description="www.instagram.com" />
                <p>{categorydata?.name}</p>
                {/* <Link key={''} href={`category/service/services/${categorydata?.id}`}>
                  <Button>Go to Service</Button>
                </Link> */}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <EMPaginationAdmin
      //@ts-ignore
        hasNextPage={end < filteredData2?.length}
        hasPrevPage={start > 0}
        total={total as number}
      />
      {/* <Pagination
        current={page}
        pageSize={10}
        total={filteredData2.length}
        pageSizeOptions={[5, 10, 20]}
        showSizeChanger={true}
        onChange={onPaginationChange}
      /> */}
    </div>
  );
};

export default CategoryPage;

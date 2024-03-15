"use client"
import React from 'react'

const servicepage = () => {
  return (
    <div>servicepage</div>
  )
}

export default servicepage


// /* eslint-disable @next/next/no-img-element */
// "use client";
// import { useEffect, useState } from 'react';
// import { Button, Card, Col, Input, InputNumber, Rate, Row, Slider } from 'antd';
// import { useDebounced } from '@/redux/hooks';
// import ActionBar from '@/components/ui/ActionBar/ActionBar';
// import EMBreadCrumb from '@/components/ui/EMBreadCrumb/EMBreadCumb';
// import EMPagination from '@/components/ui/EMTable/EMPagination';
// import { useCategoriesQuery } from '@/redux/api/frameworkApi';
// import { ReloadOutlined } from '@ant-design/icons';
// import Meta from 'antd/es/card/Meta';
// import Link from 'next/link';
// import EMPaginationCustomer from '@/components/ui/EMTable/EMPaginationCustomer';
// import { getUserInfo, isLoggedIn } from '@/services/auth.service';
// import { USER_ROLE } from '@/constants/role';
// import { redirect } from 'next/navigation';
// import Image from 'next/image';


// const ServicePage= ()=> {
 
//   const query: Record<string, any> = {};
//   //const [page, setPage] = useState<number>(1);
//   //const [size, setSize] = useState<number>(10);
//   const [toggleOrder, setToggleOrder] = useState<boolean>(false);
//   const [inputValue, setInputValue] = useState(0);
//   const [sortBy, setSortBy] = useState<string>('');
//   const [sortOrder, setSortOrder] = useState<string>('');
//    const [filteredData, setFilteredData] = useState<any[]>([]); // Initialize with an empty array
//   const [filteredData2, setFilteredData2] = useState<any[]>([]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>('');
 

//   //query["limit"] = size;
//   //query["page"] = page;
//   query["sortBy"] = sortBy;
//   query["sortOrder"] = sortOrder;


//   const debouncedSearchTerm = useDebounced({
//     searchQuery: searchTerm,
//     delay: 600,
//   });

//    if (!!debouncedSearchTerm) {
//     query["searchTerm"] = debouncedSearchTerm;
//   }

// const { data, isLoading } = useCategoriesQuery({...query});


// const uniqueCategorySet = new Set(data?.categories?.map((p:any) => p?.name));
// const uniqueCategoryNames = Array.from(uniqueCategorySet);
// const total = data?.meta?.total;


//   console.log("categories:",data,)
//   //const catData=data?.categories?.map((d:any)=>d)
//  // const filterData=data?.categories?.map((d:any)=>d)
//   // const cartDataLength=data?.categories?.length
//   // console.log("cartdatalength:",cartDataLength)
//   // const cartMeta=data?.meta;
//   // const cartTotal=data?.meta?.total;

// const catData = filteredData2?.map((d:any)=>d)
//   console.log("gfsghfppppp",catData)
//    //console.log("meta:",cartMeta)
 

 
//   //const entries= catData?.slice(start,end)
//   const toggleSortOrder = () => {
//   setToggleOrder((prev) => !prev); // Toggling the state between true and false
//   setSortOrder(toggleOrder ? "asc" : "desc"); // Setting sortOrder based on toggle state
// };
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



//     const resetFilters = () => {
//      setSortBy('');
//      setSortOrder('');
//      setSearchTerm('');
//    };

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



//   return(
//        <div style={{ margin: '10px'}}>
//        <div style={{display:"flex",justifyContent:"center"}}>
//         <h1>Service List</h1>
//        </div>
//        <ActionBar title="">
         
//          <Button style={{marginBottom:"20px"}} onClick={toggleSortOrder}>{toggleOrder ? "Ascending" : "Descending"}</Button>
//          <div>
//            {(!!sortBy || !!sortOrder || !!searchTerm) && (
//              <Button
//                style={{ margin: '0px 5px' }}
//                type="primary"
//                onClick={resetFilters}
//              >
//                <ReloadOutlined />
//              </Button>
//            )}
//          </div>
//        </ActionBar>
//         <div>
 
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
//                 <>
  
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
//        <div style={{margin:"20px"}}>
//        <Row gutter={6} style={{ margin: 0 }}>

//   {
//       filteredData2.filter((categorydata:any)=>{
//         if(searchTerm ==""){
//            return categorydata;
//         }else if(categorydata.name.toLowerCase().includes(searchTerm.toLowerCase())){
//           return categorydata
//         }else if(categorydata.location.toLowerCase().includes(searchTerm.toLowerCase())){
//           return categorydata
//         }
//       })
//       .map((categorydata:any,i:any)=>(
//              <Col xs={24} sm={24} md={12} lg={8}  span={8} key={categorydata?.d} style={{ marginBottom: "20px" }}>
//               <Link key={''} href={`customer/category/service/services/${categorydata?._id}`}>
//                    {/* <Button>Go to Service</Button> */}
                 
//                <Card
//                  title={''}
//                  hoverable
                 
//                  cover={<Image alt="example" src={categorydata?.profileImage} width={420} height={300} /> }
//                >
               
//                  <Meta title={categorydata?.name} />
//                  <p>Name:{categorydata?.name}</p><p>Price:{categorydata?.price}</p>Location:<p>{categorydata?.location}</p><p>Details:{categorydata?.details}</p>Start Time:<p>{categorydata?.startTime}</p><p>End Time:{categorydata?.endTime}</p>
//                  <p>appointmentdaysInWeek:{categorydata?.apointmentdaysInWeek}</p>
//                  <p>Categories:{categorydata?.categoryIds?.map((c:any,i:any)=>(<div key={i}><p>{c?.name}</p></div>))}</p>
//                  <Rate allowHalf defaultValue={4.5} />
                 
//                </Card>
//                </Link>
//              </Col>
//            ))}
//         </Row>
//         </div>
        
        
//     </div>
//   )
// }

// export default ServicePage;

 "use client";
import { useState, useCallback, useEffect } from 'react';
import { Button, Card, Col, Input, Row } from 'antd';
import { useDebounced } from '@/redux/hooks';
import ActionBar from '@/components/ui/ActionBar/ActionBar';
import EMBreadCrumb from '@/components/ui/EMBreadCrumb/EMBreadCumb';
import EMPagination from '@/components/ui/EMTable/EMPagination';
import { useCategoriesQuery, useDeleteCategoryMutation } from '@/redux/api/categoryApi';
import { IService } from '@/types';
import { ReloadOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Meta from 'antd/es/card/Meta';
import Link from 'next/link';


const CategoryPage = ({
  searchParams,
}:{
  searchParams:{[key:string]:string | string[] | undefined}
}) => {
  const query: Record<string, any> = {};
  //const [page, setPage] = useState<number>(1);
  //const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
 

  //query["limit"] = size;
  //query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;


  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

   if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

const { data, isLoading } = useCategoriesQuery({...query});

  console.log("categories:",data,)
  const catData=data?.categories?.map((d:any)=>d)
  const cartDataLength=data?.categories?.length
  console.log("cartdatalength:",cartDataLength)
  const cartMeta=data?.meta;
  const cartTotal=data?.meta?.total;
   console.log("meta:",cartMeta)
  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? '10'

  const start =(Number(page)-1)*Number(per_page)
  const end = start + Number(per_page)
  const entries= catData?.slice(start,end)

    const resetFilters = () => {
     setSortBy('');
     setSortOrder('');
     setSearchTerm('');
   };

  return(
       <div style={{ margin: '10px' }}>
       <EMBreadCrumb
         items={[
           {
             label: 'customer',
             link: '/customer',
           },
         ]}
       />
       <ActionBar title="Service List">
         <Input
           size="large"
           placeholder="Search"
           onChange={(e) => setSearchTerm(e.target.value)}
           style={{
             width: '20%',
           }}
         />
         <div>
           {(!!sortBy || !!sortOrder || !!searchTerm) && (
             <Button
               style={{ margin: '0px 5px' }}
               type="primary"
               onClick={resetFilters}
             >
               <ReloadOutlined />
             </Button>
           )}
         </div>
       </ActionBar>
       <>
       <Row gutter={6} style={{ margin: 0 }}>
  {entries?.map((categorydata:any) => (
             <Col span={8} key={categorydata?.d} style={{ marginBottom: "20px" }}>
               <Card
                 title={''}
                 hoverable
                 // style={{ width: 450, justifyContent: 'center', display: 'flex' }}
                 cover={<Image alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" width={300} height={300} />}
               >
                 <Meta title="Europe Street beat" description="www.instagram.com" />
                 <p>{categorydata?.name}</p>
                 <Link key={''} href={`category/service/services/${categorydata?.id}`}>
                   <Button>Go to Service</Button>
                 </Link>
               </Card>
             </Col>
           ))}
        </Row>
        </>
        
    
      <EMPagination
      //@ts-ignore
        hasNextPage={end < cartDataLength}
        hasPrevPage={start > 0}
        total={cartTotal as number}
      />
    </div>
  )
}

export default CategoryPage;
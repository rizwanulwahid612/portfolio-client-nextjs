// "use client";

// import { Card, Table } from 'antd';
// const { Meta } = Card;
// type EMTableProps = {
//   loading?: boolean;
//   columns: any;
//   dataSource: any;
//   pageSize?: number;
//   totalPages?: number;
//   showSizeChanger?: boolean;
//   onPaginationChange?: (page: number, pageSize: number) => void;
//   onTableChange?: (pagination: any, filter: any, sorter: any) => void;
//   showPagination?: boolean;
// };

// const EMCard = ({
//   loading = false,
//   columns,
//   dataSource,
//   pageSize,
//   totalPages,
//   showSizeChanger = true,
//   onPaginationChange,
//   onTableChange,
//   showPagination = true,
// }: EMTableProps) => {
//   const paginationConfig = showPagination
//     ? {
//         pageSize: pageSize,
//         total: totalPages,
//         pageSizeOptions: [5, 10, 20],
//         showSizeChanger: showSizeChanger,
//         onChange: onPaginationChange,
//       }
//     : false;

//   return (
//    <Table
   
//       loading={loading}
//       columns={columns}
//       dataSource={dataSource}
//       pagination={paginationConfig}
//       onChange={onTableChange}

//    />

  
//   );
// };

//export default EMCard;
"use client";

import { IService } from '@/types';
import { Card, Pagination, Space, Table } from 'antd';
const { Meta } = Card;

type EMCardProps = {
  loading?: boolean;
  title?: string;
  categoties:IService[];
  children:React.ReactNode;
  hoverable?:boolean;
  pageSize?: number;
  totalPages?: number;
  showSizeChanger?: boolean;
   onPaginationChange?: (page: number, pageSize: number) => void;
   //dataSource: any;///
  columns: any;///
  onTableChange?: (pagination: any, filter: any, sorter: any) => void;///
 
};

const EMCardPagination = ({
  pageSize,
  totalPages,
  showSizeChanger = true,
   onTableChange,
  onPaginationChange,
}: EMCardProps) => {
  const paginationConfig = {
    pageSize: pageSize,
    total: totalPages,
    pageSizeOptions: [5, 10, 20],
    showSizeChanger: showSizeChanger,
    onChange: onPaginationChange,
  };


  return (
    <>
 
<Card title={title} loading={loading}>
        {children}
        {/* <Table
       columns={columns}
       dataSource={dataSource}
       onChange={onTableChange}
     /> */}
        
      </Card>
      <Pagination {...paginationConfig} />
      </>
  );
};

export default EMCard;


"use client";
import { Button, Card, Col, Input, Pagination, Row } from "antd";
import Link from "next/link";
import {
  ReloadOutlined,
} from "@ant-design/icons";
import {  useState } from "react";
import { useDebounced } from "@/redux/hooks";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import { useCategoriesQuery, useDeleteCategoryMutation } from "@/redux/api/categoryApi";
import Image from "next/image";
const { Meta } = Card;


const CategoryPage = () => {
  const query: Record<string, any> = {};
  const [deleteCategory] = useDeleteCategoryMutation();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [categoryId, setcategoryId] = useState<string>("");

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
  const categoties = data?.categories;
  const meta = data?.meta;
  const limit = data?.meta?.limit;
  const pagesize = data?.meta?.page;
  const total = data?.meta?.total;
  console.log(data);

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
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
        <div></div>
      </ActionBar>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Row gutter={6} style={{ margin: 0 }}>
          {categoties?.map((categorydata:any) => (
            <Col span={8} key={categorydata?.id} style={{ marginBottom: "20px" }}>
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
      </div>

      <Pagination
        current={page}
        pageSize={size}
        total={total}
        pageSizeOptions={[5, 10, 20]}
        showSizeChanger={true}
        onChange={onPaginationChange}
      />
    </div>
  );
};

export default CategoryPage;

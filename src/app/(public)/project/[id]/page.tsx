"use client"

import { useProjectsQuery } from "@/redux/api/projectApi"
import { FundProjectionScreenOutlined, GithubOutlined, VideoCameraOutlined } from "@ant-design/icons"
import { Button, Card, Col } from "antd"
import Image from "next/image"
import Link from "next/link"
import styletext from "../../../../components/styles/textcolor.module.css"
const PostpageById =({ params }:{params:any}) => {
    console.log("params:",params.id)
    const {data,isLoading}=useProjectsQuery([])
    const projectData= data?.project?.map((proj:any)=>{
        if(params.id===proj.category){
            return proj
        }
    })?.filter((proj:any)=>proj?.category !== undefined)
    console.log("prog:",projectData)
   
    return (
        <div>
 
<h6 className={styletext.gradienttext}>
            <h6 className="text-4xl md:text-4xl font-bold">
            {params.id}
            </h6>
          </h6>
  
  <div style={{ display: "flex", flexWrap: "wrap",justifyContent:"space-around",marginTop:"20px" }}>
    {projectData?.map((admindata: any) => (
      <Col xs={24} sm={24} md={24} lg={8} xl={8} key={admindata?._id} style={{ marginTop: "50px" }}>
        <Card
          hoverable
          style={{ width: "96%", justifyContent: 'center', display: 'block' }}
          cover={<Image alt="example" src={admindata?.image} width={600} height={400} />}
        >
            <div style={{display:"flex",gap:"4px",justifyContent:"center"}}>
            <Link href={`//${admindata?.gitClient}`} target="_blank" rel="noopener noreferrer">
              <Button type="primary" shape="round"  style={{ fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px",backgroundColor:"black" }}><GithubOutlined />Client</Button>
          </Link>
           <Link href={`//${admindata?.gitServer}`} target="_blank" rel="noopener noreferrer">
              <Button type="primary" shape="round"  style={{ fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px",backgroundColor:"black" }}><GithubOutlined />Server</Button>
          </Link>
        
         
        
          </div>
            <div style={{display:"flex",gap:"4px",justifyContent:"center",marginTop:"8px",marginBottom:"8px"}}>
            <Link href={`//${admindata?.liveproject}`} target="_blank" rel="noopener noreferrer">
              <Button type="primary" shape="round"  style={{ fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px" }}><FundProjectionScreenOutlined />Live Project</Button>
          </Link>
           <Link href={`//${admindata?.liveServer}`} target="_blank" rel="noopener noreferrer">
              <Button type="primary" shape="round"  style={{ fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px" }}><FundProjectionScreenOutlined />Live Server</Button>
          </Link>
         
          </div>
            <Link href={`//${admindata?.videoLink}`} target="_blank" rel="noopener noreferrer" style={{display:"flex",justifyContent:"center",margin:"8px"}}>
              <Button type="primary" shape="round"  style={{ fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px",backgroundColor:"red" }}><VideoCameraOutlined />Video</Button>
          </Link>
           
                <h3>Name:{` `} {admindata?.name}</h3>
                <h3>Title:{` `} {admindata?.title}</h3>
                <h3>Owner Name:{` `} {admindata?.ownername}</h3>
                <h3>Description:{` `} {admindata?.description}</h3>
                <h3>FrontEnd: {` `}{admindata?.frontend}</h3>
                <h3>BackEnd:{` `} {admindata?.backend}</h3>
                {/* <h3>Techonology: {` `}{admindata?.techonology}</h3> */}


              </Card>
            </Col>
          ))}
     
      </div>
    </div>
    )
}

export default PostpageById
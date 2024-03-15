"use client"
import { useUsersQuery } from '@/redux/api/userApi';
import { DiscordOutlined, FacebookOutlined, GithubOutlined, HomeOutlined, InstagramOutlined, LinkedinOutlined, MailOutlined, PhoneOutlined, TwitterOutlined, WhatsAppOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Button, Col, Layout } from 'antd';
import Link from 'next/link';
import styletext from '../styles/textcolor.module.css'
const { Footer } = Layout;
const FooterPage = () => {
     const query: Record<string, any> = {};
    const currentDate = new Date();
  const { data:adminsd } = useUsersQuery({ ...query });
// Get date components
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
const day = currentDate.getDate();

// Get time components
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
const address1:any=adminsd?.users?.map((use1:any)=>use1?.presentaddress).join(' ') as string
const useName:any=adminsd?.users?.map((use1:any)=>use1?.name).join(' ') as string
const useEmail:any=adminsd?.users?.map((use1:any)=>use1?.email).join(' ') as string
const usePhone:any=adminsd?.users?.map((use1:any)=>use1?.contact).join(' ') as string
const useWhatsapp:any=adminsd?.users?.map((use1:any)=>use1?.whatsapp).join(' ') as string
console.log(`Current date: ${year}-${month}-${day}`);
console.log(`Current time: ${hours}:${minutes}:${seconds}`);
    return (
        // <Footer style={{ textAlign: 'center', backgroundColor: "black", color: "white", height: "250px" }}>

        <footer style={{ textAlign: 'center', backgroundColor: "black", color: "white", height: "370px" }} className="footer p-10 bg-neutral text-neutral-content">
            <h1 style={{marginBottom:"10px"}}><span className={styletext.gradienttext}> My Portfolio Web Page </span></h1>
            <div style={{display:"flex",justifyContent:"space-around",marginBottom:"20px",gap:"3px"}}>
              <div >
              <p style={{ fontSize: '14px',width:"24px 44px 24px 10px ",height:"34px" }}><MailOutlined />{useEmail}</p>
          </div>
          <div >
              <p style={{ fontSize: '14px',width:"24px 44px 24px 10px ",height:"34px" }}><PhoneOutlined />{usePhone}</p>
          </div>
          <div >
              <p style={{ fontSize: '14px',width:"24px 44px 24px 10px ",height:"34px" }}><WhatsAppOutlined />{useWhatsapp}</p>
          </div>
          </div>
            <nav>
                <header className="footer-title">
                    <h2 className={styletext.gradienttext}>
                      Social Media
                    </h2>
                   
                    </header>
                    {adminsd?.users?.map((use:any)=>{
return(
  <>
        <div style={{display:"grid",justifyContent:"center",marginTop:"10px",marginBottom:"10px",gridTemplateColumns:"repeat(4, 15vw)",gridGap:"20px"}}>
         <Link href={`//${use?.website}`} target="_blank" rel="noopener noreferrer">
              <Button type="primary"  shape="round" style={{ backgroundColor:"black",fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px" }}><HomeOutlined /></Button>
          </Link>
           <Link href={`//${use?.github}`} target="_blank" rel="noopener noreferrer">
              <Button  shape="round"  style={{ fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px" }}><GithubOutlined /></Button>
          </Link>
          <Link href={`//${use?.linkedin}`} target="_blank" rel="noopener noreferrer">
              <Button  type="primary" shape="round" style={{ fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px" }}><LinkedinOutlined /></Button>
          </Link>
           <Link href={`//${use?.discord}`} target="_blank" rel="noopener noreferrer">
              <Button type="primary" shape="round" style={{backgroundColor:"blue", fontSize: '22px',width:"14px 34px 14px 0px ",height:"44px" }}><DiscordOutlined/></Button>
          </Link>
            <Link href={`//${use?.facebook}`} target="_blank" rel="noopener noreferrer">
              <Button type="primary" shape="round" style={{ fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px" }}><FacebookOutlined /></Button>
          </Link>
             <Link href={`//${use?.twitter}`} target="_blank" rel="noopener noreferrer">
              <Button type="primary" shape="round"  style={{ fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px" }}><TwitterOutlined /></Button>
          </Link>
         
          <Link href={`//${use?.youtube}`} target="_blank" rel="noopener noreferrer">
              <Button type="primary" danger shape="round"  style={{backgroundColor:"red", fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px" }}><YoutubeOutlined /></Button>
          </Link>
            
            <Link href={`//${use?.instagram}`} target="_blank" rel="noopener noreferrer">
              <Button type="primary" danger shape="round"  style={{ fontSize: '22px',width:"24px 44px 24px 10px ",height:"44px" }}><InstagramOutlined /></Button>
          </Link>
         
         </div>
         <div style={{display:"flex",textAlign:"center",alignItems:'center'}}>

         </div>
         
         </>
          
)})}
            </nav>
              <aside>
             
                <h1><br /> <span className={styletext.gradienttext}>{useName}</span></h1>
                <br />
                <h3 >Address:{address1}</h3>
                <br />
                <h3 style={{display:"flex",justifyContent:"center",marginBottom:"20px"}}>{day}-{month}-{year} : {hours}:{minutes}:{seconds}</h3>
                
            </aside>
        </footer>
        // </Footer>
    )
}

export default FooterPage
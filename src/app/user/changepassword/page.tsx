
import EMBreadCrumb from "@/components/ui/EMBreadCrumb/EMBreadCumb";
import ChangePassword from "@/components/view/ChangePassword/ChangePassword";
//import User from "@/components/view/User/User";


const CHPassword = async() => {
 
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`);
  //const res = await fetch(`https://portfolio-server-ebon-rho.vercel.app/api/v1/users`);
    const posts = await res.json();
  return (
    <div>
       <EMBreadCrumb
    items={[
      {
        label: "User",
        link: "/user/my-profile",
      },
    ]}
  />
    
    <div>
      <ChangePassword posts={posts}/>
    </div>
    </div>
  )
}

export default CHPassword


import ChangePassword from "@/components/view/ChangePassword/ChangePassword";
//import User from "@/components/view/User/User";


const CHPassword = async() => {
 
  //const res = await fetch(`https://donation-server-opal.vercel.app/api/v1/users`);
  const res = await fetch(`http://localhost:3002/api/v1/users`);
    const posts = await res.json();
  return (
    <div>
      <ChangePassword posts={posts}/>
    </div>
  )
}

export default CHPassword

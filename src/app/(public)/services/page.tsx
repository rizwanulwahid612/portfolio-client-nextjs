"use client"
import React, { useEffect, useState } from 'react';
import PublicCard from "@/components/view/Public/PublicCard";
import Link from "next/link";

const Services = () => {
  const [categoryData, setCategoryData] = useState({ data: [], meta:{
    total:0,page:0,limit:0
  } });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://backend-for-event-4gpuhiv09-rizwanulwahid612-gmailcom.vercel.app/api/v1/categories`, {
          next: {
            revalidate: 24 * 60 * 60,
            tags: ["available-services"],
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        setCategoryData(responseData); // Store the entire response in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {categoryData.data.map((category:any) => {
        console.log("Data:",categoryData.data, "Metadata:",categoryData.meta.total)
        return (
          <Link key={category._id} href={`/services/${category._id}`}>
            <PublicCard 
            key={category._id} 
            title={category.name} 
            hoverable
            categoryData={categoryData}
            >
              {category.name}
            </PublicCard>
          </Link>
        );
      })}
      {/* You can also access meta data if needed */}
      <p>Total Categories: {categoryData.meta.total}</p>
    </div>
  );
};

export default Services;



















// //import PublicCard from "@/components/view/Public/PublicCard";

// import PublicCard from "@/components/view/Public/PublicCard";
// import Link from "next/link";

// const Services = async () => {
//   const res= await fetch("`${process.env.BACKEND_URL}`/categories",{
//        next: {
//       revalidate: 24 * 60 * 60, // time based revalidation
//       //on demand revalidation
//       tags: ["available-services"],
//     },
//   //cache:"no-cache",  //ssr=> service and category update hole data no-store rakhte hoi and revalidate:10000000 is as same ;  but admin er somoy no cache hobe public route na cz ata update kom hobe private route..
// });
//   const {data}=await res.json();
//   console.log(data)
//  return(
 
//   <div>
//     {data.map((category:any)=>{
//       return (
//          <Link
//   key={data.id}
//   href={`/services/${category._id}`}
//   >
//         <PublicCard key={data.id} title={category?.name} hoverable>
//           {category.name}
//         </PublicCard>
//         </Link>
//       )
//     })}
//   </div>
//  )
  
// }

// export default Services
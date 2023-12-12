const SingleAvailableServicePublic = async ({
  params: { availableServiceId },
}: {
  params: {
    availableServiceId: string;
  };
}) => {
  const availableServices = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/${availableServiceId}`,
    {
      next: {
        revalidate: 24 * 60 * 60, // time based revalidation
        //on demand revalidation
        tags: ["single-available-services"],
      },
      // cache: "no-cache",
    }
  );
// const availableDoctors = await fetch(
//     `${process.env.BACKEND_URL}/available-services/${availableServiceId}`,
//     {
//       next: {
//         revalidate: 24 * 60 * 60, // time based revalidation
//         //on demand revalidation
//         tags: ["single-available-services"],
//       },
//       // cache: "no-cache",
//     }
//   );

  const { data } = await availableServices.json();
  return <div>{data?.details} {data?.name}{data?.id}</div>;
};

export default SingleAvailableServicePublic;
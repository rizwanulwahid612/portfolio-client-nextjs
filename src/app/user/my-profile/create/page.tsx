"use server"
import Registration from "@/components/view/Registration/Registration";
import { getAllPhotos } from "@/components/view/UploadAction/UploadAction";

const RegistrationPage = async() => {

    const folder = 'nextjs_upload'; // Or any other folder name you want to fetch photos from
  const photos = await getAllPhotos(folder);
   console.log(photos)

  return (
  
    <div>
      <Registration  photos={photos}/>
      
    </div>
  );
};

export default RegistrationPage;
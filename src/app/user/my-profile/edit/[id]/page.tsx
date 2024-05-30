
import ProfileEdit from "@/components/view/ProfileEdit/ProfileEdit";
import { getAllFolders, getAllPhotos } from "@/components/view/UploadAction/UploadAction";

const EditMyProfile =async({ params }: any) => {
  //  const folder = 'nextjs_upload';
  // const folder = 'another_folder';
    const folders = await getAllFolders();
  const initialFolder = folders[0]?.name || '';
  const photos = await getAllPhotos(initialFolder);
  console.log(photos);
  return (
    <>
    <ProfileEdit photos={photos} params={params} folders={folders}  initialFolder={initialFolder}/>
    </>

  );
};

export default EditMyProfile;


